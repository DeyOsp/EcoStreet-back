import getConnection from "../database/connection.mysql.js"
import { variablesDB } from "../utils/params/const.database.js"
import { responseQueries } from "../common/enum/queries/response.queries.js"

export const getReportes = async (req, res) => {
    const conn = await getConnection();
    const db = variablesDB.data_base;
    const query = `
    SELECT
      r.id,
      r.tipo,
      COALESCE(r.titulo, CONCAT(UPPER(r.tipo), ' #', r.id)) AS titulo,
      r.descripcion,
      r.direccion,
      r.latitud,
      r.longitud,
      CASE
        WHEN r.es_anonimo = 1 OR r.nombre_reporta IS NULL OR TRIM(r.nombre_reporta) = '' THEN 'Anónimo'
        ELSE r.nombre_reporta
      END AS reportado_por,
      DATE_FORMAT(r.creado_en, '%Y-%m-%d %H:%i:%s') AS fecha_reporte,
      r.estado
    FROM ${db}.reportes r
    ORDER BY r.creado_en DESC;
    `;
    const select = await conn.query(query);
    if (!select) return res.json({
        status: 500,
        message: 'Error obteniendo los datos'
    });
    return res.json(select[0]);
}

export const getReporte = async (req, res) => {
    const conn = await getConnection();
    const db = variablesDB.data_base;
    const { id } = req.params;

    const query = `
    SELECT
      r.id,
      r.tipo,
      r.titulo,
      r.descripcion,
      r.direccion,
      CASE
        WHEN r.es_anonimo = 1 OR r.nombre_reporta IS NULL OR TRIM(r.nombre_reporta) = '' THEN 'Anónimo'
        ELSE r.nombre_reporta
      END AS reportado_por,
      DATE_FORMAT(r.creado_en, '%M %Y') AS mes_anio_reporte,
      r.estado,
      f.imagen_base64,
      f.descripcion AS descripcion_foto
    FROM ${db}.reportes r
    LEFT JOIN ${db}.fotos_reporte f ON r.id = f.id_reporte
    WHERE r.id = ?;`;
    const select = await conn.query(query, [id]);
    if (!select) return res.json({
        status: 500,
        message: 'Error obteniendo los datos'
    });
    return res.json(select[0]);
}

export const saveReportes = async (req, res) => {
    const { tipo, titulo, descripcion, direccion, latitud, longitud, id_miembro_reporta, correo_reporta, nombre_reporta, es_anonimo } = req.body;

    if (!tipo || !titulo || !descripcion || !direccion || !latitud || !longitud || !id_miembro_reporta || !correo_reporta || !nombre_reporta || !es_anonimo) {
        return res.json(responseQueries.error({ message: "Datos incompletos" }));
    }

    const conn = await getConnection();
    const db = variablesDB.data_base;

    const insert = await conn.query(
        `INSERT INTO ${db}.reportes (tipo, titulo, descripcion, direccion, latitud, longitud,id_miembro_reporta, correo_reporta, nombre_reporta, es_anonimo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [tipo, titulo, descripcion, direccion, latitud, longitud, id_miembro_reporta, correo_reporta, nombre_reporta, es_anonimo]
    );

    if (!insert) return res.json(responseQueries.error({ message: "Error al guardar los datos" }));

    return res.json(responseQueries.success({ message: "Datos guardados con éxito" }));
};
