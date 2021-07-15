const express = require('express')
const app = express()

// 配置 .html文件 以 express-art-template 作为模板
app.engine('html', require('express-art-template'))

// 配置静态资源
app.use('/node_modules/',express.static('./node_modules'))

app.listen(3000, err => {
    if (err) throw err
    else console.log('running...')
})