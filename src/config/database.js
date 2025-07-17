const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://sanyals300:4mSQfKHAQOMYz25g@oneheart.kpat11d.mongodb.net/OneHeartDB");
};

module.exports = connectDB;









