const base = require('./base')

const table = 'users'
const columns = ['id', 'user']

const create = data => base.create(table, data).then(result => {
    const copy = structuredClone(data)
    copy.id = result
    return copy
})

const list = where => base.list(table, {
    columns,
    where
})

const read = key => base.read(table, key, {
    columns
})

const update = (data, where) => base.update(table, data, {
    where
})

const remove = (where) => base.remove(table, {
    where
})



module.exports = {create, list, read, update, remove}