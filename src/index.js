const express = require("express");
const routes = require("./routes");
const cors = require("cors");

const severPort = 3030;
const successSeverUp = () =>
  console.log(`\n\t>>> Sever running successfully on port ${severPort}\n`);

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(severPort, successSeverUp);
