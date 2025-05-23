const mongoose = require('mongoose');

async function connect(){

    try {
        await mongoose.connect('mongodb://localhost:27017/education_dev', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => console.log('Connected!'));
    } catch (error) {
        console.log('Connect failure!')
    }
}

module.exports = { connect };
