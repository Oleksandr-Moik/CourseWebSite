const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ThemeModel = require('../../model/theme');
const TaskModel = require('../../model/task');

router.get('/', async (req, res, next) => {
    try{
        let data = await ThemeModel.find({});
        res.render('admin', {model:'theme', data, action:'list'})
    }catch (e){
        next(e)
    }
});

router.get('/create', async (req,res,next)=>{
    try{
        let tasks = await TaskModel.find({});
        res.render('admin',{model:'theme', data:{}, action:'create', tasks})
    }catch (e){
        next(e)
    }
});
router.post('/create', async (req, res, next)=>{
    try{
        let {title, description, tasks} = req.body
        // tasks=[];
        let document = await new ThemeModel({title, description, tasks}).save();
        res.redirect('edit/'+document._id);
    }catch (e){
        next(e);
    }
})


router.get('/edit/:id', async (req, res, next) => {
    try{
        let data = await ThemeModel.findOne({_id:req.params.id});
        let tasks = await TaskModel.find({});
        res.render('admin', {model:'theme', data, action: "edit",tasks})
    }catch (e){
        next(e)
    }
});
router.post('/edit', async (req, res, next) => {
    try{
        let {title, description, tasks, _id} = req.body
        await ThemeModel.findOneAndUpdate ({_id},{title, description, tasks})
        res.redirect('edit/'+_id)
    }catch (e){
        next(e);
    }
})


router.get('/delete/:id', async (req, res, next) => {
    try{
        let data = await ThemeModel.findOne({_id:req.params.id});
        res.render('admin', {model:'theme', data, action: "delete"})
    }catch (e){
        next(e)
    }
})
router.post('/delete/:id', async (req, res, next) => {
    try{
        let {_id} = req.body;
        await ThemeModel.deleteOne({_id})
        res.redirect('..');
    }catch (e){
        next(e);
    }
})

module.exports = router;
