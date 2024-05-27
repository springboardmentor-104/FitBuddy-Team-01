const express = require('express');
const router = express.Router();
const { requireSignIn } = require("../middleware/authMiddleware");


const {showAllHistoryController ,todayAllTask, todayDataCategoryWise ,createEveryDayHistoryData, getCompletionRates} = require('../controllers/historyController')

router.get('/all/:type',requireSignIn,showAllHistoryController );

router.get('/today/:type',requireSignIn,todayAllTask );
router.get('/today/:type/:status',requireSignIn,todayDataCategoryWise );
router.get('/create_everyday_historydata',requireSignIn, createEveryDayHistoryData)

// to show chart
router.get('/show/chart', requireSignIn, getCompletionRates)

module.exports = router
