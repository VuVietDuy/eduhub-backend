const mongoose = require('mongoose');

function connect() {
    mongoose.connect()
    .then(() => console.log('Connected!'));
}

module.exports = {
    connect
};