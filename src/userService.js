import axios from "axios";

const baseUrl = "/api/users";

const get = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data.find((user) => user.username === "user1"));
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { get };
