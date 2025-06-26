import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const apidatos = sequelize.define("Character", {
    id: { type: DataTypes.INTEGER, allownull:false, primaryKey: true, autoIncrement: true},
    name: { type: DataTypes.STRING },
    ki: { type: DataTypes.INTEGER, allownull: false},
    race: { type: DataTypes.STRING, allownull: false },
    gender: { type: DataTypes.STRING, allownull: false },
    description: { type: DataTypes.STRING }
});

export default apidatos;