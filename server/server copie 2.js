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


//app.use(bodyParser.json()); // for parsing application/json
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

var signup = function (req, res) {
    var mail = req.body.email;
    var pass = req.body.password;
    var bp   = req.body.city;

    var data = {
        "email": mail,
        "password": pass,
        "localite": bp
    }

    console.log(req.body.email+" "+req.query);

    res.send(mail + " " + pass + " " + bp);
    //res.sendFile(path + "register.html");
    /*mongoClient.connect(urlbd, function (error, db) {
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
    });*/
}

var signin = function (req, res) {
    var mail = req.body.email;
    var pass = req.body.password;

    var data = {
        "email": mail,
        "password": pass
    }

    res.send(mail + " " + pass);

    /*mongoClient.connect(urlbd, function (error, db) {
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
    });*/
}









router.use(function (req, res, next) {
    console.log("/" + req.method);
    next();
});

router.get("/", pageHome);
router.get("/register", register);
router.get("/login", login);

app.post('/register', signup);


// http://localhost:8080/api/alert?id=jhgfz31uy176ty56&state=ON
app.get('/api/alert', function (req, res) {
    var matricule = req.param('id');
    var state = req.param('state');

    res.send(matricule + ' ' + state);
});

app.use("/", router);

app.use("*", function (req, res) {
    res.sendFile(path + "404.html");
});

app.listen(8080, function () {
    console.log("\tWelcome to SmartWatering\nConnected at http://localhost:8080");
});
