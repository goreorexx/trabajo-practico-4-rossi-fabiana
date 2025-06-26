import express from "express";
import dotenv from "dotenv";
import sequelize from "./src/config/database.js";
import "./src/models/character.model.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send('Api Dragon Ball');
});

app.listen(PORT, () => {
    console.log(`servidor corriendo en http://localhost:${PORT}`);
});


sequelize.authenticate()
    .then(() => {
        console.log('Conexión a la base de datos exitosa');
        return sequelize.sync();
    })
    .then(() => {
        console.log('Tablas sincronizadas correctamente');
    })
    .catch(err => {
        console.error('No se pudo conectar a la base de datos o sincronizar tablas:', err);
    });
