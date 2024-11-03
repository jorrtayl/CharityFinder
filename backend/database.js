import mysql from 'mysql2'

import dotenv from 'dotenv'
dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

async function getCharities() {
    const [rows] = await pool.query("SELECT * FROM charities")
    return rows
}

// const charities = await getCharities()
// console.log(charities)

async function getCharity(charity_id){
    const [rows] = await pool.query(`
        SELECT *
        FROM charities
        WHERE charity_id =?
        `, [charity_id])
        return rows
}

// const charity = await getCharity(1)
// console.log(charity)

async function getCharityByEin(ein){
    const [rows] = await pool.query(`
        SELECT *
        FROM charities
        WHERE ein =?
        `, [ein])
        return rows
}

const charity = await getCharityByEin("131788491")
console.log(charity)