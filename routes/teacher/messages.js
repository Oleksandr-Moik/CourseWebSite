const express = require('express');
const router = express.Router();
const MessageModel = require('../../model/message')
const UserModel = require('../../model/user');
const StatusModel = require('../../model/status');

router.get('/', async (req, res, next) => {
    try{
        let messages = await MessageModel.find({});
        // let messages = await MessageModel.find({targetUser:['teacher', res.locals.user._id]});
        let users = await UserModel.find({});

        res.render('teacher', {model:'message', data: {users, messages}, action:'list'})
    }catch (e){
        next(e)
    }
});

router.get('/create', async (req,res,next)=>{
    try{
        let users = await UserModel.find({});
        let statuses = await StatusModel.find({for:'message'});

        res.render('teacher',{model:'message', data:{statuses, users, message:{}}, action:'create'})
    }catch (e){
        next(e)
    }
});
router.post('/create', async (req, res, next)=>{
    try{
        let {name, phone, description, title, statusName, targetUser} = req.body
        let status = await StatusModel.findOne({statusName});
        let document = await new MessageModel({name, phone, description, title, status, targetUser}).save();
        res.redirect('edit/'+document._id);
    }catch (e){
        next(e);
    }
})

router.get('/edit/:id', async (req, res, next) => {
    try{
        let users = await UserModel.find({});
        let statuses = await StatusModel.find({for:'message'});
        let message = await MessageModel.find({_id:req.params.id})
        // res.locals.asdfsadfgsd = message
        // console.log('message',message)
        res.render('teacher', {model:'message', data:{users, statuses, msg: {...message}}, action: "edit"})
    }catch (e){
        next(e)
    }
});
router.post(['/edit','/edit/:id'], async (req, res, next) => {
    try{
        let {name, phone, description, title, statusName, targetUser,_id} = req.body
        let status = await StatusModel.findOne({statusName});
        await MessageModel.findOneAndUpdate ({_id},{name, phone, description, title, status, targetUser})
        res.redirect('./edit/'+_id)
    }catch (e){
        next(e);
    }
})


router.get('/delete/:id', async (req, res, next) => {
    try{
        let data = await MessageModel.findOne({_id:req.params.id});
        res.render('teacher', {model:'message', data, action: "delete"})
    }catch (e){
        next(e)
    }
})
router.post('/delete/:id', async (req, res, next) => {
    try{
        let {_id} = req.body;
        await MessageModel.deleteOne({_id})
        res.redirect('../../messages/');
    }catch (e){
        next(e);
    }
})

module.exports = router;
