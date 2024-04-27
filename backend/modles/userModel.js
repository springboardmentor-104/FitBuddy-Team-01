const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    is_verified:{
        type:Boolean,
        default:false
    },
    favoriteExercises: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exercise'
    }],
    phoneno: {
        type: String
    },
    dob: {
        type: Date
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other']
    },
    height: {
        type: Number
    },
    weight: {
        type: Number
    },
    country: {
        type: String
    },
    address: {
        type: String
    },
    occupation: {
        type: String
    },
    insta: {
        type: String
    },
    fb: {
        type: String
    },
    twitter: {
        type:String
    },
    photo:{
        type:String
    }
    
},{timestamps:true});

module.exports = mongoose.model('users',userSchema); 