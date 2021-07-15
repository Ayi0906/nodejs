const fs = require('fs')

function pReadFile(filePath) {
    let p = new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
    return p
}

module.exports = pReadFile