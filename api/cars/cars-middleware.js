const Cars = require('./cars-model')
const vinValid = require('vin-validator').validate

const response = (message, status = 400) => {
    return { status, message }
}

const checkCarId = async (req, res, next) => {
    try {
        const { id } = req.params
        const car = await Cars.getById(id)
        if (car) {
            req.car = car
            next()
        } else {
            next(response(`car with id ${id} is not found`, 404))
        }
    } catch (err) {
        next(err)
    }
}

const checkCarPayload = (req, res, next) => {
    let missing = [];
    ['vin', 'make', 'model', 'mileage'].forEach(item => {
        if (req.body[item] === undefined) missing.push(item)
    })
    if (missing.length) {
        next(response(`${missing.join(', ')} is missing`))
    } else {
        next()
    }
}

const checkVinNumberValid = (req, res, next) => {
    const { vin } = req.body
    if (vinValid(vin)) {
        next()
    } else {
        next(response(`vin ${vin} is invalid`))
    }
}

const checkVinNumberUnique = async (req, res, next) => {
    const { vin } = req.body
    const cars = await Cars.getAll()
    if (cars.find(c => c.vin == vin)) {
        next(response(`vin ${vin} already exists`))
    } else {
        next()
    }
}

module.exports = {
    checkCarId,
    checkCarPayload,
    checkVinNumberValid,
    checkVinNumberUnique,
}