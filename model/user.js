const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');
const statusSchema = require('./status').schema;

const schema = Schema({
    firstName: {type: String},
    name:  {type: String, default: '{Change name}'},
    surname: {type: String},
    phone:  {
        type: String,
        // validate: {
        //     validator: function(v) {
        //         return /^(\+(380)|380)\s[1-9]{2}\s\d{3}([\-\s]\d{2}){2}$/.test(v);
        //     },
        //     message: props => `${props.value} is not a valid phone number!`
        // },
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    role:{
        type: String,
        default: 'student',
        enum: ['student','teacher','admin']
    },
    status:{
        type: statusSchema
    }
});

schema.pre(
    'save',
    async function (next) {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    }
);

schema.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);

    return compare;
}

module.exports = model('user', schema);
