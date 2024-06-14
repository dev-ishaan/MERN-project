const express = require('express');
const Users = require('../models/Users');
const router = express.Router();

// Creating user using : POST "/api/auth"
router.post('/', (req, res) => {
    const user = Users(req.body)
    console.log(req.body)
    user.save()
    res.send(req.body)
})

module.exports = router