var express = require('express');
var router = express.Router();

const DistrictController = require('../controllers/village-master.controller.js');

/* GET home page. */
// Route map definition pointing directly to Controller actions
router.post('/getVillage', DistrictController.getActiveDistricts);

module.exports = router;