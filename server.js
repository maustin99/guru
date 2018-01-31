const
  express = require('express')
  app = express(),
  ejsLayouts = require('express-ejs-layouts'),
  mongoose = require('mongoose'),
  flash = require('connect-flash'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  session = require('express-session'),
  MongoDBStore = require('connect-mongodb-session')(session),
  passport = require('passport'),
  passportConfig = require('./config/passport.js'),
  userRoutes = require('./routes/users.js'),
  guruRoutes = require('./routes/gurus.js')
  //userRouter = new express.Router(),

  Guru = require('./models/Guru.js'),
  Activity = require('./models/Activity.js')
<<<<<<< HEAD
  indexRoutes = require('./routes/users.js')
=======
  

>>>>>>> 20ea8ab3e02b0fa04206c96b4dc21a5a228d57b7

// environment port
const
  port = process.env.PORT || 3000,
  mongoConnectionString = process.env.MONGODB_URL || 'mongodb://localhost/guru'

// mongoose connection:
mongoose.connect(mongoConnectionString, (err) => {
  console.log(err || "Connected to MongoDB (guru)")
})

// store session info in sessions collection in Mongo:
const store = new MongoDBStore({
  uri: mongoConnectionString,
  collection: 'sessions'
})

// middleware
app.use(logger('dev'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(flash())

// ejs configuration
app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(session({
  secret: "i am your guru",
  cookie: {maxAge: 8000000},
  resave: true,
  saveUninitialized: false,
  store: store
}))

app.use(passport.initialize())
app.use(passport.session())



/// USER AUTHORIZATION =====================
//is User logged in?
function isLoggedIn( req, res, next){
  if(req.isAuthenticated()) return next()
  res.redirect('/login')
}

// root route
app.get('/', (req, res) => {
  res.render('splash')
})

/////USERS ROUTES ------
app.use('/', userRoutes)

// Guru Routes:
app.use('/', guruRoutes)


app.listen(port, (err) => {
  console.log(err || "Running on port: " + port)
})


