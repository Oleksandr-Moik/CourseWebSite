const express = require('express');
const router = express.Router();
const StatusModel = require('../../model/status');

router.get(
    '/',
    async (req, res, next) => {
        // todo: check on filter query params
        let {query} = req;
        let filter = {}
        if ('for' in query)filter.for = query.for

        let statuses = await StatusModel.find(filter);
        res.json(statuses);
    }
);

router.get(
    '/:id',
    async (req, res, next) => {
        try{
            let {id} = req.params;
            let lesson = await StatusModel.findOne({_id:id})
            res.json(lesson)
        }catch (err){
            next(err)
        }
    }
);

// update
router.patch(
    '/:id',
    async (req, res, next) => {
        try{
            let {body} = req;
            let {id} = req.params
            let {n}= await StatusModel.updateOne({_id:id},{...body},{})
            if(n!==0){
                let result = await StatusModel.findOne({_id:id})
                res.json(result)
            }else{
                res.sendStatus(404)
            }

        }catch (e){
            next(e)
        }
    }
);

router.post(
    '/',
    async (req, res, next) => {
        try{
            let {body} = req;
            // await body.map(status=>{
            //     new StatusModel({...status}).save()
            // })
            // res.redirect('/api/statuses')
            let status = await new StatusModel({...body}).save()
            res.json(status)
        }catch (e){
            next(e)
        }
    }
);

router.delete(
    '/:id',
    async (req, res, next) => {
        try{
            let status = await StatusModel.findOneAndDelete({_id:req.params.id});
            if(status) {
                res.json(status)
            }
            else{
                res.sendStatus(404)
            }
        }catch (e){
            next(e)
        }
    }
);

module.exports = router;
