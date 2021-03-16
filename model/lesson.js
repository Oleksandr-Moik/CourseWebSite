const {Schema, model} = require('mongoose');
const statusSchema = require('status').schema;

const schema = Schema({
    theme:{
        type: String,
        require: true
    },
    startedAt:{
        type: Date,
        default: Date.now
    },
    endedAt:{
        type: Date,
    },
    status:{
        type: statusSchema,
    }
});

module.exports = model('lesson', schema);
