const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');
const statusSchema = require('./status').schema;
const schema = Schema({
    firstName: {type: String},
    name:  {type: String, default: '{Change name}'},
    surname: {type: String},
    phone:  {type: String,},
    email:{type: String, required: true, unique: true},
    password:{type: String, required: true,},
    createdAt:{type: Date, default: Date.now},
    role:{type: String, default: 'student',
        enum: ['student','teacher','admin']},
    status:{type: statusSchema}
});

schema.pre('save', async function (next) {this.password = await bcrypt.hash(this.password, 10);next();});
schema.methods.isValidPassword = async function(password) {const user = this;const compare = await bcrypt.compare(password, user.password);return compare;}

module.exports = model('user', schema);
