const supertest = require("supertest");
const app = require("../src/app");

//-------------//-------------//-------------//-------------//

const api = supertest(app);

//-------------//-------------//-------------//-------------//

const User = require("../src/server/userModel");
const data = require("./data");

beforeEach(async () => {
  await User.deleteMany({});

  for (let user of data) {
    await api.post("/api/users").send(user);
  }
});

const mongoose = require("mongoose");
afterAll(async () => {
  await mongoose.connection.close();
});

test("data in correct", async () => {
  const response = await api.get("/api/users");

  expect(response.body).toHaveLength(data.length);
});

test("add data adds to existing time", async () => {
  const response = await api.get("/api/users");
  const user = response.body[0];
  // console.log(user._id);

  await api.put(`/api/users/${user._id}/add`).send({ minutesFocused: 10 });
  await api.put(`/api/users/${user._id}/add`).send({ minutesFocused: 10 });

  const response2 = await api.get("/api/users");
  const user2 = response2.body[0];

  expect(user2.rigor[3].minutesFocused).toBe(20);
});
