const express = require('express');
const router = express.Router();
const Message = require('../model/message')
const Status = require('../model/status')

router.get('/', (req, res, next) => {
  res.locals.title = 'Home page';
  res.locals.active_tab = 'home';
  res.render('index');
});

router.get('/about', (req, res) => {
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
  let status = await Status.findOne({statusName:'notReaded'})
  let message = await new Message({title, name, phone, description, status}).save()
  res.render('contactForm', {showForm: false, message})
})

router.all('/profile', (req, res, next) => {
  if(res.locals.auth){
    res.locals.title = 'User profile';
    next();
  }else{
    let error = new Error('You must sign in');
    error.code = 401;
    next(error);
  }
});
router.get('/profile', (req, res,next) => {
    res.render('profile', {user: req.session.user});
})
router.post('/profile', (req, res, next) =>{
  // todo post profile - save settings
  let body = req.body;
  // check user password
  next();
});

module.exports = router;
