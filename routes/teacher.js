const express = require('express');
const router = express.Router();
const UserModel = require('../model/user')
const MessageModel = require('../model/message')
const StatusModel = require('../model/status')
const ThemeModel = require('../model/theme')
const LessonModel = require('../model/lesson')

// cheking current messages
router.use(async (req, res, next)=>{
    res.locals.pageTitle = 'Teacher space';
    res.locals.active_tab = 'teacher';

    try{
        res.locals.messages = await MessageModel.find({targetUser:[res.locals.user._id, "teacher"]});
    }catch (e){

    }
    next()
})

router.get('/', async (req, res, next) => {
    try{
        let users = await UserModel.find({role:'student'})
        let themes = await ThemeModel.find({});

        // res.render('teacher',{users, themes});
        res.render('teacher',{model: 'index_', data:{users, themes}});
    }catch (e){
        next(e)
    }
});

router.post('/lesson', async (req, res, next) => {
    try{
        let {theme, user, statusName} = req.body
        let users = await UserModel.find({role:'student'})
        let themes = await ThemeModel.find({});
        let status = await StatusModel.findOne({statusName});
        let document = await new LessonModel({theme, user, status}).save();
        res.render('teacher',{users, themes, document});

        // res.redirect('edit/'+document._id);
    }catch (e){
        next(e);
    }
})


router.all('/', (req, res, next) => {
    res.render('teacher', {model: 'index_'})
})

router.use(['/tasks','/task'],  require('./teacher/tasks'));
router.use(['/lessons','/lesson'],  require('./teacher/lessons'));
router.use(['/messages','/message'],  require('./teacher/messages'));
router.use(['/themes','/theme'],  require('./teacher/themes'));

router.use((err, req, res, next) => {
    console.log('teacher error');
    next(err)
})
module.exports = router;
