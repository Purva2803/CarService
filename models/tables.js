const pgp = require("pg-promise")();
const dotenv = require('dotenv');
dotenv.config();

const db = pgp(`postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@localhost:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DATABASE}`)


const createTables = async () => {
  try {
    await db.none(`
            CREATE TABLE IF NOT EXISTS "User" (
            user_id SERIAL PRIMARY KEY,
            user_name VARCHAR(255)
        );
        `);

    await db.none(`
       CREATE TABLE IF NOT EXISTS "Appointment" (
        appointment_id SERIAL PRIMARY KEY,
        user_id INT REFERENCES "User"(user_id),
        operator_id INT,
        appointment_start_time TIMESTAMP,
        appointment_end_time TIMESTAMP,
        status VARCHAR(255)
        );
      `);

    console.log("Tables created successfully.");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
};
module.exports = { db, createTables };
