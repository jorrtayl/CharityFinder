import mysql from 'mysql2'

import dotenv from 'dotenv'  //used for the .env variable file so we can configure it for each of our own machines.
dotenv.config()

// This is the database connection function
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

// a query function to get all the results from the charities table
export async function getCharities() {
    const [rows] = await pool.query("SELECT * FROM charities")
    return rows
}
// testing above function
// const charities = await getCharities()
// console.log(charities)

// a query function to get a single charity by its id
export async function getCharity(charity_id){
    const [rows] = await pool.query(`
        SELECT *
        FROM charities
        WHERE charity_id =?
        `, [charity_id])
        return rows
}
// testing above function
// const charity = await getCharity(1)
// console.log(charity)

// a query function to get a single charity by its ein
export async function getCharityByEin(ein){
    const [rows] = await pool.query(`
        SELECT *
        FROM charities
        WHERE ein =?
        `, [ein])
        return rows
}
// testing above function
// const charity = await getCharityByEin("131788491")
// console.log(charity)

// creating export object
const db = {
    getCharities,
    getCharity,
    getCharityByEin
}

// exporting the db object
export default db;


