const express = require('express');
const router = express.Router();
const moment = require('moment');
router.get('/', (req, res) => {
    res.render('index', { title: 'Lumen Visual' });
});
module.exports = router;
