const connection = require("../database/connection");
const { TABLE_NAME_INCIDENTS } = require("../constants/tablesNames");

module.exports = {
  async index(request, response) {
    const { page = 1, itemsPerPage = 5 } = request.query;
    const ong_id = request.headers.authorization;

    const [total] = await connection(TABLE_NAME_INCIDENTS)
      .where("ong_id", ong_id)
      .count();

    const incidents = await connection(TABLE_NAME_INCIDENTS)
      .where("ong_id", ong_id)
      .limit(itemsPerPage)
      .offset((page - 1) * itemsPerPage)
      .select("*");

    response.header("X-Total-Count", total["count(*)"]);

    return response.json({ incidents });
  }
};
