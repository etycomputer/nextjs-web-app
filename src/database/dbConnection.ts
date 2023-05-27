// import { DataSource } from 'typeorm';

// export const DB_Connection = new DataSource({
//     type: 'postgres',
//     name: 'default',
//     // host: process.env.DB_HOST,
//     // port: Number(process.env.DB_PORT),
//     // username: process.env.DB_USER,
//     // password: process.env.DB_PASS,
//     // database: process.env.DB_NAME,
//     host: 'localhost',
//     port: 5432,
//     username: 'postgres',
//     password: 'admin',
//     database: 'OT',
//     synchronize: false,
//     logging: true,
//     entities: ['entities/**/*.entity.ts'],
// });

// DB_Connection.initialize()
//     .then(() => {
//         console.log("Data Source has been initialized!")
//     })
//     .catch((err) => {
//         console.error("Error during Data Source initialization", err)
//     })

