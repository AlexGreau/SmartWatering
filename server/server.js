var http        = require('http');
var url         = require('url');
var fs          = require('fs');
var express     = require('express');

var mongoClient = require('mongodb').MongoClient;
var mongoose    = require('mongoose');
var bodyParser  = require('body-parser');
var urlbd       = "mongodb://localhost/smartwatering";

var app = express();
var router = express.Router();
var path = __dirname + '/views/'


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


var pageHome = function (req, res) {
    res.sendFile(path + "index.html");
}

var register = function (req, res) {
    console.log(req.body.email+" "+req.query);
    res.sendFile(path + "register.html");
}

var login = function (req, res) {
    res.sendFile(path + "index.html");
}





router.use(function (req, res, next) {
    console.log("/" + req.method);
    next();
});

router.get("/", pageHome);
router.get("/register", register);
router.get("/login", login);


// http://localhost:8080/api/alert?id=jhgfz31uy176ty56&state=ON
app.get('/api/alert', function (req, res) {
    var matricule = req.param('id');
    var state = req.param('state');

    res.send('Maticule = ' + matricule + '\nState = ' + state);
});


// http://localhost:8080/api/signup?m=grace@smartwatering.com&p=I27G2Gyvougè&c=Nice,Fr
app.get('/api/signup', function (req, res) {
    var addr_mail = req.param('m');
    var password = req.param('p');
    var city = req.param('c');

    var reponse;

    var data = {
        "email": addr_mail,
        "password": password,
        "localite": city
    }
    // res.send('Email = ' + addr_mail + '\nPassword = ' + password + '\nCity = ' + city);
    mongoClient.connect(urlbd, function (error, db) {
        db.db('smartwatering').collection('user').insertOne(data, function (err, result) {
            if (err) {
                //console.log('Insert failed', err);
                if (err.code === 11000) {
                    reponse = 'Erreur valeur unique';
                    console.log(reponse);
                    res.send(reponse);
                }
            } else {
                //console.log('Insert successful', result);
                var query = { email: addr_mail };
                console.log('----->', db.db('smartwatering').collection('user').find(query).toArray(function (err, res2) {
                    if (err) throw err;
                    reponse = res2[0]._id;
                    console.log(reponse);
                    res.send(reponse);
                }));
            }
        });
    });
});


// http://localhost:8080/api/signin?m=grace@smartwatering.com&p=I27G2Gyvougè
app.get('/api/signin', function (req, res) {
    var addr_mail = req.param('m');
    var pass = req.param('p');

    var data = {
        "email": addr_mail,
        "password": pass
    }

    var reponse;
    // res.send('Email = ' + addr_mail + '\nPassword = ' + pass);
    mongoClient.connect(urlbd, function (error, db) {
        db.db('smartwatering').collection('user').find({email: addr_mail, password: pass}).toArray(function (err, result) {
            if (err) {
                reponse = 'Find failed';
                console.log(reponse, err);
                res.send(reponse);
            } else if (result.length > 0) {
                // Element trouve
                reponse = 'Find OK';
                console.log(reponse, result);
                //res.render('pages/mypage');
                //res.send('Maticule = ' + matricule + '\nState = ' + state);
                res.send("FIND_" + reponse);
            } else {
                // Element trouve mais le mot de passe n'est pas correct
                reponse = 'Find OK2';
                res.send(reponse);
                console.log(reponse, result);
                // TODO pas Enregistré ou mot de passe oublié
            }
        });
    });
});


app.use("/", router);

app.use("*", function (req, res) {
    res.sendFile(path + "404.html");
});

app.listen(8080, function () {
    console.log("\tWelcome to SmartWatering\nConnected at http://localhost:8080");
});
