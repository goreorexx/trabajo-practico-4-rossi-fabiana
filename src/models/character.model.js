import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const apidatos = sequelize.define("Character", {
    id: { type: DataTypes.INTEGER, allownull:false, primaryKey: true, autoIncrement: true},
    name: { type: DataTypes.STRING, allownull: false, unique: true },
    ki: { type: DataTypes.INTEGER, allownull: false },
    race: { type: DataTypes.STRING, allownull: false },
    gender: { type: DataTypes.STRING, allownull: false, validate: { isIn: [["Male", "Female"]]} },
    description: { type: DataTypes.STRING }
});

export default apidatos;