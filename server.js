const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require('cors');
const port = process.env.PORT || 3001;

// middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Calling database and authenticate
const db = require("./database/db");
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MYSQL database connected");
});

// api route
const apiRouter = require("./routes/api");
app.use("/api", apiRouter);

// root route
app.use("/", (req, res) => {
  res.status(200);
  res.send({
    message: "this is the root route",
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
