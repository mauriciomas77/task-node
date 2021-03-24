const mongoose = require('mongoose')
const { mongodb } = require('./keys')

mongoose.connect(mongodb.URI, {})
    .then(db => console.log('Base de datos conectada'))
    .catch(err => console.log(err))