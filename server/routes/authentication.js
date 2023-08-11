const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/userController');

/**
 * Login
 */
router.get('/login', userController.login);

/**
 * Register
 */
router.get('/register', userController.register);

/**
 * Logout
 */
router.get('/logout', userController.logout);

/**
 * Post login
 */
// Assuming you have the required dependencies and configurations set up properly.

// Middleware to check authentication status and set menu variables
function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.isAuthenticated = true;
        res.locals.usertype = req.user.usertype; // Set the usertype from the authenticated user
    } else {
        res.locals.isAuthenticated = false;
        res.locals.usertype = 2; // Assuming default usertype is 2 for non-authenticated users
    }
    next();
}

// Apply the middleware to all routes
router.use(checkAuthentication);

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.log(err);
            return res.redirect('/login');
        }

        if (!user) {
            // If authentication failed, redirect to '/login'
            return res.redirect('/login');
        }

        // Authentication successful, store user information in the session
        req.login(user, (err) => {
            if (err) {
                console.log(err);
                return next(err);
            }

            // Redirect based on the usertype
            if (user.usertype === 1) {
                // If usertype is 1, redirect to '/index'
                return res.redirect('/index');
            } else {
                // Otherwise, redirect to '/dashboardhome'
                return res.redirect('/dashboardhome');
            }
        });
    })(req, res, next);
});

/**
 * Render the menu based on the 'isAuthenticated' and 'usertype' variables
 */
router.get('/', (req, res) => {
    if (res.locals.isAuthenticated) {
        // Render the menu based on the 'usertype' for authenticated users
        if (res.locals.usertype === 1) {
            // Render the menu for users with usertype 1
            res.render('index', { isAuthenticated: true });
        } else {
            // Render the menu for users with usertype other than 1
            res.render('dashboardhome', { isAuthenticated: true });
        }
    } else {
        // Render the menu for non-authenticated users
        res.render('login', { isAuthenticated: false });
    }
});

/**
 * Post register
 */
router.post('/register', userController.postregister);

/**
 * Post logout
 */
router.post('/logout', userController.postlogout);

module.exports = router;
