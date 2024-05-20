const express = require('express');
const router = express.Router();
const { requireSignIn } = require("../middleware/authMiddleware");


const {  todayHistoryController, showAllHistoryController } = require('../controllers/historyController')

router.get('/today/:id',requireSignIn,todayHistoryController );
router.get('/all',requireSignIn,showAllHistoryController );

module.exports = router
