import ScanHistory from '../models/ScanModel.js';

export const addScanHistory = async (req, res) => {
    try {
        const { userId, nameFood, eatTime, calorie, portion, total } = req.body;

        const newScanHistory = await ScanHistory.create({
            userId,
            nameFood,
            eatTime,
            calorie,
            portion,
            total,
        });

        res.json({
            error: false,
            message: "success",
            scanResult: newScanHistory
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: true,
            message: "Terjadi kesalahan server"
        });
    }
};

export const getScanHistory = async (req, res) => {
    try {
        const { userId, date } = req.body;

        const scanHistory = await ScanHistory.findAll({
            where: {
                userId,
                date
            },
        });

        if (scanHistory.length === 0) {
            return res.json({
                error: true,
                message: "Data not found",
                history: scanHistory
            });
        }

        res.json({
            error: false,
            message: "success",
            history: scanHistory
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: true,
            message: "Terjadi kesalahan server"
        });
    }
};
