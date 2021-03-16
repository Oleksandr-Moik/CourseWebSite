const express = require('express');
const router = express.Router();

router.all('/*', function(req, res, next) {
    if(req.session.user && req.session.user.role){
        let role = req.session.user.role;
        if (role==='admin'){
            res.locals.title = 'Admin panel';
            next();
        }else{
            let err = new Error('You are not admin');
            err.code = 401;
            next(err);
        }
    }else{
        let err = new Error('Not found');
        err.code = 404;
        next(err);
    }
});
router.get('/', (req, res, next) => {
    res.render('admin')
})

// for each table route

module.exports = router;
