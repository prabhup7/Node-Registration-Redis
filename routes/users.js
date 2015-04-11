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

/* GET users key list. */
router.get('/', function(req, res, next) {

    //get all keys from redis and render in the user list page
    client.keys('*', function (err, keys) {
        if (err) return console.log(err);
        for(var i = 0, len = keys.length; i < len; i++) {
            console.log("keys: "+keys[i]);
        }
        res.render('users', { rows: keys});
    });
});

module.exports = router;
