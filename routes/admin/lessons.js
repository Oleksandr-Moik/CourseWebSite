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

module.exports = router;
