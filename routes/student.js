const express = require('express');
const router = express.Router();
const UserModel = require('../model/user')
const MessageModel = require('../model/message')
const StatusModel = require('../model/status')
const ThemeModel = require('../model/theme')
const LessonsModel = require('../model/lesson')

// cheking current messages
router.use(async (req, res, next)=>{
    res.locals.pageTitle = 'Student space';
    res.locals.active_tab = 'student';

    try{
        res.locals.messages = await MessageModel.find({targetUser:res.locals.user._id});
    }catch (e){

    }
    next()
})

router.get('/', async (req, res, next) => {
    try{
        let lessons = await LessonsModel.find({user:req.session.user._id})
        res.render('student',{lessons});
    }catch (e){
        next(e)
    }
});

module.exports = router;
