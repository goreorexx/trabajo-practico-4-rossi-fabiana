import characters from "../models/character.model.js";

export const createCharacter = async (req, res) => {
    try {
        const { name, ki, race, gender, description } = req.body;
        if (!ki || !race || !gender) {
            return res.status(400).json({ error: "Faltan datos obligatorios. Tal vez Freezer los robó."});
        }
        if (!Number.isInteger(ki)) {
            return res.status(400).json({ error: "El número ingresado no es válido, Vegetta dice que debe ser un entero."});
        }
        if (gender !== "Male" && gender !== "Female") {
            return res.status(400).json({ error: "Sólo se permite género masculino o femenino."});
        }
        if (!(await isNameUnique(name))) {
            return res.status(400).json({ error: "Goku te comunica que el nombre ya existe en la base de datos." });
        }
        if (description !== undefined && typeof description !== 'string') {
            return res.status(400).json({ error: "La descripción debe ser una oración."});
        }

    const character = await characters.create({ name, ki, race, gender, description });
    res.status(201).json(character);
    } catch (err) {
        res.status(500).json({ error: "Error al crear el personaje." });
    }
};

const isNameUnique = async (name) => {
    const character = await characters.findOne({ where: { name: name }});
    return character === null;
};

export const getallcharacters = async (req, res) => {
    try {
        const allCharacters = await characters.findAll();
        res.json(allCharacters);
    } catch (err) {
        res.status(500).json({ error: "Error al buscar el personaje." });
    }
};

export const getcharacterbyid = async (req, res) => {
    try {
        const character = await characters.findByPk(req.params.id);
        if (!character) {
            return res.status(404).json({ error: "Personaje no encontrado en este universo." });
        }
        res.json(character);
    } catch (err) {
        res.status(500).json({ error: "Error al buscar el personaje por ID." });
    }
};

export const updatecharacter = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, ki, race, gender, description } = req.body;
        const character = await characters.findByPk(id);
        if (!character) {
            return res.status(404).json({ error: "El personaje a actualizar no fue encontrado."});
        }
        if (ki !== undefined && !Number.isInteger(ki)) {
            return res.status(400).json({ error: "El número de Ki ingresado no es válido, Vegetta dice que debe ser un entero." });
        }
        if (gender !== undefined && gender !== "Male" && gender !== "Female") {
            return res.status(400).json({ error: "Sólo se permite género masculino o femenino." });
        }
        if (description !== undefined && typeof description !== 'string') {
            return res.status(400).json({ error: "La descripción debe ser una oración." });
        }
            if (name !== undefined && !(await isNameUnique(name, id))) {
            return res.status(400).json({ error: "Gokú te comunica que el nombre ya existe en la base de datos." });
        }

        await character.update(req.body);
        res.json({ message: "Personaje actualizado con éxito." });
    } catch (err) {
        res.status(500).json({ error: "Error al actualizar el personaje." });
    }
};

export const deletecharacter = async (req, res) => {
    try {
        const { id } = req.params;

        const character = await characters.findByPk(id);
        if (!character) {
            return res.status(404).json({ error: "El personaje a eliminar no fue encontrado." });
        }

        await character.destroy();
        res.json({ message: "Personaje eliminado con éxito." });
    } catch (err) {
        res.status(500).json({ error: "Error al eliminar el personaje" });
    }
}
