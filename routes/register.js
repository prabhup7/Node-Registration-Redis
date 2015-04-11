
//CMPE 280 Assignment 5 - RedisCache And Registration Page Integration
//Xiaoli Jinag 009390901

var express = require('express');

var router = express.Router();

/* GET registration page. */
router.get('/', function(req, res, next) {
    res.render('registration');
});


/* POST create a new user */
router.post('/', function (req, res) {
    console.log("processing");
    console.log(req.body);


});

module.exports = router;
