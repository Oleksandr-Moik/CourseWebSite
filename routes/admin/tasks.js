const express = require('express');
const router = express.Router();
const TaskModel = require('../../model/task');

router.get('/', async (req, res, next) => {
    try{
        let data = await TaskModel.find({});
        res.render('admin', {model:'task', data, action:'list'})
    }catch (e){
        next(e)
    }
});
router.get('/view/:id', async (req, res, next) => {
    res.redirect('.././edit/'+req.params.id)
});

router.get('/create', async (req,res,next)=>{
    res.render('admin',{model:'task', data:{}, action:'create'})
});
router.post('/create', async (req, res, next)=>{
    try{
        let {title, description} = req.body
        let document = await new TaskModel({title, description}).save();
        res.redirect('edit/'+document._id);
    }catch (e){
        next(e);
    }
})


router.get('/edit/:id', async (req, res, next) => {
    try{
        let data = await TaskModel.findOne({_id:req.params.id});
        res.render('admin', {model:'task', data, action: "edit"})
    }catch (e){
        next(e)
    }
});
router.post('/edit', async (req, res, next) => {
    try{
        let {title, description, _id} = req.body
        await TaskModel.findOneAndUpdate ({_id},{title, description})
        res.redirect('edit/'+_id)
    }catch (e){
        next(e);
    }
})


router.get('/delete/:id', async (req, res, next) => {
    try{
        let data = await TaskModel.findOne({_id:req.params.id});
        res.render('admin', {model:'task', data, action: "delete"})
    }catch (e){
        next(e)
    }
})
router.post('/delete/:id', async (req, res, next) => {
    try{
        let {_id} = req.body;
        await TaskModel.deleteOne({_id})
        res.redirect('tasks');
    }catch (e){
        next(e);
    }
})

module.exports = router;
