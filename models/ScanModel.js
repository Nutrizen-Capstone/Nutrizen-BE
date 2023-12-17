import { DataTypes, Sequelize } from 'sequelize';

import { v4 as uuidv4 } from 'uuid';
import db from '../config/db.js';

const ScanHistory = db.define('scan_history', {
    historyId: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: uuidv4(),
        allowNull: false,
    },
    userId: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    nameFood: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    eatTime: {
        type: DataTypes.TIME,
        allowNull: true,
    },
    calorie: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    portion: {
        type: DataTypes.DOUBLE,
        allowNull: true,
    },
    total: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    timestamps: false,  // Nonaktifkan kolom createdAt dan updatedAt
    underscored: false,   // Gunakan _ sebagai pemisah antara kata dalam nama kolom
});

export default ScanHistory;
