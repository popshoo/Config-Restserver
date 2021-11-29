const { response } = require("express")
const router = require("../routes/usuarios")
const {login} = require('../controllers/auth')
 

const login = (req, res = response) => {
    res.json({
        msg: 'Login OK'
    })
}

module.exports = router;