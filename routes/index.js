const express = require('express');
const router = express.Router();
const MessageModel = require('../model/message')
const StatusModel = require('../model/status')
const ThemeModel = require('../model/theme')
const LessonsModel = require('../model/lesson')

router.get('/', async (req, res, next) => {
  res.locals.pageTitle = 'Home page';
  res.locals.active_tab = 'home';
  try{
    if(res.locals.auth){
      let lessons = await LessonsModel.find({user:req.session.user._id})
      let themes = await ThemeModel.find({})
      res.render('index',{lessons, themes});
    }else{
      res.render('index');
    }
  }catch (e){
    next(e)
  }
});

router.get('/about', (req, res) => {
  res.locals.pageTitle = 'About';
  res.locals.active_tab = 'about';
  res.render('pages/about');
});

router.all('/contacts', (req, res, next) => {
  res.locals.pageTitle = 'Contact';
  res.locals.active_tab = 'contacts';
  next()
})
router.get('/contacts', (req, res) => {
  res.render('pages/contacts', {showForm: true});
});
router.post('/contacts', async (req, res) => {
  let {title, name, phone, description} = req.body;
  let status = await StatusModel.findOne({statusName:'notReaded'})
  let errors = {}
  try{
    if (name.length<4){
      errors.name = {value:name, length: name.length}
    }
    if(phone.length<=15 || phone.length>=10){
      errors.phone = {value: phone, length: phone.length}
    }
    if (errors.errors){
      throw new Error()
    }
    let message = await new MessageModel({title, name, phone, description, status}).save()
    res.render('pages/contacts', {showForm: false, message})
  }catch (e){
    res.render('pages/contacts', {showForm: true, message:req.body, errors: {...e.errors, ...errors}})
  }
})

router.all('/profile', (req, res, next) => {
  if(res.locals.auth){
    res.locals.pageTitle = 'User profile';
    next();
  }else{
    let error = new Error('You must sign in');
    error.code = 401;
    next(error);
  }
});
router.get('/profile', (req, res,next) => {
    res.render('pages/profile', {user: req.session.user});
})
router.post('/profile', (req, res, next) =>{
  // todo post profile - save settings
  let body = req.body;
  // check user password
  next();
});

module.exports = router;
