/**
 * @ignore =============================
 * @file router_student.js
 * @desc 适用于app.js的路由集合文件
 * @todo 完成 get 方法的 '/students' 路由的渲染首页的功能 // bingo
 * @todo 完成 get 方法的 '/students/delete' 路由的删除指定数据的功能 
 * @todo 完成 post 方法的 '/students/new' 路由的处理添加学生的请求的功能 // bingo
 * @todo 完成 get 方法的 '/students/new' 路由的渲染 添加新的学生 页面 // bingo
 * @todo 完成 get 方法的 '/students/edit' 路由的渲染 编辑 页面，get参数为 id
 * @todo 完成 post 方法的 '/students/edit' 路由的 处理编辑请求 页面，post参数为 id，name，age，gender，hobbies
 * @author donglei
 * @createDate 2021-7-13
 * @ignore =============================
 */


// 第三方模块

/**
 * @ignore =============================
 * @func pfilePath
 * @param [filePath] {string} 文件地址
 * @resolve [data]
 * @reject [err]
 * @return [Promise]
 * @ignore =============================
 */
const pReadFile = require('./pReadFile')
/**
 * @ignore =============================
 * @func pWriteFile
 * @param [filePath] {string} 文件地址
 * @param [data] {string}{buffer} 写入数据
 * @resolve {string} 'write success'
 * @reject {obj} err
 * @return [Promise]
 * @ignore =============================
 */
const pWriteFile = require('./pWriteFile')
/**
 * @ignore =============================
 * @func pUnlink
 * @param [filePath] {string} 文件地址
 * @resolve {string} 
 * @reject {obj} err
 * @return [Promise]
 * @ignore =============================
 */
const pUnlink = require('./pUnlink')

const express = require('express')

const router_student = express.Router()
const filePath = './db.json'

/** 
 * 获取首页 
 */

router_student.get('/', (req, res) => {
    pReadFile(filePath)
        .then((data) => {
            let obj = JSON.parse(data)
            for (let i = 0; i < obj.students.length; i++) {
                switch (parseInt(obj.students[i].gender)) {
                    case 1:
                        obj.students[i].gender = '男'
                        break
                    case 0:
                        obj.students[i].gender = '女'
                        break
                }
            }
            res.render('index.html', {
                title: obj.title,
                students: obj.students
            })
        }, (err) => {
            res.send('read db.json wrong')
        })
})


/**
 * 获取 新增用户表单 界面
 */

router_student.get('/new', (req, res) => {
    res.render('new.html')
})


/**
 * 提交新表单
 */

router_student.post('/new', (req, res) => {
    let newData = req.body
    let newObj;
    pReadFile(filePath)
        .then((data) => {
            let obj = JSON.parse(data)
            if (obj.students.length !== 0) {
                newData.id = parseInt(obj.students[obj.students.length - 1].id) + 1
            } else {
                newData.id = 1
            }
            obj.students.push(newData)
            newObj = obj
            pUnlink(filePath)
        })
        .then(data => {
            pWriteFile(filePath, JSON.stringify(newObj))
        })
        .then(data => {
            res.redirect('/students')
        })
})

/**
 * 根据id删除指定数据
 */

router_student.get('/delete', (req, res) => {
    let delId = parseInt(req.query.id)
    let newData
    pReadFile(filePath)
        .then(data => {
            let obj = JSON.parse(data)
            let i = obj.students.findIndex((item, index) => {
                return parseInt(item.id) === delId
            })
            obj.students.splice(i, 1)
            newData = JSON.stringify(obj)
            pUnlink(filePath)
        })
        .then(() => {
            pWriteFile(filePath, newData)
        })
        .then(() => {
            res.redirect('/students')
        })
})

/**
 * 根据id编辑信息,，打开编辑页面
 */

router_student.get('/edit', (req, res) => {
    let editId = parseInt(req.query.id)
    pReadFile(filePath)
        .then(data => {
            let arr = JSON.parse(data).students
            let item = arr.find((item, index, arr) => {
                return parseInt(item.id) === editId
            })
            console.log(item)
            res.render('edit.html', {
                info: item
            })
        })
})

/**
 * 重新提交修改后的数据
 */

router_student.post('/edit', (req, res) => {
    let postData = req.body
    let newData
    pReadFile(filePath)
        .then((data) => {
            let newObj = JSON.parse(data)
            let arr = newObj.students
            let students = arr.map((item, index, arr) => {
                if (parseInt(item.id) === parseInt(postData.id)) {
                    item = postData
                    return item
                } else {
                    return item
                }
            })
            newObj.students = students
            newData = JSON.stringify(newObj)
            pUnlink(filePath)
        })
        .then(() => {
            pWriteFile(filePath, newData)
        })
        .then(() => {
            res.redirect('/students')
        })
})


module.exports = router_student