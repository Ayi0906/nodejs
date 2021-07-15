const express = require('express')
const router_index = express.Router()

router_index.get('/', (req, res) => {
    res.redirect('/students')
})

module.exports = router_index