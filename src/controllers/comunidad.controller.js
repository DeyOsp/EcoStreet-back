import getConnection from "../database/connection.mysql.js"
import { variablesDB } from "../utils/params/const.database.js"
import { responseQueries } from "../common/enum/queries/response.queries.js"

export const getComunidad = async (req, res) => {
    const conn = await getConnection();
    const db = variablesDB.data_base;
    const query = `
    SELECT * FROM ${db}.vista_estadisticas_comunidad;`;
    const select = await conn.query(query);
    if (!select) return res.json({
        status: 500,
        message: 'Error obteniendo los datos'
    });
    return res.json(select[0]);
}
