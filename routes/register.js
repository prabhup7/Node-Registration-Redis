
//CMPE 280 Assignment 5 - RedisCache And Registration Page Integration
//Xiaoli Jinag 009390901

var express = require('express');
var router = express.Router();

//Connetct to redis
var client = require("redis").createClient(9115, "slimehead.redistogo.com");
client.auth("b2820faa66924a20a78adb6943439633");

client.on("error", function (err) {
    console.log("Error " + err);
});


/* GET registration page. */
router.get('/', function(req, res, next) {
    res.render('registration');
});


/* POST create a new user */
router.post('/', function (req, res) {
    console.log("processing");

    var user = req.body;

    //use user email as hash key for store in redis, value is the user object
    client.hmset(req.body.email, req.body);

    //get the user object from redis, and responset it as json to http request
    client.hgetall(req.body.email, function(err, object) {
        console.log(object);
        res.send(object);//return json response of result object
    });

});

module.exports = router;
