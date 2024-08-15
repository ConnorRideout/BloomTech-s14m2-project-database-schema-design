const db = require('../../data/db-config')

const getAll = () => {
    // resolves to an array of car records (or an empty array)
    return db('cars')
        .orderBy('id')
}

const getById = id => {
    // resolves to a car record by the given id
    return db('cars')
        .where({ id })
        .first()
}

const create = record => {
    // resolves to the newly created car record
    return db('cars')
        .insert(record)
        .then(([id]) => {
            return getById(id)
        })
}

module.exports = {
    getAll,
    getById,
    create
}