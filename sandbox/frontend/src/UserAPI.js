import axios from "axios";
// const API_URL = 'http://localhost:8000' // create-react-app proxy로 대체

export default class UserAPI {
  constructor() {}

  getUsers() {
    const url = `/api/users/`;
    return axios.get(url).then((response) => response.data);
  }

  getUsersByURL(link) {
    const url = `${link}`;
    return axios.get(url).then((response) => response.data);
  }

  getUser(pk) {
    const url = `/api/users/${pk}`;
    return axios.get(url).then((response) => response.data);
  }

  deleteUser(user) {
    const url = `/api/users/${user.pk}`;
    return axios.delete(url);
  }
  createUser(user) {
    const url = `/api/users/`;
    return axios.post(url, user);
  }
  updateUser(user) {
    const url = `/api/users/${user.pk}`;
    return axios.put(url, user);
  }
}
