const express = require("express");
const OngController = require("./cotrollers/OngController");
const IncidentController = require("./cotrollers/IncidentController");
const ProfileController = require("./cotrollers/ProfileController");
const SessionController = require("./cotrollers/SessionController");

const routes = express.Router();

routes.get("/isAlive/:id/:age/:city", (request, response) => {
  response.status(200).send(request.params);
});

routes.get("/isAlive", (request, response) => {
  response.status(200).send(request.query);
});

routes.get("/isAliveBody", (request, response) => {
  response.status(200).send(request.body);
});

routes.post("/session", SessionController.create);

routes.get("/ongs", OngController.index);
routes.post("/ongs", OngController.create);

routes.get("/profile", ProfileController.index);

routes.get("/incidents", IncidentController.index);
routes.post("/incidents", IncidentController.create);
routes.delete("/incidents/:id", IncidentController.delete);

module.exports = routes;
