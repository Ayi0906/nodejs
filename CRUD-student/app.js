const express = require('express')
// const bodyParser = require('body-parser')
const app = express()
const router_student = require('./public/js/router_students')
const router_index = require('./public/js/router_index')


// 公开静态资源
app.use('/node_modules/', express.static('./node_modules'))
app.use('/public/', express.static('./public'))

// 配置.html文件的模板引擎
app.engine('html', require('express-art-template'))

// 配置post数据的解析
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

// 配置路由
app.use('/students', router_student)
app.use(router_index)



app.listen(3000, err => {
    if (err) return console.log('running err: ' + err)
    else console.log('running...')
})