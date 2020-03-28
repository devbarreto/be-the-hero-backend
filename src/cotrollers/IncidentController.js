const connection = require("../database/connection");
const { TABLE_NAME_INCIDENTS } = require("../constants/tablesNames");

module.exports = {
  async index(request, response) {
    const incidents = await connection(TABLE_NAME_INCIDENTS).select("*");
    return response.json(incidents);
  },
  async create(request, response) {
    const { title, description, value } = request.body;
    const ong_id = request.headers.autorization;

    const [id] = await connection(TABLE_NAME_INCIDENTS).insert({
      ong_id,
      title,
      description,
      value
    });

    return response.json({ id });
  },
  async delete(request, response) {
    const { id } = request.params;
    const ong_id = request.headers.autorization;

    const incident = await connection(TABLE_NAME_INCIDENTS)
      .where("id", id)
      .select("ong_id")
      .first();

    if (incident.ong_id !== ong_id) {
      return response.status(401).json({ error: "Operations not permitted" });
    }

    await connection(TABLE_NAME_INCIDENTS)
      .where("id", id)
      .delete();

    return response.status(204).send();
  }
};
