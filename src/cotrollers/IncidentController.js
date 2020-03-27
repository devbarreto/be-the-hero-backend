const connection = require("../database/connection");

const TABLE_NAME = "incidents";

module.exports = {
  async index(request, response) {
    const incidents = await connection(TABLE_NAME).select("*");
    return response.json(incidents);
  },
  async create(request, response) {
    const { title, description, value } = request.body;
    const ong_id = request.headers.autorization;

    const [id] = await connection(TABLE_NAME).insert({
      ong_id,
      title,
      description,
      value
    });

    return response.json({ id });
  }
};
