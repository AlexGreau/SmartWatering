var mongoose    = require('mongoose');

var userSchema = new mongoose.Schema({
    local: {
        email: String,
        password: String,
        locality: String
    }
});

var user = mongoose.model('User', userSchema);
