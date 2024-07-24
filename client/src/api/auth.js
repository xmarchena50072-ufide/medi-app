import axios from './axios';

export const registerRequest = (user) => axios.post(`/register`, user);

export const loginRequest = (user) => axios.post(`/login`, user);

export const verifyTokenRequest = () => axios.get('/verify');

export const getProfileRequest = () => axios.get(`/profile/${id}`);

export const updateProfileRequest = (id, user) => axios.put(`/profile/${id}`, user);

export const getUsersRequest = () => axios.get('/users');