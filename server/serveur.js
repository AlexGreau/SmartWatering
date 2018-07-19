var http = require('http');
var url = require('url');
var mongoClient = require('mongodb');

var nouveauVisiteur = function (req, res) {
    var page = url.parse(req.url).pathname;
    console.log(page);
    res.writeHead(200, {"Content-Type": "text/html"}); // Code reponse 200 signifie "OK" pas d'erreur
    if (page == '/') {
        res.write('<strong>Salut tout le monde !</strong>');
    } else if (page == '/test') {
        res.write('None');
    }
    res.end();
}

var serverClose = function () {
    console.log('Bye bye !');
}

var server = http.createServer(nouveauVisiteur);

server.on('close', serverClose);    // On ecoute l'evenement close
server.listen(8080);    // On Demarre le serveur
server.close(); // Arrete le serveur. Declenche l'evenement close
