const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('./server/models/User')

function initialize(passport) {
  const authenticateUser = async (email, password, done) => {
    
    try {
      User.findOne({ email: email}).then(async (user) =>{
        if (user == null) {
          return done(null, false, { message: 'No user with that email' })
        }
        
        if (await bcrypt.compare(password, user.password)) {
          return done(null, user)
        } else {
          return done(null, false, { message: 'Password incorrect' })
        }
      })
    } catch (e) {
      return done(e)
    }
  }

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user))
  passport.deserializeUser((user, done) => {
    return done(null, user)
  })
}

module.exports = initialize