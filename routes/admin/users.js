const express = require('express');
const router = express.Router();
const UserModel = require('../../model/user');
const StatusModel = require('../../model/status')

router.get('/', async (req, res, next) => {
    try{
        let list = await UserModel.find({});
        res.render('admin', {model:'user', data:list, action:'list'})
    }catch (e){
        next(e)
    }
});
router.get('/view/:id', async (req, res, next) => {
    res.redirect('.././edit/'+req.params.id)
    // try{
    //     let user = await UserModel.findOne({_id:req.params.id});
    //     res.render('admin', {model:'user', data: user, action: "edit"})
    // }catch (e){
    //     next(e)
    // }
});

router.get('/create', async (req,res,next)=>{
    res.render('admin',{model:'user', data:{}, action:'create'})
});
router.post('/create', async (req, res, next)=>{
    try{
        let {firstName, name, surName, email, phone, password, role, statusName} = req.body
        let status = await StatusModel.findOne({statusName});
        let document = await new UserModel({firstName, name, surName, email, phone, password, role, status}).save();
        res.redirect('edit/'+document._id);
    }catch (e){
        next(e);
    }
})


router.get('/edit/:id', async (req, res, next) => {
    try{
        let document = await UserModel.findOne({_id:req.params.id});
        res.render('admin', {model:'user', data: document, action: "edit"})
    }catch (e){
        next(e)
    }
});
router.post('/edit/:id', async (req, res, next) => {
    try{
        let {firstName, name, surName, email, phone, password, role, statusName, _id} = req.body
        // if (id===_id)
        let status = await StatusModel.findOne({statusName});
        await UserModel.findOneAndUpdate ({_id},{firstName, name, surName, email, phone, password, role, status})
        // res.redirect('edit/'+_id)
        res.redirect('.././edit/'+_id)
    }catch (e){
        next(e);
    }
})


router.get('/delete/:id', async (req, res, next) => {
    try{
        let document = await UserModel.findOne({_id:req.params.id});
        res.render('admin', {model:'user', data:document, action: "delete"})
    }catch (e){
        next(e)
    }
})
router.post('/delete/:id', async (req, res, next) => {
    try{
        let {_id, permanent} = req.body;
        if(permanent==='on'){
            await UserModel.deleteOne({_id})
            res.redirect('users');
        }else{
            let status = await StatusModel.findOne({statusName:'deleted'});
            await UserModel.findOneAndUpdate({_id}, {status})
            res.redirect('users');
        }
        // res.json(user).send();
    }catch (e){
        next(e);
    }
})

module.exports = router;
