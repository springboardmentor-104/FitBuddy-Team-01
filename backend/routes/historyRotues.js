const express = require('express');
const router = express.Router();
const { requireSignIn } = require("../middleware/authMiddleware");


const {showAllHistoryController ,todayAllTask, todayDataCategoryWise} = require('../controllers/historyController')

router.get('/all/:type',requireSignIn,showAllHistoryController );

router.get('/today/:type',requireSignIn,todayAllTask );
router.get('/today/:type/:status',requireSignIn,todayDataCategoryWise );

module.exports = router
