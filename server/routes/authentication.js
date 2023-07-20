const express = require('express');
const router = express.Router();
const passport = require('passport')
const userController = require('../controllers/userController');

/**
 * Login
 */

router.get('/login', userController.login);

/**
 * 
 * Register
 */

router.get('/register', userController.register);

/**
 * 
 * Logout
 */

router.get('/logout', userController.logout);

/**
 * 
 * post login
 */
router.post('/login', passport.authenticate('local', {
    successRedirect: '/index',
    failureRedirect: '/login',
    failureFlash: true
}));

/**
 * 
 * post register
 */

router.post('/register', userController.postregister);

/**
 * 
 * post logout
 */

router.post('/logout', userController.postlogout);


module.exports = router;