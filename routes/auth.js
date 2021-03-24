const express = require('express');
const UserModel = require('../model/user');
const MessageModel = require('../model/message')
const router = express.Router();

router.all('/signup',(req, res, next) => {
    if(res.locals.auth){
        res.redirect('/profile')
    }else{
        res.locals.pageTitle = 'Register page';
        res.locals.formType = 'reg';
        next();
    }
})
router.get('/signup',(req, res) => {
    res.render('pages/auth')
})
router.post('/signup', async (req, res,next) => {
    if (!req.body.email || !req.body.password || !req.body.name){
        res.render('pages/auth', {body:req.body, error: {message:"Invalid data", type:'invalid'}})
    } else {
        let user = await UserModel.findOne({email: req.body.email});
        if(!user && user!==null){
            res.render('pages/auth',
                {body:req.body, error: {message: "User with this email are exist", key:'user exist'}})
        }else{
            try{
                let status = await req.db.collection('status').findOne({statusName:'active'});
                user = await new UserModel({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    status
                }).save()
                status = await req.db.collection('status').findOne({statusName:'notReaded'});
                await new MessageModel({
                    title:"New user are registered",
                    name: user.name,
                    description: "Check new user",
                    status
                }).save();
                req.session.user = user;
                res.locals.auth = true;

                res.redirect('/profile');
            }catch (e){
                next(e)
            }
        }
    }
})

router.all('/login', (req, res, next) => {
    if(res.locals.auth){
        res.redirect('/profile')
    }else {
        res.locals.pageTitle = 'Login page';
        res.locals.formType = 'login';
        next();
    }
})
router.get('/login', (req, res, next) => {
    res.render('pages/auth')
});
router.post('/login', async (req, res, next) => {
    if (!req.body.email || !req.body.password){
        res.render('pages/auth', {body:req.body, error: {message:"Invalid data", type:'invalid'}})
    } else {
        let {email, password} = req.body;
        let user = await UserModel.findOne({email});
        if(user){
            if(user.isValidPassword(password)){
                req.session.user = user;
                res.locals.auth = true;
                res.redirect('/profile');
            }else{
                res.render('pages/auth',
                    {body:req.body, error: {message: "Wrong password", key:'password'}})
            }
        }else{
            res.render('pages/auth',
                {body:req.body, error: {message: "User with this email not exist", key:'email'}})
        }
    }
})

router.get('/logout', (req, res, next) => {
    req.session.destroy();
    res.locals.auth = false;
    res.cookie('user','',{maxAge:0})
    res.redirect('/auth/login')
})

module.exports = router
