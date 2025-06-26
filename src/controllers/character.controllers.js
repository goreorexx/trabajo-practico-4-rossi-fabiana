import characters from "../models/character.model.js";

export const createCharacter = async (req, res) => {
    try {
        const { name, ki, race, gender, description } = req.body;
        if (!ki || !race || !gender) {
            return res.status(400).json({ error: "Faltan datos obligatorios."});
        }
        if (!Number.isInteger(ki)) {
            return res.status(400).json({ error: "El número ingresado no es válido, debe ser un entero."});
        }
        if (gender !== "Male" && gender !== "Female") {
            return res.status(400).json({ error: "Sólo se permite género masculino o femenino."});
        }
        if (!(await isNameUnique(name))) {
            return res.status(400).json({ error: "El nombre ya existe en la base de datos." });
        }
        if (description !== undefined && typeof description !== 'string') {
            return res.status(400).json({ error: "La descripción debe ser una oración."});
        }

    const character = await character.create(req.body);
    res.status(201).json(character);
    } catch (err) {
        res.status(500).json({ error: "Error al crear el personaje." });
    }
}