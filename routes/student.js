const express = require('express');
const router = express.Router();
const UserModel = require('../model/user')
const MessageModel = require('../model/message')
const StatusModel = require('../model/status')
const ThemeModel = require('../model/theme')
const TaskModel = require('../model/task')
const LessonsModel = require('../model/lesson')

// cheking current messages
router.use(async (req, res, next)=>{
    res.locals.pageTitle = 'Student space';
    res.locals.active_tab = 'student';

    try{
        // res.locals.messages = await MessageModel.find({targetUser:res.locals.user._id});
    }catch (e){

    }
    next()
})

router.get('/', async (req, res, next) => {
    try{
        let lessons = await LessonsModel.find({user:req.session.user._id})
        let themes = await ThemeModel.find({})
        let tasks = await TaskModel.find({})
        let messages = await MessageModel.find({targetUser:res.locals.user._id});
        res.render('student', {data: {lessons,themes, messages, tasks}});
    }catch (e){
        next(e)
    }
});

router.post('/', async (req, res, next) => {
    try{
        let {type} = req.body
        let {_id, statusName}= req.body;
        let status = await StatusModel.findOne({statusName, for:[type,'all']});
        if(type==='message'){
            await MessageModel.findOneAndUpdate({_id}, {status});
        }else if(type==='lesson'){
            await LessonsModel.findOneAndUpdate({_id}, {status});
        }
        res.redirect('/student');
        // res.render('student', {data: {lessons,themes, messages, tasks}});
    }catch (e){
        next(e)
    }
});




module.exports = router;
