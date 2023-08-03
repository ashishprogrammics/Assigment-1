require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const app = express();
const { hashSync, genSaltSync, compareSync } = require("bcrypt");

app.use(express.json());

const userRouter = require('./routers/userRouter')
app.use("/user",userRouter)

const messageRouter = require('./routers/messageRoute')
app.use("/message",messageRouter)

const groupRouter = require('./routers/groupRoutes')
app.use("/group",groupRouter)

const auth = require("./middleware/auth");

app.post("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

module.exports = app;