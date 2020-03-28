const crypto = require("crypto");
const connection = require("../database/connection");
const { TABLE_NAME_ONGS } = require("../constants/tablesNames");

module.exports = {
  async index(request, response) {
    const ongs = await connection(TABLE_NAME_ONGS).select("*");
    return response.json(ongs);
  },
  async create(request, response) {
    const { name, email, whatsapp, city, uf } = request.body;

    const id = crypto
      .randomBytes(4)
      .toString("HEX")
      .toUpperCase();

    await connection(TABLE_NAME_ONGS).insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    });

    response.status(200).send({ id });
  }
};
