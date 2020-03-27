const express = require("express");
const routes = require("./routes");

const severPort = 3030;
const successSeverUp = () =>
  console.log(`\n\t>>> Sever starts with success on port ${severPort}`);

const app = express();

app.use(express.json());

app.get("/isAlive/:id/:age/:city", (request, response) => {
  response.status(200).send(request.params);
});

app.get("/isAlive", (request, response) => {
  response.status(200).send(request.query);
});

app.get("/isAliveBody", (request, response) => {
  response.status(200).send(request.body);
});

app.use(routes);

app.listen(severPort, successSeverUp);
