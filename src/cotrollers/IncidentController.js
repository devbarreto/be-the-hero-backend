const connection = require("../database/connection");
const {
  TABLE_NAME_INCIDENTS,
  TABLE_NAME_ONGS
} = require("../constants/tablesNames");

module.exports = {
  async index(request, response) {
    const { page = 1, itemsPerPage = 5 } = request.query;
    const [total] = await connection(TABLE_NAME_INCIDENTS).count();

    console.log(
      "\n\n\nquery",
      `${TABLE_NAME_INCIDENTS}.*`,
      `${TABLE_NAME_ONGS}.name`,
      `${TABLE_NAME_ONGS}.email`,
      `${TABLE_NAME_ONGS}.whatsapp`,
      `${TABLE_NAME_ONGS}.city`,
      `${TABLE_NAME_ONGS}.uf\n\n\n\n`
    );

    const incidents = await connection(TABLE_NAME_INCIDENTS)
      .join(
        TABLE_NAME_ONGS,
        `${TABLE_NAME_ONGS}.id`,
        "=",
        `${TABLE_NAME_INCIDENTS}.ong_id`
      )
      .limit(itemsPerPage)
      .offset((page - 1) * itemsPerPage)
      .select([
        `${TABLE_NAME_INCIDENTS}.*`,
        `${TABLE_NAME_ONGS}.name`,
        `${TABLE_NAME_ONGS}.email`,
        `${TABLE_NAME_ONGS}.whatsapp`,
        `${TABLE_NAME_ONGS}.city`,
        `${TABLE_NAME_ONGS}.uf`
      ]);

    response.header("X-Total-Count", total["count(*)"]);

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
