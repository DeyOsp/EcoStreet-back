import express from "express";

// Middlewares
import { AuthorizationVerify } from "../middleware/authorization.js"
import { ConnectionVerify } from "../middleware/connection.js"

// Controllers
import { getComunidad, saveComunidad } from "../controllers/comunidad.controller.js"
import { getHistorias, saveHistorias } from "../controllers/historias.controller.js"
import { getReportes, saveReportes } from "../controllers/reportes.controller.js"

// Database
import { getConnect } from "../database/connection.controller.js"

const router = express();

export const routes = () => {

    // Comunidad
    router.get("/comunidad/g/get-comunidad", AuthorizationVerify, getComunidad)
    router.post("/comunidad/i/save-comunidad", AuthorizationVerify, saveComunidad)

    // Historias
    router.get("/historias/g/get-historias", AuthorizationVerify, getHistorias)
    router.post("/historias/i/save-historias", AuthorizationVerify, saveHistorias)

    // Reportes
    router.get("/reportes/g/get-reportes", AuthorizationVerify, getReportes)
    router.post("/reportes/i/save-reportes", AuthorizationVerify, saveReportes)

    // Database
    router.get("/connect/", ConnectionVerify, getConnect)

    return router;
}