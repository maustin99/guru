//user routes

const 
    express = require('express'),
    passport = require('passport'),
    userRouter = new express.Router(),

    User = require('../models/User.js')

function isLoggedIn( req, res, next){
    if(req.isAuthenticated()) return next()
    res.redirect('/login')
}

// LOGIN -------- 
userRouter.get('/login', (req, res) => {
    res.render('login')
})

userRouter.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login'
}) )

// SIGNUP ------- 
userRouter.get('/signup', (req, res) => {
    res.render('signup')
})

userRouter.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup'
}) )

// PROFILE ------- 
userRouter.get('/profile', isLoggedIn, (req, res) => {

    //^^^^^^^^^^^^^^ checks middleware for Logged-in, if True, continue to 'NEXT'
    res.render('profile', {user: req.user})
})

// PROFILE ------ EDIT --------- 
userRouter.get('/user/:id', isLoggedIn, (req, res) => {
    res.render('user/user_edit', {user: req.user})
}) // END PROFILE EDIT

// PROFILE ------ UPDATE --------- 
userRouter.get('/user/edit/:id', isLoggedIn, (req, res) => {

    User.findById(req.params.id, (err, myUser) =>{  
        if(err){
            res.json({message: "There was a problem"})
            console.log(err)
        }else{
            res.json(myUser)  
            console.log(myUser)
        }
      }) //end Album FindBy

    res.redirect('profile', {user: req.user})
}) // END PROFILE UPDATE


// LOGOUT ------- 
userRouter.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

module.exports = userRouter

