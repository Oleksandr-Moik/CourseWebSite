const express = require('express');
const router = express.Router();
const LessonModel = require('../../model/lesson');
const ThemeModel = require('../../model/theme');
const UserModel = require('../../model/user');
const StatusModel = require('../../model/status');

router.get('/', async (req, res, next) => {
    try{
        let {theme, user, statusName} = req.body
        let lessons = await LessonModel.find({});
        let themes = await ThemeModel.find({});
        let users = await UserModel.find({})
        res.render('teacher', {model:'lesson', data:{users, themes, lessons}, action:'list'})
    }catch (e){
        next(e)
    }
});

router.get('/create', async (req,res,next)=>{
    try{
        let themes = await ThemeModel.find({});
        let users = await UserModel.find({role:'student'})
        let statuses = await StatusModel.find({for:'lesson'});
        res.render('teacher',{model:'lesson', data:{statuses, themes, users}, action:'create'})
    }catch (e){
        next(e)
    }
});
router.post('/create', async (req, res, next)=>{
    try{
        let {theme, user, statusName} = req.body
        let status = await StatusModel.findOne({statusName});
        let document = await new LessonModel({theme, user, status}).save();
        res.redirect('edit/'+document._id);
    }catch (e){
        next(e);
    }
})


router.get('/edit/:id', async (req, res, next) => {
    try{
        let lesson = await LessonModel.findOne({_id:req.params.id});
        let users = await UserModel.find();
        let themes = await ThemeModel.find();
        let statuses = await StatusModel.find({for:'lesson'});
        res.render('teacher', {model:'lesson', data:{users, themes, statuses, lesson}, action: "edit"})
    }catch (e){
        next(e)
    }
});
router.post(['/edit','/edit/:id'], async (req, res, next) => {
    try{
        let {theme, user, statusName, _id} = req.body
        let status = await StatusModel.findOne({statusName});
        await LessonModel.findOneAndUpdate ({_id},{theme, user, status})
        res.redirect('edit/'+_id)
    }catch (e){
        next(e);
    }
})


router.get('/delete/:id', async (req, res, next) => {
    try{
        let data = await LessonModel.findOne({_id:req.params.id});
        res.render('teacher', {model:'lesson', data, action: "delete"})
    }catch (e){
        next(e)
    }
})
router.post('/delete/:id', async (req, res, next) => {
    try{
        let {_id} = req.body;
        await LessonModel.deleteOne({_id})
        res.redirect('lessons/');
    }catch (e){
        next(e);
    }
})

module.exports = router;
