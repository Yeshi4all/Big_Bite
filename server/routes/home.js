const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

/******************************************************************************
 * Get
 * ****************************************************************************
 * Routes for home
 ******************************************************************************/

router.get('/', homeController.homepage);


module.exports = router;