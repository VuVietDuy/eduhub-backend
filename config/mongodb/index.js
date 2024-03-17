const mongoose = require("mongoose");
require("dotenv").config();

function connect() {
  // Deploy
  // mongoose.connect('mongodb+srv://vuvietduy1010:V1ZcpuT82jiktGib@blog.pq3x3z6.mongodb.net/?retryWrites=true&w=majority&appName=blog')
  // .then(() => console.log('Connected!'));

  mongoose
    .connect(process.env.MONGODB_CONNECT_URI)
    .then(() => console.log("Connected!"))
    .catch((err) => console.log(err));
}

module.exports = {
  connect,
};
