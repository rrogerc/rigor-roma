const data = [
  {
    username: "user1",
    password: "password1",
    rigor: [
      { date: new Date("2023-08-01"), minutesFocused: 25 },
      { date: new Date("2023-08-02"), minutesFocused: 30 },
      { date: new Date("2023-08-03"), minutesFocused: 35 },
    ],
  },
  {
    username: "user2",
    password: "password2",
    rigor: [
      { date: new Date("2023-08-01"), minutesFocused: 40 },
      { date: new Date("2023-08-02"), minutesFocused: 45 },
    ],
  },
  {
    username: "user3",
    password: "password3",
    rigor: [{ date: new Date("2023-08-03"), minutesFocused: 50 }],
  },
];

module.exports = data;
