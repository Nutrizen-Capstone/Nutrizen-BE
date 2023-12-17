import { Sequelize } from "sequelize";
import { v4 as uuidv4 } from 'uuid';
import db from "../config/db.js";

const { DataTypes } = Sequelize;

const Users = db.define('users', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: () => uuidv4(), // Set nilai default menggunakan UUID
        allowNull: false,
        unique: true, // Jadikan kolom ini unique
    },
    name: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
    refresh_token: {
        type: DataTypes.STRING,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    photoUrl: {
        type: DataTypes.STRING,
        defaultValue: 'https://storage.googleapis.com/nutrizen-bucket/profile%20pictures/default-profile.jpg',
    },
    birthDate: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.fn('current_timestamp'),
    },
    age: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    gender: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    weight: {
        type: DataTypes.DOUBLE,
        defaultValue: 0,
    },
    height: {
        type: DataTypes.DOUBLE,
        defaultValue: 0,
    },
    activity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    goal: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    isDataCompleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    freezeTableName: true,
});

export default Users;
