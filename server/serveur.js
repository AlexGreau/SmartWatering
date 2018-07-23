var http        = require('http');
var url         = require('url');
var express     = require('express');
var mongoClient = require('mongodb').MongoClient;
var mongoose    = require('mongoose');
var bodyParser = require('body-parser');
var urlbd      = "mongodb://localhost/smartwatering";



var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
// set the view engine to ejs
app.set('view engine', 'ejs');

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
                console.log('Insert failed', err);
            } else {
                console.log('Insert successful', result);
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

app.post('/adduser', signup);

app.post('/login', signin);

var connectDB = function (error, db) {
    if (error) {
        return console.error('Connction DB failed', error);;
    }
    console.log("Connection DB successful", urlbd);

    db.db('smartwatering').collection('user').find().toArray(function (err, result) {
        if (err) {
            console.log('Find failed', err);
        } else {
            console.log('Find OK', result);
        }
    });

    db.close();
}






mongoClient.connect(urlbd, connectDB);







// Gestion des erreurs 404
app.use(function (req, res, next) {
    res.setHeader('Content-Type', 'text/html');
    res.status(404).render('pages/404');
});
app.listen(8080, function () {
    console.log("Connected at port 8080");
});
