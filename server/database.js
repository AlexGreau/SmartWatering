/* Run in terminal: 
    mongod                ->  to start MongoDB and listen for connections
    mongo < database.js   ->  to create the database
    mongo                 ->  to open mongo and manipulate the database
*/
use smartWatering
db.dropDatabase()

use smartWatering

db.createCollection("user")             // id, email, password
db.createCollection("programArduino")
db.createCollection("programBlockly")

db.user.createIndex({email: 1}, {unique: true})
db.programArduino.createIndex({userId: 1}, {unique: true})
db.programBlockly.createIndex({title: 1}, {unique: true})
