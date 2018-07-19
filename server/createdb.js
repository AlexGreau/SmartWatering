var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost/locale";

var eeee = {phone: "06123456789", programme: "13243545815751485743546576", localite: "06000", idArduino: "234567GJ"};

MongoClient.connect(url, function(error, db) {
    if (error) return funcCallback(error);
    console.log("Vous etes connecte a ls DB de SmartWatering!");

    db.collection("user").insert(eeee, null, function (error, results) {
        if (error) throw error;
        console.log("GOOOD");
    });
});
