const express = require('express');
const router = express.Router();

const indexRoute = require('./routes/index');
const authRoute = require('./routes/auth');
const adminRoute = require('./routes/admin');
// const apiRoute = require('./routes/apis');

const checkSignIn = (req, res, next) => {
    res.locals.auth = 'user' in req.session;
    if (req.session.user){
        res.locals.userName = req.session.user.name;
    }
    next();
}
router.use(checkSignIn);
router.use('/', indexRoute);
router.use('/auth', authRoute);
router.use('/adminka', adminRoute); // auth
// router.use('/api', apiRoute); // access with token

module.exports = router;
