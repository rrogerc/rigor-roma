const app = require("./src/app.js");

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// need index.js out of src for fly.io