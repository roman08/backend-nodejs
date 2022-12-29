const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            
        });

        console.log('db online');
    } catch (error) {
        console.log(error);
        throw new Error('error a la de conectar a la BD');
        
    }
}


module.exports = {
    dbConnection
}