const knex = require('../knex')



const create = (table, data, options) => new Promise((resolve, reject) => {
    if(!table) {
        reject(`"table" is required: ${JSON.stringify(table)}`)
    }
    if(!data) {
        reject(`"data" is required: ${JSON.stringify(data)}`)
    }
    if(!typeof data === "object" || Array.isArray(data)) {
        reject(`"data" must be an object: ${JSON.stringify(data)}`)
    }
    
    let query = knex(table).insert(data)
    query.then(resolve).catch(err => reject(err.sqlMessage))
})





const list = (table, options) => new Promise((resolve, reject) => {
    if(!table) {
        reject(`"table" is required: ${JSON.stringify(table)}`)
    }
    
    let query = knex

    if(options?.columns) {
        query = query.select(options.columns)
    } else {
        query = query.select()
    }

    if(options?.where) {
        query = query.where(options.where)
    }

    query.from(table).then(result => resolve(structuredClone(result))).catch(err => reject(err.sqlMessage))
})





const read = (table, key, options) => new Promise((resolve, reject) => {
    if(!table) {
        reject(`"table" is required: ${JSON.stringify(table)}`)
    }
    if(!key) {
        reject(`"key" is required: ${JSON.stringify(key)}`)
    }
    if(!typeof key === "object" || Array.isArray(key)) {
        reject(`"key" must be an object: ${JSON.stringify(key)}`)
    }
    
    let query = knex

    if(options?.columns) {
        query = query.select(options.columns)
    } else {
        query = query.select()
    }

    query = query.where(key)

    query.from(table).then(result => {
        if(result.length > 1) {
            reject(`"results.length" must be 0 or 1: ${JSON.stringify(result)}, length: ${result?.length}`)
        }
        resolve(structuredClone(result[0]))
    }).catch(err => reject(err.sqlMessage || err))
})





const update = (table, data, options) => new Promise((resolve, reject) => {
    if(!table) {
        reject(`"table" is required: ${JSON.stringify(table)}`)
    }
    if(!data) {
        reject(`"data" is required: ${JSON.stringify(data)}`)
    }
    if(!typeof data === "object" || Array.isArray(data)) {
        reject(`"data" must be an object: ${JSON.stringify(data)}`)
    }
    
    let query = knex(table)
    
    if(options?.where) {
        query.where(options.where)
    }
    
    query.update(data).then(result => {
        // result es el numero de lineas modificadas
        resolve()
    }).catch(err => reject(err.sqlMessage || err))
})





const remove = (table, options) => new Promise((resolve, reject) => {
    if(!table) {
        reject(`"table" is required: ${JSON.stringify(table)}`)
    }
    
    let query = knex(table)
    
    if(options?.where) {
        query.where(options.where)
    }
    
    query.delete().then(result => {
        // result es el numero de lineas modificadas
        resolve()
    }).catch(err => reject(err.sqlMessage || err))
})

module.exports = {create, list, read, update, remove}