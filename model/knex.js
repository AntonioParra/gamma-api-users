const env = process.env

const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: env.MARIADB_HOST,
        port: env.MARIADB_PORT,
        database: env.MARIADB_DATABASE,
        user: env.MARIADB_USER,
        password: env.MARIADB_PASSWORD
    }
})

module.exports = knex