const http = require('http')
const url = require('url')
const template = require('art-template')
const fs = require('fs')

let cmts = [{
    uname: '小猪佩奇',
    cmt: '哼哼',
    date: '1984年5月5日'
}]

http.createServer((req, res) => {
    if (req.url === '/') {
        fsHandle().then(() => {
            fs.readFile('./comments.txt', (err, data) => {
                if (err) return res.end('404 not found comments.txt')
                let cmtText = JSON.parse(data.toString())
                fs.readFile('./index.html', (err, data) => {
                    if (err) return res.end('404 not found')
                    let htmlStr = template.render(data.toString(), {
                        comments: cmtText
                    })
                    res.end(htmlStr)
                })
            })
        }, () => {
            res.end('unlink or create file wrong')
        })
    } else if (req.url.indexOf('/addcmt') === 0) {
        let queryObj = url.parse(req.url, true).query
        let uname = queryObj.uname
        let cmt = queryObj.cmt
        let date = new Date()
        let y = date.getFullYear()
        let m = date.getMonth()
        let d = date.getDate()

        if (fs.existsSync('./comments.txt')) {
            fs.readFile('./comments.txt', (err, data) => {
                if (err) res.end('read comments.txt wrong')
                cmts = JSON.parse(data.toString())
                cmts.push({
                    uname: uname,
                    cmt: cmt,
                    date: `${y}年${m+1}月${d}日`
                })
                fs.unlink('./comments.txt', (err) => {
                    if (err) res.end('unlink file wrong')
                    fs.writeFile('./comments.txt', JSON.stringify(cmts), (err) => {
                        if (err) return res.end('write file wrong')
                        res.statusCode = 302
                        res.setHeader('Location', '/')
                        res.end()
                    })
                })
            })
        } else {
            cmts.push({
                uname: uname,
                cmt: cmt,
                date: `${y}年${m+1}月${d}日`
            })
            fs.writeFile('./comments.txt', JSON.stringify(cmts), (err) => {
                if (err) res.end('write file wrong')
                fs.readFile('./index.html', (err, data) => {
                    if (err) return res.end('404 not found index.html')
                    let htmlstr = template.render(data.toString(), {
                        comments: cmts
                    })
                    res.end(htmlstr)
                })
            })
        }

    } else if (req.url === '/writeCmts') {
        fs.readFile('./writeCmt.html', (err, data) => {
            if (err) return res.end('404 can\'t read writeCmt.html')
            res.end(data)
        })
    } else {
        res.end('404 cant\'t found page')
    }
}).listen(3000, err => {
    if (err) throw err
    else console.log('running...')
})

function fsHandle() {
    let p = new Promise((resolve, reject) => {
        if (fs.existsSync('./comments.txt')) {
            resolve()
        } else {
            fs.writeFile('./comments.txt', JSON.stringify(cmts), (err) => {
                if (err) {
                    console.log('write err')
                    reject()
                    return
                }
                resolve()
            })
        }
    })
    return p
}