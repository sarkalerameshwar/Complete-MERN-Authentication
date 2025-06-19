import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const userSchem = new Schema({
    name: String,
    email: String,
    password: String,
    otp:Number,
    
});

const User = mongoose.model('User', userSchem);

export default User;
