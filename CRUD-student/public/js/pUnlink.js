const fs = require('fs')

function pUnlink(filePath) {
    let p = new Promise((resolve, reject) => {
        fs.unlink(filePath, (err) => {
            if (err) reject()
            else resolve()
        })
    })
    return p
}

module.exports = pUnlink