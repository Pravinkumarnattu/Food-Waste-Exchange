const express = require("express");
const app = express();
app.use(express.json());

const routes = require("./src/routes/index");

app.use("/", routes);



app.listen(process.env.PORT || 3000, () => {
  console.log(`server running at port ${process.env.PORT || 3000}`);
});
