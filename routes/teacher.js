const express = require('express');
const router = express.Router();
// cheking current messages
router.all('/*', async (req, res, next) => {
    if(res.locals.auth &&
        req.session.user &&
        req.session.user.role &&
        (req.session.user.role==='teacher' || req.session.user.role==='admin'))
    {
        res.locals.pageTitle = 'Teacher space';
        res.locals.active_tab = 'teacher';
        next();
    }else{
        let err = new Error('Not found');
        err.code = 404;
        next(err);
    }
});
router.all('/', (req, res, next) => {
    res.render('teacher', {model: 'index_'})
})

router.use(['/tasks','/task'],  require('./teacher/tasks'));
router.use(['/lessons','/lesson'],  require('./teacher/lessons'));
router.use(['/messages','/message'],  require('./teacher/messages'));
router.use(['/themes','/theme'],  require('./teacher/themes'));

router.use((err, req, res, next) => {
    console.log('teacher error');
    next(err)
})
module.exports = router;
