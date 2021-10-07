import {Sequelize} from 'sequelize'

export default new Sequelize(
    process.env.DB_NAME ?? "gallery",
    process.env.DB_USER ?? "postgres",
    process.env.DB_PASSWORD ?? "0o1qpowe",
    {
        dialect: 'postgres',
        host: process.env.DB_HOST
    }
)
