// Run in terminal: 
//    mongod                ->  to start MongoDB and listen for connections
//    mongo < database.js   ->  to create the database
//    mongo                 ->  to open mongo and manipulate the database

//use smartWatering
//db.dropDatabase()

use smartwatering

db.createCollection("user")             // id, email, password
db.createCollection("program")
db.createCollection("wateringCan")

db.user.createIndex({email: 1}, {unique: true})
db.wateringCan.createIndex({userId: 1}, {unique: true})
