require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override')
const passport = require('passport')
const session = require('express-session');
const flash = require('express-flash')
const connectDB = require('./server/config/db')



const app = express();
const port = 5000 || process.env.PORT;

//DB connection
connectDB();

app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(methodOverride('_method'));

//Passport
const initializePassport = require('./passport-config')
initializePassport(
  passport
)

app.use(flash())

//Express session
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        name: 'userdata',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    }
}));


app.use(passport.initialize())
app.use(passport.session())

//Static files
app.use(express.static('public'));
//adding new static files: modified on 21 july 20203
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/images', express.static(__dirname + '/public/images'));
app.use('/files', express.static(__dirname + '/public/fonts'));

//Templating Engine
app.use(expressLayout);
app.set('layout','./layouts/main');
app.set('view engine', 'ejs');


//Routes
 app.use('/',require('./server/routes/home'))
 app.use('/',require('./server/routes/admin_menu'))
 app.use('/',require('./server/routes/authentication'))
 app.use('/',require('./server/routes/dashboard'))
 

// app.get('/', (req,res)=>{
//   res.render('landingPage',{ layout: false });
// })

//Handle 404
app.get('*', (req,res)=>{
    res.status(404).render('404',{ layout: false });

})


 app.listen(port, ()=>{
    console.log('DB connected and port is: '+port);
 })

