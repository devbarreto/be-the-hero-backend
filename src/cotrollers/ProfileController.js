const connection = require("../database/connection");
const { TABLE_NAME_INCIDENTS } = require("../constants/tablesNames");

module.exports = {
  async index(request, response) {
    const ong_id = request.headers.authorization;

    const incidents = await connection(TABLE_NAME_INCIDENTS)
      .where("ong_id", ong_id)
      .select("*");

    return response.json({ incidents });
  }
};
