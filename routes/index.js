const express = require('express');
const router = express.Router();

const users_controller = require('../controllers/usersController')
const trades_controller = require('../controllers/tradesController')
const trading_rules_controller = require('../controllers/tradingRulesController')
const setups_controller = require('../controllers/setupsController')
const instruments_controller = require('../controllers/instrumentsController')
const variableList_controller = require('../controllers/variablesListController')

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

router.post('/new-variables-list', variableList_controller.variables_list_post)

router.get('/get-variables-list', variableList_controller.variables_list_get)

router.delete('/delete-variables-list', variableList_controller.variables_list_delete)

router.post('/trade-post', trades_controller.trade_post)

router.post('/new-trade-post', trades_controller.new_trade_post)

router.get('/trades-get', trades_controller.trades_get)

router.delete('/trade-delete', trades_controller.trade_delete)

router.get('/trades-search', trades_controller.trades_search)

router.get('/trades-sort-get', trades_controller.trade_sort_get)



module.exports = router;
