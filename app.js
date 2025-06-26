import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.send('Api Dragon Ball');
});

app.listen(PORT, () => {
    console.log(`servidor corriendo en http://localhost:${PORT}`);
});