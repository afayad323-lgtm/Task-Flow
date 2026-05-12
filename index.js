require("dotenv").config();
const express = require("express");
const connectToDb = require("./config/db");
const userRouter = require("./routes/users.routes");

const app = express();
app.use(express.json());

const port = process.env.PORT;

app.use("/api/auth", userRouter);

connectToDb().then(() => {
  app.listen(port, () => {
    console.log(`server connected on port ${port}`);
  });
});
