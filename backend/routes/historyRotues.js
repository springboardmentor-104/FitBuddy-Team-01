const express = require('express');
const router = express.Router();
const { requireSignIn } = require("../middleware/authMiddleware");


const {showAllHistoryController ,todayAllTask, todayDataCategoryWise ,createEveryDayHistoryData} = require('../controllers/historyController')

router.get('/all/:type',requireSignIn,showAllHistoryController );

router.get('/today/:type',requireSignIn,todayAllTask );
router.get('/today/:type/:status',requireSignIn,todayDataCategoryWise );
router.get('/create_everyday_historydata',requireSignIn, createEveryDayHistoryData)

module.exports = router
