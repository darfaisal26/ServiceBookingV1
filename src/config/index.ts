import dotenv from "dotenv";
dotenv.config();

const config = {
  env: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT || "3000"),
  database: {
    name: process.env.DB_NAME || "servicebookingtest",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "admin",
    host: process.env.DB_HOST || "127.0.0.1",
    port: parseInt(process.env.DB_PORT || "3306"),
  },
};

export default config;
