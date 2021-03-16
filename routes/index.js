const express = require('express');
const router = express.Router();
const MessageModel = require('../model/message')

router.all('/', (req, res, next) => {
  res.locals.title = 'Home page';
  res.locals.active_tab = 'home';
  res.render('index');
});

router.all('/about', (req, res) => {
  res.locals.title = 'About';
  res.locals.active_tab = 'about';
  res.render('about');
});

router.all('/contacts', (req, res, next) => {
  res.locals.title = 'Contact';
  res.locals.active_tab = 'contacts';
  next()
})
router.get('/contacts', (req, res) => {
  res.render('contactForm', {showForm: true});
});
router.post('/contacts', async (req, res) => {
  let {title, name, phone, description} = req.body;
  let status = await req.db.collection('status').findOne({statusName:'notReaded'})
  let message = await new MessageModel({title, name, phone, description, status}).save()

  res.render('contactForm', {showForm: false, message})
})

router.all('/profile', (req, res, next) => {
  res.locals.title = 'User profile';
  next();
});
router.get('/profile', (req, res,next) => {
  if(res.locals.auth){
    res.render('profile', {user: req.session.user});
  }else{
    let error = new Error('You must sign in');
    error.code = 401;
    next(error);
  }
})
router.post('/profile', (req, res) =>{
  // editing user data
});


module.exports = router;
