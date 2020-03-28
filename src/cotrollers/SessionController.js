const connection = require("../database/connection");
const { TABLE_NAME_ONGS } = require("../constants/tablesNames");

module.exports = {
  async create(request, response) {
    const { id } = request.body;

    const ong = await connection(TABLE_NAME_ONGS)
      .where("id", id)
      .select("name");

    if (Boolean(ong) && !ong.length) {
      return response.status(400).json({ error: "No ONG found with this ID" });
    }

    return response.json(ong);
  }
};
