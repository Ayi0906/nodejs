const fs = require('fs')

function pWriteFile(filepath, data) {
    let p = new Promise((resolve, reject) => {
        fs.writeFile(filepath, data, (err) => {
            if (err) reject()
            else resolve()
        })
    })
    return p
}

module.exports = pWriteFile