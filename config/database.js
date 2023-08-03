const mongoose = require("mongoose");
const Url = 'mongodb://localhost/chat_Application'

exports.connect = () => {
    mongoose.connect(Url)
        .then(() => {
            console.log("sucessfully connected to database");
        })
        .catch((error) => {
            console.log("database connection failed. existing now...");
            console.error(error);

        });
};
