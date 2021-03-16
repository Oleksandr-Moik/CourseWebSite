const express = require('express');
const router = express.Router();
const LessonModel = require('../../model/lesson');

router.get('/', function(req, res, next) {
    res.json({})
});

module.exports = router;
