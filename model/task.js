const {Schema, model} = require('mongoose');

const schema = Schema({
    title:{
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    }
});

module.exports = model('task', schema);
