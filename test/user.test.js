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

test("data in correct", async () => {
  const response = await api.get("/api/users");

  expect(response.body).toHaveLength(data.length);
});
