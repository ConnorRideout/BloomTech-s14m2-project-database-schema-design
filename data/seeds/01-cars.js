exports.seed = function (knex, Promise) {
    return knex('cars').truncate()
        .then(function () {
            return knex('cars').insert([
                {
                    vin: '11111111111111111',
                    make: 'Toyota',
                    model: 'Camry',
                    mileage: 12345,
                    title: 'clean',
                    transmission: 'automatic'
                },
                {
                    vin: '22222222222222222',
                    make: 'Subaru',
                    model: 'Outback',
                    mileage: 154987,
                    title: 'salvage',
                    transmission: 'manual'
                }
            ])
        })
}