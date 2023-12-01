import { Sequelize } from "sequelize";

const db = new Sequelize('nutridb','root', '',{
    host: "localhost",
    dialect: "mysql"
});

export default db; 