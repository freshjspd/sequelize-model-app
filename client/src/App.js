import { useEffect, useState } from 'react';
import axios from 'axios';
// 1 обратиться к серверу
// 2 отобрfзить пришедшие с сервера данніе

// GET http://localhost:5000/api/users
const httpClient = axios.create({ baseURL: 'http://localhost:5000/api' });

function App() {
  const [users, setUsers] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // GET request
    setIsFetching(true);
    httpClient
      .get('/users')
      .then(({ data }) => {
        setUsers(data);
      })
      .catch(err => {
        setError(err);
      })
      .finally(() => setIsFetching(false));
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

export default App;
