const {Schema, model} = require('mongoose');

const schema = Schema({
    title:{
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    },
    tasks:{
        type: [String],
        default: []
    }
});

module.exports = model('theme', schema);
