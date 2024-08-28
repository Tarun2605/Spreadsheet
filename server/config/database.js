require('dotenv').config();
const mongoose = require('mongoose');

const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL)
        .then(() => (
            console.log('Successfully connected to the database')
        ))
        .catch((error) => {
            console.log('Failed to connect to the database');
            console.log(error.message);
            process.exit(1);
        });
};

module.exports = dbConnect;