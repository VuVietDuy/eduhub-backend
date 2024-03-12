const mongoose = require('mongoose');

function connect() {
    mongoose.connect('mongodb+srv://vuvietduy1010:V1ZcpuT82jiktGib@blog.pq3x3z6.mongodb.net/?retryWrites=true&w=majority&appName=blog')
    .then(() => console.log('Connected!'));


    // mongoose.connect('mongodb+srv://vuvietduy1010:V1ZcpuT82jiktGib@blog.pq3x3z6.mongodb.net/?retryWrites=true&w=majority&appName=blog')
}

module.exports = {
    connect
};