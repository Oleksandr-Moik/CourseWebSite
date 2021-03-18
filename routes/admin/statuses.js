const express = require('express');
const router = express.Router();
const StatusModel = require('../../model/status');

router.get('/', async (req, res, next) => {
    try{
        let data = await StatusModel.find({});
        res.render('admin', {model:'status', data, action:'list'})
    }catch (e){
        next(e)
    }
});

router.get('/create', async (req,res,next)=>{
    res.render('admin',{model:'status', data:{}, action:'create'})
});
router.post('/create', async (req, res, next)=>{
    try{
        let {statusName, target} = req.body
        let document = await new StatusModel({statusName, 'for':target}).save();
        res.redirect('edit/'+document._id);
    }catch (e){
        next(e);
    }
})


router.get('/edit/:id', async (req, res, next) => {
    try{
        let data = await StatusModel.findOne({_id:req.params.id});
        res.render('admin', {model:'status', data, action: "edit"})
    }catch (e){
        next(e)
    }
});
router.post('/edit', async (req, res, next) => {
    try{
        let {statusName, target, _id} = req.body
        await StatusModel.findOneAndUpdate ({_id},{statusName, for:target})
        res.redirect('edit/'+_id)
    }catch (e){
        next(e);
    }
})


router.get('/delete/:id', async (req, res, next) => {
    try{
        let data = await StatusModel.findOne({_id:req.params.id});
        res.render('admin', {model:'status', data, action: "delete"})
    }catch (e){
        next(e)
    }
})
router.post('/delete/:id', async (req, res, next) => {
    try{
        let {_id} = req.body;
        await StatusModel.deleteOne({_id})
        res.redirect('../');
    }catch (e){
        next(e);
    }
})

module.exports = router;
