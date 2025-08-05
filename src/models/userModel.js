import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required : [true, "Please provide a username"],
        unique: true,  
    },
    email:{
        type: String,
        required: [true, "Please provide an Email"],
        unique: true,
    },
    password:{
        type: String,
        required: [true, "Please provide a password"],
    },
    isVerified:{
        type: Boolean,
        default: false,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
    // forgot token is to reset the password 
    // the token will be sent to the email
    // to resent password enter the verification token and then new password 
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,

    // verify token lets us verify the user email
    // token sent to the email id and then verified 
    verifyToken: String,
    verifyTokenExpiry: Date,
})

// handelling cases in Next js if already present dont make duplicate
// no need to handle in express.js
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;