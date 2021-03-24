const express = require('express');
const router = express.Router();
const ThemeModel = require('../../model/theme');
const TaskModel = require('../../model/task');

router.get('/', async (req, res, next) => {
    try{
        let data = await ThemeModel.find({});
        res.render('teacher', {model:'theme', data, action:'list'})
    }catch (e){
        next(e)
    }
});

router.get('/create', async (req,res,next)=>{
    try{
        let Tasks = await TaskModel.find({});
        res.render('teacher',{model:'theme', data:{Tasks}, action:'create'})
    }catch (e){
        next(e)
    }
});
router.post('/create', async (req, res, next)=>{
    try{
        let {title, description, tasksIds} = req.body
        let document = await new ThemeModel({title, description, tasks:tasksIds}).save();
        res.redirect('edit/'+document._id);
    }catch (e){
        next(e);
    }
})


router.get('/edit/:id', async (req, res, next) => {
    try{
        let document = await ThemeModel.findOne({_id:req.params.id});
        let Tasks = await TaskModel.find({});
        let data = {...document._doc, Tasks}
        res.render('teacher', {model:'theme', data, action: "edit"})
    }catch (e){
        next(e)
    }
});
router.post(['/edit','/edit/:id'], async (req, res, next) => {
    try{
        let {title, description, tasksIds, _id} = req.body
        await ThemeModel.findOneAndUpdate ({_id},{title, description, tasks:tasksIds})
        res.redirect('edit/'+_id)
    }catch (e){
        next(e);
    }
})


router.get('/delete/:id', async (req, res, next) => {
    try{
        let data = await ThemeModel.findOne({_id:req.params.id});
        res.render('teacher', {model:'theme', data, action: "delete"})
    }catch (e){
        next(e)
    }
})
router.post('/delete/:id', async (req, res, next) => {
    try{
        let {_id} = req.body;
        await ThemeModel.deleteOne({_id})
        res.redirect('themes/');
    }catch (e){
        next(e);
    }
})

module.exports = router;
