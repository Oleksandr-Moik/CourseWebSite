const express = require('express');
const router = express.Router();

router.all('/*', (req, res, next) => {
    if(res.locals.auth &&
        req.session.user &&
        req.session.user.role &&
        req.session.user.role==='admin' )
    {
        res.locals.title = 'Admin panel';
        next();
    }else{
        let err = new Error('Not found');
        err.code = 404;
        next(err);
    }
});
router.all('/', (req, res, next) => {
    res.render('admin', {model: 'index_'})
})

router.use('/users',  require('./admin/users'));
router.use(['/tasks','/task'],  require('./admin/tasks'));
router.use('/lessons',  require('./admin/lessons'));
router.use('/messages',  require('./admin/messages'));
router.use('/themes',  require('./admin/themes'));
router.use('/statues',  require('./admin/statuses'));

module.exports = router;
