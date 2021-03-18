const express = require('express');
const router = express.Router();
const LessonModel = require('../../model/lesson');

router.get(
    '/',
    async (req, res, next) => {
        // check on filter query params
        let lessons = await LessonModel.find({});
        res.json(lessons);
    }
);

router.get(
    '/:id',
    async (req, res, next) => {
        try{
            let {id} = req.params;
            let lesson = await LessonModel.find({_id:id})
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

    }
);

router.post(
    '/',
    async (req, res, next) => {
        try{

        }catch (e){
            next(e)
        }
    }
);

router.delete(
    '/:id',
    async (req, res, next) => {

    }
);

module.exports = router;
