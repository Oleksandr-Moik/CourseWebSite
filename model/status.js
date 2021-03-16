const {Schema, model} = require('mongoose');

// status
const schema = Schema({
    statusName: {
        type: String,
        required: true,
        alias: 'name'
    },
    for:{
        type:[String],
        default: [],
        enum: ['message','user','lesson']
    }
});

module.exports = model('status', schema);
