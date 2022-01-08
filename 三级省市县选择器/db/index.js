const mongoose = require('mongoose')

function connectDB(success, failed) {
    mongoose.connect('mongodb://127.0.0.1:27017/cities')
    mongoose.connection.on('open', (err) => {
        err && failed()
        !err && success()
    })
}

module.exports = connectDB