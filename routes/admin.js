const express = require('express');
const router = express.Router();

router.all('/*', (req, res, next) => {
    if(res.locals.auth &&
        req.session.user &&
        req.session.user.role &&
        req.session.user.role==='admin' )
    {
        res.locals.pageTitle = 'Admin panel';
        res.locals.active_tab = 'admin'
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

router.use(['/users','/user'],  require('./admin/users'));
router.use(['/tasks','/task'],  require('./admin/tasks'));
router.use(['/lessons','/lesson'],  require('./admin/lessons'));
router.use(['/messages','/message'],  require('./admin/messages'));
router.use(['/themes','/theme'],  require('./admin/themes'));
router.use(['/statuses','/status'],  require('./admin/statuses'));

router.use((err, req, res, next) => {
    console.log('admin error');
    next(err)
})
module.exports = router;
