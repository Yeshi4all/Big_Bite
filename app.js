require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override')

const session = require('express-session');

const connectDB = require('./server/config/db')

const app = express();
const port = 5000 || process.env.PORT;

//DB connection
connectDB();

app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(methodOverride('_method'));

//Static files
app.use(express.static('public'));

//Express session
app.use(
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      }
    })
  );


//Templating Engine
app.use(expressLayout);
app.set('layout','./layouts/main');
app.set('view engine', 'ejs');


//Routes
 app.use('/',require('./server/routes/admin_menu'))

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
