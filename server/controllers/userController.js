const User = require('../models/User');
const passport = require('passport')
const bcrypt = require('bcrypt')

 /**
  * login
  */
exports.login = async (req,res) => {
    try{
        res.render('authentication/login');
    }catch(error){
        console.log(error);
    }
}

 /**
  * post login
  */
 exports.postlogin = async (req,res) => {
    try {
        passport.authenticate('local', {
            
            successRedirect: '/index',
            failureRedirect: '/login',
            failureFlash: true
        })
    } catch (error){
        console.log(error)
    }
} 

//code changed on 05-08-23

/*exports.postlogin = async (req, res) => {
    try {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                console.error(err);
                return res.redirect('/login');
            }
            
            if (!user) {
                // Authentication failed
                return res.redirect('/login');
            }

            // Assuming usertype is stored in req.user.usertype after successful authentication
            const userType = req.user.usertype || 2; // Default to 2 if usertype is not available or undefined

            // Based on the userType, redirect to different pages
            switch (userType) {
                case 1: // Admin
                    return res.redirect('/admin');
                case 2: // Dashboard Home
                    return res.redirect('/dashboardhome');
                default:
                    return res.redirect('/dashboardhome'); // Default to dashboard home
            }
        })(req, res);
    } catch (error) {
        console.error(error);
        res.redirect('/login');
    }
}*/


 /**
  * register
  */
 exports.register = async (req,res) => {
    try{
        res.render('authentication/register');
    }catch(error){
        console.log(error);
    }
}

 /**
  * post register
  */

 exports.postregister = async (req,res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        User.create({
          email: req.body.email,
          password: hashedPassword
        })
        res.redirect('/login')
    } catch(error) {
        console.log(error)
        res.redirect('/register')
    }
 }

/**
 *logout
*/
exports.logout = async (req,res) => {
    try{
        res.render('authentication/logout');
    }catch(error){
        console.log(error);
    }
} 

/*exports.logout = async (req, res) => {
    try {
        // Assuming usertype is stored in req.user.usertype
        const userType = req.user.usertype || 2; // Default to 2 if usertype is not available or undefined

        // Based on the userType, redirect to different pages
        switch (userType) {
            case 1: // Admin
                return res.redirect('/admin/logout'); // Redirect to the admin logout page
            case 2: // Dashboard Home
                return res.redirect('/dashboardhome/logout'); // Redirect to the dashboard home logout page
            default:
                return res.redirect('/dashboardhome/logout'); // Default to dashboard home logout page
        }
    } catch (error) {
        console.error(error);
        res.redirect('/login'); // Handle error by redirecting to login page
    }
}*/


/**
 * post logout
*/
exports.postlogout = async (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/login');
      });
}