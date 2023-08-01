import { useEffect } from 'react';
import { connect } from 'react-redux';
import { deleteUserThunk, getUsersThunk } from './store/slices/usersSlice';

// DELETE /api/users/id

function App({ users, isFetching, error, getUsers, deleteUser }) {
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      {error && <div>ERROR!!!</div>}
      {isFetching && <div>Loading, please wait...</div>}
      {!error && !isFetching && (
        <ul>
          {users.map(u => (
            <li key={u.id}>
              {JSON.stringify(u)}
              <button
                onClick={() => {
                  deleteUser(u.id);
                }}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

const mapStateToProps = state => state.usersData; // usersData => props

const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(getUsersThunk()),
  deleteUser: userId => dispatch(deleteUserThunk(userId)), // => payload
}); // {getUsers, deleteUser} => props
export default connect(mapStateToProps, mapDispatchToProps)(App);
