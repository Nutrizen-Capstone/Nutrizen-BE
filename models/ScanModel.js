import { DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import db from '../config/db.js';

const ScanHistory = db.define('scan_histories', {
    historyId: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: () => uuidv4(),
        allowNull: false,
        unique: true
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
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        get() {
            return moment(this.getDataValue('date')).format('YYYY-MM-DD');
        },
        set(value) {
            // Menangani pengaturan nilai tanggal sebelum disimpan
            const formattedDate = moment(value, 'YYYY-MM-DD').toDate();
            this.setDataValue('date', formattedDate);
        },
    },
});

export default ScanHistory;
