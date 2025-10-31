import express from "express";

// Middlewares
import { AuthorizationVerify } from "../middleware/authorization.js"
import { ConnectionVerify } from "../middleware/connection.js"

// Controllers
import { getComunidad } from "../controllers/comunidad.controller.js"
import { getHistorias, saveHistorias } from "../controllers/historias.controller.js"
import { getReportes, getReporte, saveReportes } from "../controllers/reportes.controller.js"

// Database
import { getConnect } from "../database/connection.controller.js"

const router = express();

export const routes = () => {

    // Comunidad
    router.get("/comunidad/g/get-comunidad", AuthorizationVerify, getComunidad)

    // Historias
    router.get("/historias/g/get-historias", AuthorizationVerify, getHistorias)
    router.post("/historias/i/save-historias", AuthorizationVerify, saveHistorias)

    // Reportes
    router.get("/reportes/g/get-reportes", AuthorizationVerify, getReportes)
    router.get("/reportes/g/get-reporte/:id", AuthorizationVerify, getReporte)
    router.post("/reportes/i/save-reportes", AuthorizationVerify, saveReportes)

    // Database
    router.get("/connect/", ConnectionVerify, getConnect)

    return router;
}