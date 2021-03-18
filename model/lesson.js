const {Schema, model} = require('mongoose');
const statusSchema = require('./status').schema;

const schema = Schema({
    theme:{
        type: String,
        require: true
    },
    user:{
        type:String,
        require: true,
    },
    status:{
        type: statusSchema,
    }
});

module.exports = model('lesson', schema);
