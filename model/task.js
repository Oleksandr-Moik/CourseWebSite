const {Schema, model} = require('mongoose');
const statusSchema = require('./status').schema;

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
