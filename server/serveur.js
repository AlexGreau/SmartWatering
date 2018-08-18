// Stage SmartWatering serveur node JS

var http        = require('http');
var url         = require('url');
var fs          = require('fs');
var express     = require('express');

//var SHA256	= require('crypto-js/sha256');

var mongo       = require('mongodb');
var mongoClient = require('mongodb').MongoClient;
var mongoose    = require('mongoose');
var bodyParser  = require('body-parser');
var urlbd       = "mongodb://localhost/smartwatering";

// module d'envoi de MAIL
var nodemailer = require('nodemailer');

var app = express();
var router = express.Router();
var path = __dirname + '/views/'


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


function send(dd) {
    getMail(dd);
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

var pageHome = function (req, res) {
    res.send("Welcome to my Smart Watering (°_°)");
}


router.use(function (req, res, next) {
    console.log("/" + req.method);
    next();
});

router.get("/", pageHome);


// http://localhost:8080/api/alert?id=5b6c14c2145430027a6de35d&state=ON
app.get('/api/alert', function (req, res) {
    var matricule = req.param('id');
    var state = req.param('state');

    // Je recupere l'adresse mail
    var query = { _id: new mongo.ObjectId(matricule) };
    //TODO : Change state in db
    mongoClient.connect(urlbd, { useNewUrlParser: true }, function (error, db) {
        db.db('smartwatering').collection('user').find(query, {_id: 0, "email": 1}).toArray(function (err, res2) {
            if (err) throw err;
            reponse = res2[0].email;
            console.log(reponse);
            // Je cree le transporter de mails
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'smartwatering123@gmail.com',
                    pass: 'Smartwatering123!'
                }
            });
            // Je cree l'Options mail
            var mailOptions = {
                // to 'iris.b1991@gmail.com'
                from: 'smartwatering123@gmail.com',
                to: reponse,
                subject: 'ALERT',
                text: 'ALERT ALERT the Reservoir Level is LOW very LOW. So add water. THANKS }<)))°>'
            };
            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        })
    });

    //send(matricule);

    res.send('Maticule = ' + matricule + '\nState = ' + state);
});

//http://localhost:8080/api/program?id=5b6c14c2145430027a6de35d
app.get('/api/program', function (req, res) {
    var matricule = req.param('id');

    var query = { wateringId: matricule, currentState: "ON" };
    mongoClient.connect(urlbd, { useNewUrlParser: true }, function (error, db) {
        db.db('smartwatering').collection('program').find(query, {_id: 0, "programm": 1}).toArray(function (err, res2) {
            if (err) throw err;
            reponse = res2[0].programm;
            console.log(reponse);
            res.send(reponse);
        });
    });
    //res.send('GOOD (°_°)' + matricule);
});

//http://localhost:8080/api/setprog?id=5b718dd6b9c02f0d61626ef9&p=<xml>...</xml>
app.post('/api/setprog', function (req, res) {
    var matricule = req.param('id');
    var prog = req.param('p');

    var query = { wateringId: matricule, currentState: "ON", title: "current", programm: prog };
    var query1 = { wateringId: matricule, currentState: "ON"};
    var newValue = { $set: { currentState: "OFF" } };
    mongoClient.connect(urlbd, { useNewUrlParser: true }, function (error, db) {
        // TODO : Update programm before saving
        db.db('smartwatering').collection('program').updateOne(query1, newValue, function (err, res2) {
            if (err) throw err;
            reponse = "Progamme Mise a jour";
            console.log(reponse);
        });

        db.db('smartwatering').collection('program').insertOne(query, function (err, res2) {
            if (err) throw err;
            reponse = "Progamme Enregistre";
            console.log(reponse);
            res.send(reponse);
        });
    });
    //res.send('GOOD (°_°)' + matricule);
});

//http://localhost:8080/api/saveprog?id=5b718dd6b9c02f0d61626ef9&t=leTitreduProgramme&p=<xml>...</xml>
app.post('/api/saveprog', function (req, res) {
    var matricule = req.param('id');
    var titre = req.param('t');
    var prog = req.param('p');

    var query = { wateringId: matricule, currentState: "OFF", title: titre, programm: prog };
    mongoClient.connect(urlbd, { useNewUrlParser: true }, function (error, db) {
        db.db('smartwatering').collection('program').insertOne(query, function (err, res2) {
            if (err) throw err;
            reponse = "Progamme Enregistre";
            console.log(reponse);
            res.send(reponse);
        });
    });
    //res.send('GOOD (°_°)' + matricule);
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
    mongoClient.connect(urlbd, { useNewUrlParser: true }, function (error, db) {
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

		    /// Je cree en meme temps la table Program
		    db.db('smartwatering').collection('program').insertOne({wateringId: res2[0]._id.toString(), currentState : "ON", programm : "ToDo : Default watering"});


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
    mongoClient.connect(urlbd, { useNewUrlParser: true }, function (error, db) {
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
    res.send("Error 404 page not found ;-(");
});

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Accept, If-None-Match, X-If-None-Match, x-requested-with, Content-Type, Accept-Encoding, Accept-Language, Cookie, Referer');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.listen(8080, function () {
    console.log("\tWelcome to SmartWatering\nConnected at http://localhost:8080");
});
