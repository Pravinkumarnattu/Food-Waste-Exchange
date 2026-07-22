const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  }),
);
const connectDB = require("./src/config/db");
const routes = require("./src/routes/route");

app.use("/api/auth", routes);
app.use("/api/dashboard", routes)

connectDB();
app.listen(process.env.PORT || 5000, () => {
  console.log(`server running at port ${process.env.PORT || 5000}`);
});
