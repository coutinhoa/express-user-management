const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 4000;
const db = require("./queries");

app.use(cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/api/users", db.getUsers);
app.get("/api/users/:id", db.getUserById);
app.post("/api/users", db.createUser);
app.put("/api/users/:id", db.updateUser);
app.delete("/api/users/:id", db.deleteUser);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
