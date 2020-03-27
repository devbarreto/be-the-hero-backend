const express = require("express");
const OngController = require("./cotrollers/OngController");
const IncidentController = require("./cotrollers/IncidentController");

const routes = express.Router();

routes.get("/ongs", OngController.index);
routes.post("/ongs", OngController.create);

routes.get("/incidents", IncidentController.index);
routes.post("/incidents", IncidentController.create);

module.exports = routes;
