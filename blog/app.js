// 引入第三方包
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')

// 引入自己的包
const User = require('./models/user')

// 启动服务器
const app = express()
app.listen(3000, () => {
    console.log('running...');
})

// 配置静态资源
app.use('/node_modules/', express.static(path.join(__dirname, '/node_modules')))
app.use('/public/', express.static(path.join(__dirname, '/public')))


// 配置POST方法接收的数据
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

// 配置express-art-template
app.set('views', path.join(__dirname, '/views'))
app.engine('.html', require('express-art-template'))

// 路由
app
    // 渲染首页
    .get('/', (req, res) => {
        res.render('index.html')
    })
    // 渲染登录界面
    .get('/login', (req, res) => {
        res.render('login.html', {
            title: '登录页面',
            header: '用户登录',
            btnVal: '登录'
        })
    })
    // 处理登录请求
    .post('/login', (req, res) => {
        res.send(req.body)
    })
    // 渲染注册页面
    .get('/register', (req, res) => {
        res.render('register.html', {
            title: '注册页面',
            header: '用户注册',
            btnVal: '注册'
        })
    })
    // 处理注册请求
    .post('/register', (req, res) => {
        // res.send(req.body)
        // 获取表单提交的数据
        // 操作数据库：判断用户是否已存在，如果存在不允许注册，不存在则创建账户
        let body = req.body
        User.findOne({
            $or: [{
                email: body.email
            }, {
                nickname: body.nickname
            }]
        }, function (err, data) {
            if (err) {
                return res.status(500).send('Server Error')
            }
            if (data) {
                // 邮箱或昵称已存在
                return res.status(200).send('{"success":true}')
            }
        })
    })