const express = require('express');
const router = express.Router();
const dashboardcontroller = require('../controllers/dashboardcontroller');

/****************************************************************************
 * Get
 * ***************************************************************************
 * User dashboard
 ****************************************************************************/

router.get('/dashboard', dashboardcontroller.restuarantabout);

/*****************************************************************************
 * Get
 * ***************************************************************************
 * Customer home page
 *****************************************************************************/

router.get('/dashboardhome', dashboardcontroller.restuaranthome);

/******************************************************************************
 * Get
 * ****************************************************************************
 * Contact page
 ******************************************************************************/

router.get('/dashboardcontact', dashboardcontroller.restuarantcontact);


module.exports = router;