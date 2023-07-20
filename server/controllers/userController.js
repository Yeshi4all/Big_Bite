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

/**
 * post logout
*/
exports.postlogout = async (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/login');
      });
}