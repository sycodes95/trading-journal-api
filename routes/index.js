const express = require('express');
const router = express.Router();

const users_controller = require('../controllers/usersController')
const trades_controller = require('../controllers/tradesController')
const trading_rules_controller = require('../controllers/tradingRulesController')
const setups_controller = require('../controllers/setupsController')
const instruments_controller = require('../controllers/instrumentsController')

/* GET home page. */

router.post('/signup', users_controller.sign_up_post)

router.get('/login', users_controller.log_in_get)

router.post('/login', users_controller.log_in_post)

router.get('/logout', users_controller.log_out_get)

router.get('/verifytoken', users_controller.verify_token_get)

router.post('/newtrade', trades_controller.new_trade_post)

router.post('/tradingrules', )

router.post('/newsetup', setups_controller.new_setup_post)

router.get('/getsetups', setups_controller.setup_get)

router.delete('/deletesetups', setups_controller.setup_delete)

router.patch('/patchsetups', setups_controller.setup_active_patch)

router.post('/newinstrument', instruments_controller.new_instrument_post)

router.get('/getinstruments', instruments_controller.instrument_get)

router.delete('/deleteinstruments', instruments_controller.instrument_delete)

module.exports = router;
