var http        = require('http');
var url         = require('url');
var fs          = require('fs');
var io          = require("socket.io");
var express     = require('express');
var mongoClient = require('mongodb').MongoClient;
var mongoose    = require('mongoose');
var bodyParser  = require('body-parser');
var querystring = require('querystring');
var urlbd       = "mongodb://localhost/smartwatering";


var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// set the view engine to html
app.set('view engine', 'html');

var isEmptyReservoir = function (req, res) {
    var queryEmptyReservoir = querystring.parse(url.parse(req.url).query);

    if ('who' in queryEmptyReservoir && 'empty' in queryEmptyReservoir) {
        if (queryEmptyReservoir['empty'] === 'true') {
            res.write('Attention votre reservoir est vide');
        }
    }
}

var pageHome = function (req, res) {
    res.render('pages/index');
}

var signup = function (req, res) {
    var mail = req.body.email;
    var pass = req.body.password;

    var data = {
        "email": mail,
        "password": pass,
        "localite": req.body.bp
    }

    mongoClient.connect(urlbd, function (error, db) {
        db.db('smartwatering').collection('user').insertOne(data, function (err, result) {
            if (err) {
                //console.log('Insert failed', err);
                if (err.code === 11000) {
                    console.log('Erreur valeur unique');
                }
            } else {
                //console.log('Insert successful', result);
                var query = { email: mail };
                console.log('----->', db.db('smartwatering').collection('user').find(query).toArray(function (err, res) {
                    if (err) throw err;
                    console.log(res[0]._id);
                }));
                res.render('pages/mypage');
            }
        });
    });
}

var signin = function (req, res) {
    var mail = req.body.email;
    var pass = req.body.password;

    var data = {
        "email": mail,
        "password": pass
    }

    mongoClient.connect(urlbd, function (error, db) {
        db.db('smartwatering').collection('user').find({email: mail, password: pass}).toArray(function (err, result) {
            if (err) {
                console.log('Find failed', err);
            } else if (result.length > 0) {
                console.log('Find OK', result);
                res.render('pages/mypage');
            } else {
                console.log('Find OK', result);
                // TODO pas Enregistré ou mot de passe oublié
            }
        });
    });
}

app.get('/', pageHome);

app.post('/register', signup);

app.post('/login', signin);

// Gestion des erreurs 404
app.use(function (req, res, next) {
    res.setHeader('Content-Type', 'text/html');
    res.status(404).render('pages/404');
});

app.listen(8080, function () {
    console.log("\tWelcome to SmartWatering\nConnected at http://localhost:8080");
});
