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
// Assuming you have the required dependencies and configurations set up properly.

// Middleware to check authentication status and set menu variable
function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.isAuthenticated = true;
    } else {
        res.locals.isAuthenticated = false;
    }
    next();
}

// Apply the middleware to all routes
router.use(checkAuthentication);

// Login route with manual authentication handling
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

            // Extract the domain from the email address
            const email = user.email; // Assuming email is a property on the user object
            const domain = email.substring(email.lastIndexOf('@') + 1);

            // Check the domain and redirect accordingly
            if (domain === 'bigbite.com') {
                // If the domain is 'bigbite.com', redirect to '/'
                return res.redirect('/index');
            } else {
                // Otherwise, redirect to '/dashboardhome'
                return res.redirect('/dashboardhome');
            }
        });
    })(req, res, next);
});

// Now, all routes below this point will have access to the 'isAuthenticated' variable
// You can use this variable to render the menu conditionally based on the authentication status.

router.get('/', (req, res) => {
    // Render the menu based on the isAuthenticated variable
    if (res.locals.isAuthenticated) {
        // Render the menu for authenticated users
        res.render('/index');
    } else {
        // Render the menu for non-authenticated users
        res.render('/login');
    }
});



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