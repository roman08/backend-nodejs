const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('db online');
    } catch (error) {
        console.log(error);
        throw new Error('error a la de conectar a la BD');
        
    }

    // const Cat = mongoose.model('Cat', { name: String });

    // const kitty = new Cat({ name: 'Zildjian' });
    // kitty.save().then(() => console.log('meow'));
}


module.exports = {
    dbConnection
}