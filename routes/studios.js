const
  express = require('express'),
  studiosRouter = new express.Router(),
  flash = require('connect-flash'),

  Activity = require('../models/Activity.js'),
  Guru = require('../models/Guru.js'),
  User = require('../models/User.js'),
  Studio = require('../models/Studio.js')

// Studios:
studiosRouter.get('/', (req, res) => {
  Studio.find({}, (err, allDemStudios) => {
    if(err) return console.log(err)
    res.render('studios-index', {studios: allDemStudios})
  })
})


// Show a specific Studio:
studiosRouter.get('/:id', (req, res) => {
  Studio.findById(req.params.id).populate('activities').populate('gurus').exec((err, thatStudio) => {
    if(err) return console.log(err)
    res.render('studio-show', {studio: thatStudio})
  })
})

// POST/SEARCH all Studios:
studiosRouter.get('/search/:term', (req, res) => {
  const regex2 = new RegExp(req.params.term,'i');
  console.log('Search Term (server side)  :' , req.params.term)
  Studio.find({$or: [{name: regex2}, {location:regex2}]}, (err, results) => {
    console.log('RESULTS   :', results  )
    
    res.json(results)
  })
})

// Create Studio:
studiosRouter.post('/', (req, res) => {
  Studio.create(req.body, (err, brandNewStudio) => {
    res.json({message: "Studio created", Studio: brandNewStudio})
  })
})

module.exports = studiosRouter
