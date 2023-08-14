const express = require('express');
const router = express.Router();
const dashboardcontroller = require('../controllers/dashboardcontroller');

/**
 * Routes for about
 */

router.get('/dashboard', dashboardcontroller.restuarantabout);

/**
 * Routes for home
 */

router.get('/dashboardhome', dashboardcontroller.restuaranthome);

/**
 * Routes for contact
 */

router.get('/dashboardcontact', dashboardcontroller.restuarantcontact);


module.exports = router;