import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { createRequire } from "module";
import ProvinceRouter from "./src/controllers/province-controller.js";

const require = createRequire(import.meta.url);
const swaggerFile = require("./swagger-output.json");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/api/province", ProvinceRouter);

app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`);
    console.log(`Documentación Swagger disponible en http://localhost:${port}/api-docs`);
});