const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// const {isEmail} = require('validator')
const validator = require('validator')

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please Enter Email'],
        unique: true,
        
    },
    password: {
        type: String,
        required: [true, 'Please Enter Password'],
        minlength: [6, 'Minimum password length should be at least 6 characters']
    }
});

UserSchema.statics.userSignup = async  function(email, password) {
    const check = await this.findOne({ email });
     if(!validator.isEmail(email))
        {
            throw Error("Not a valid Email")
        }
        if (password.length < 6) {
            throw new Error("Minimum password length should be at least 6 characters");
        }
    
    if (check) {
        throw new Error("This email is already in use");
    }
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    const user = await this.create({ email, password: hashPass });
    return user;
};

UserSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('Incorrect Password');
    }
    throw Error('Incorrect Email');
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
