var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { name: "Xiaoli", title: 'CMPE 280 - Assignment 5 - RedisCache And Registration Page Integration' });
});

module.exports = router;
