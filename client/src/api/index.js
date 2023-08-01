import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const getUsers = () => httpClient.get('/users');

export const deleteUsers = payload => httpClient.delete(`/users/${payload}`);
