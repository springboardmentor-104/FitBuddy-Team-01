const express = require('express');
const router = express.Router();

const {  todayHistoryController, showAllHistoryController } = require('../controllers/historyController')

router.get('/today/:id',todayHistoryController );
router.get('/all',showAllHistoryController );

module.exports = router
