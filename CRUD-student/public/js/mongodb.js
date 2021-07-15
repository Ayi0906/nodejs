const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/crud')

const schema = mongoose.schema
let studentsSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: Number,
        required: true
    },
    hobbies: {
        type: String,
        required: true
    }
})

let Student=mongoose.model('Student')