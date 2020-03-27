const express = require("express");
const crypto = require("crypto");
const connection = require("./database/connection");

const routes = express.Router();

routes.post("./ongs", async (request, response) => {
  const { name, email, whatsapp, city, uf } = request.body;

  const id = crypto
    .randomBytes(4)
    .toString("HEX")
    .toUpperCase();

  await connection("ongs").insert({ id, name, email, whatsapp, city, uf });

  response.status(200).send();
});

module.exports = routes;
