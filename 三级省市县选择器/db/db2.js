const mongoose = require('mongoose')

function connectDB(success, failed) {
    mongoose.connect('mongodb://127.0.0.1:27017/test')
    mongoose.connection.on('open', (err) => {
        if (err) {
            failed()
        } else {
            success()
        }
    })
}

module.exports = connectDB
