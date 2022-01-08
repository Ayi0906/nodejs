const mongoose = require('mongoose')
let Schema = mongoose.Schema
let citiesRule = new Schema() /* 不需要规则 */
module.exports = mongoose.model('cities', citiesRule)