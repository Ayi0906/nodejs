const express = require('express')
const db = require('./db')
const citiesModel = require('./model/citiesModel')

const app = express()

db(() => {
    app.get('/get_provinces', (req, res) => {
        // 返回全部的省份信息
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:63343')
        citiesModel.find({level: 1}).select({province: 1, name: 1, _id: 0}).exec((err, data) => {
            if (!err && data) {
                res.send({status: 1, data})
            } else {
                res.send({status: 0, err})
            }
        })
    })
    app.get('/get_cities_by_province', (req, res) => {
        // 根据请求的省份信息返回这个省份下的所有市
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:63343')
        let {province} = req.query
        citiesModel.find({level: 2, province}, {_id: 0, city: 1, name: 1}, (err, data) => {
            if (!err && data) {
                res.send({status: 1, data})
            } else {
                res.send({status: 0, err})
            }
        })
    })
    app.get('/get_counts_by_city_and_province', (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:63343')
        let {province, city} = req.query
        citiesModel.find({level: 3, province, city}, {_id: 0, count: 1, name: 1}, (err, data) => {
            if (!err && data) {
                res.send({status: 1, data})
            } else {
                res.send({status: 0, err})
            }
        })
    })
}, () => {
    console.log('数据库连接失败')
})

app.listen(3000, (err) => {
    if (!err) console.log('server is running at port 3000')
    else console.log(err)
})