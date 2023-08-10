import axios from "axios";

const baseUrl = "/api/users";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getUser = (id) => {
  const config = { headers: { Authorization: token } };
  console.log(token, id);
  const request = axios.get(`${baseUrl}/${id}`, config);
  return request.then((response) => response.data);
};

const addMinutes = (minutes, id) => {
  const config = { headers: { Authorization: token } };
  console.log("addMinutes", minutes, id);
  const request = axios.put(`${baseUrl}/${id}/add`, { minutes }, config);
  return request.then((response) => response.data);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getUser, addMinutes, setToken };
