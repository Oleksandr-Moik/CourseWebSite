const express = require('express');
const router = express.Router();

const indexRoute = require('./routes/index');
const authRoute = require('./routes/auth');
const adminRoute = require('./routes/admin');

const checkSignIn = (req, res, next) => {
    // res.locals.auth = false;
    if('user' in req.cookies){
        req.session.user = JSON.parse(req.cookies.user);
        res.locals.auth=true;
    }

    if (req.session.user){
        if(req.session.user.status.statusName==='active'){
            res.locals.userName = req.session.user.name;
            res.locals.user = req.session.user;
            res.locals.auth = true;
            res.cookie('user',JSON.stringify(req.session.user), {maxAge: 1800000}) // 30 min
        }else{
            res.send('contact with teacher or admin for activate your account')
        }
    }
    else if (res.locals.user && res.locals.auth===true){
        req.session.user = res.locals.user;
        // res.locals.auth = true;
    }
    next();
}
router.use(checkSignIn);
router.use('/', indexRoute);
router.use('/auth', authRoute);
router.use('/adminka', adminRoute);

module.exports = router;
