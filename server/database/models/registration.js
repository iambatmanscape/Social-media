const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RegistrationSchema = new Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        unique: true
    }
})

const newUser = mongoose.model("User", RegistrationSchema);

module.exports = newUser;