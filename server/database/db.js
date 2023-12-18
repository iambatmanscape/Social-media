const mongoose = require('mongoose');
require('dotenv').config();
const connection = async (uri) => {
    try {
        await mongoose.connect(uri)
        console.log('Connection secured')
    } catch (e) {

        console.error(e);
    }
}

module.exports.connection = connection;