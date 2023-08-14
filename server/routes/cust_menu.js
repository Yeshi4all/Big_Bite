const express = require('express');
const router = express.Router();
const cust_menuController = require('../controllers/cust_menuController');

/****************************************************************
 * Get 
 * **************************************************************
 * Customer menu Page
 ****************************************************************/
router.get('/bigbitemenu', checkAuthenticated, cust_menuController.cust_menupage);

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
    }
module.exports = router;