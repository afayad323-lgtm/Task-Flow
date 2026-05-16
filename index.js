require("dotenv").config();
const express = require("express");
const connectToDb = require("./config/db");
const userRouter = require("./routes/users.routes");
const taskRouter = require("./routes/taska.routes");

const app = express();
app.use(express.json());

const port = process.env.PORT;

app.use("/api/auth", userRouter);
app.use("/api/tasks", taskRouter);
app.use((err, req, res, next) => {
  console.log("ERROR 💥", err);

  res.status(err.statusCode || 500).json({
    status: err.status || "error",
    message: err.message || "Internal Server Error",
  });
});

connectToDb().then(() => {
  app.listen(port, () => {
    console.log(`server connected on port ${port}`);
  });
});
