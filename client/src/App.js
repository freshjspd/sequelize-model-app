import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getUsersThunk } from './store/slices/usersSlice';

function App({ users, isFetching, error, getUsers }) {
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
            <li key={u.id}>{JSON.stringify(u)}</li>
          ))}
        </ul>
      )}
    </>
  );
}

const mapStateToProps = state => state.usersData; // usersData => props

const mapDispatchToProps = dispatch => ({
  getUsers: () => {
    dispatch(getUsersThunk());
  },
}); // {getUsers} => props
export default connect(mapStateToProps, mapDispatchToProps)(App);
