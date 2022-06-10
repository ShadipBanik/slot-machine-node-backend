var express = require('express');
var router = express.Router();
var rollController=require('../controller/roll.controller')
/* GET home page. */
router.get('/doSpin/:credit', rollController.doSpin );
router.get('/cashout/', rollController.CashOut );
router.get('/reset/', rollController.Reset);

module.exports = router;