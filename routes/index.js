const express = require('express');
const router = express.Router();

const users_controller = require('../controllers/usersController')
const trades_controller = require('../controllers/tradesController')

/* GET home page. */

router.post('/signup', users_controller.sign_up_post)

router.get('/login', users_controller.log_in_get)

router.post('/login', users_controller.log_in_post)

router.get('/logout', users_controller.log_out_get)

router.get('/verifytoken', users_controller.verify_token_get)

router.post('/newtrade', trades_controller.new_trade_post)



module.exports = router;
