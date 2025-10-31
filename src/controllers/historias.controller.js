import getConnection from "../database/connection.mysql.js"
import { variablesDB } from "../utils/params/const.database.js"
import { responseQueries } from "../common/enum/queries/response.queries.js"

export const getTest = async (req, res) => {
    const conn = await getConnection();
    const db = variablesDB.data_base;
    const query = `
    SELECT
      id,
      titulo,
      descripcion,
      DATE_FORMAT(fecha_historia, '%M %Y') AS mes_anio
    FROM ${db}.historias
    ORDER BY fecha_historia DESC
    LIMIT 10;
`;
    const select = await conn.query(query);
    if (!select) return res.json({
        status: 500,
        message: 'Error obteniendo los datos'
    });
    return res.json(select[0]);
}

export const saveTest = async (req, res) => {
    const { column1, column2 } = req.body;

    if (!column1 || !column2) {
        return res.json(responseQueries.error({ message: "Datos incompletos" }));
    }

    const conn = await getConnection();
    const db = variablesDB.data_base;

    const insert = await conn.query(
        `INSERT INTO ${db}.historias (titulo, descripcion, fecha_historia) VALUES (?, ?, ?);`,
        [column1, column2]
    );

    if (!insert) return res.json(responseQueries.error({ message: "Error al guardar los datos" }));

    return res.json(responseQueries.success({ message: "Datos guardados con éxito" }));
};
