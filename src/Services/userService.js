import axios from "axios";

const baseUrl = "/api/users";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getUser = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data.find((user) => user.username === "user1"));
};

const addMinutes = (minutes, id) => {
  const request = axios.put(`${baseUrl}/${id}/add`, { minutesFocused: minutes });
  return request.then((response) => response.data);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getUser, addMinutes, setToken };
