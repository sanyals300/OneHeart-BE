const mongoose = require('mongoose');
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLength: 30,
    },
    lastName: {
        type: String,
        trim: true
    },
    emailId:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address " + value);
            }
        } 
    },
    password: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password is weak, please use alpha-numeric with special character combinations");
            }
        }
    },
    age: {
        type: Number,
        required: Number,
        min: 18,
        max: 124,
    },
    gender: {
        type: String,
        required: String,
        enum: {
      values: ['male', 'female', 'intersex', 'others'],
      message: 'Gender must be either male, female, intersex, or others'
    },
    lowercase: true,
    },
    photoUrl:{
        type: String,
    },
    about:{
        type: String,
        default: "Mere maalik ne abhi tak kuch likha nahi hain",
        minLength: 10,
        maxLength: 75,
    },
    speciality:{
        type:[String],
        validate(value){
            if(value.length >5){
                throw new Error("You can only have 5 specialities");
            }
        }
    },
});

userSchema.methods.getJWT = async function () {
    const user = this;
   const token = await jwt.sign({_id: user._id},"OneHeart@832303");
   return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser){
    const user = this;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, this.password);
    return isPasswordValid;
}

const User = mongoose.model("User",userSchema);

module.exports = User;
