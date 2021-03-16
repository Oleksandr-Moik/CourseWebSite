const {Schema, model} = require('mongoose');
const statusSchema = require('./status').schema;

const schema = Schema({
    name:{
        type: String
    },
    phone:{
        type: String,
        minLength: 10,
        maxLength: 15,
    },
    description:{
        type: String
    },
    title:{
        type: String,
        require: true,
        // enum: ['form', 'resetPassword']
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now
    },
    status:{
        type: statusSchema
    },
    targetUser:{
        type: String,
        default: 'teacher'
    }
});

schema.pre(
    ['update*','save'],
    function (next) {
        this.updatedAt = Date.now();
        next();
    }
)

module.exports = model('message', schema);
