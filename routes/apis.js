const express = require('express');
const router = express.Router();

// router.all('/lessons', require('./api/lessons'));
// router.all('/messages', require('./api/messages'));
router.all('/statuses', require('./api/statuses'));
// router.all('/tasks', require('./api/tasks'));
// router.all('/themes', require('./api/themes'));
// router.all('/users', require('./api/users'));

module.exports = router;
