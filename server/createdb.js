var mongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost/smartwatering";

var eeee = {phone: "YTADYTADT", programme: "AHAHAHAHAHAHAH", localite: "06000", idArduino: "234567GJ"};


mongoClient.connect(url, function(error, db) {
    if (error) return funcCallback(error);
    console.log("Vous etes connecte a ls DB de local!");

    db.db('smartwatering').collection('user').find('YTADYTADT').toArray(function (err, result) {
        if (err) {
            console.log('Find failed', err);
        } else {
            console.log('Find OK', result);
        }
    });

    db.db('smartwatering').collection('user').insertOne(eeee, function (err, res) {
        if (err) throw err;
        console.log('1 document insere', err);
    });

/*    db.collection("user").insert(eeee, null, function (error, results) {
        if (error) throw error;
        console.log("GOOOD");
    });*/

    db.close();
});
