const express = require("express");
const cors = require("cors");
require('dotenv').config()
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  }),
);

const routes = require("./src/routes/index");

app.use("/api/auth", routes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`server running at port ${process.env.PORT || 5000}`);
});
