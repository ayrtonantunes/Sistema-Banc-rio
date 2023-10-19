const { Pool } = require('pg')

const pool = new Pool({
	host: 'localhost',
	port: 5432,
	user: 'postgres',
	password: '152015',
	database: 'dindin',
})

module.exports = pool
