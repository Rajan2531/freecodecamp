const passport=require('passport');
const User = require('../models/userModel.js');
const GoogleStrategy=require('passport-google-oauth20').Strategy;



passport.use(new GoogleStrategy({
    clientID: "205571255181-5ov7unf92jg13pqeoj745m3kq1aopbra.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: 'http://localhost:3000/auth/google/callback'},async (accessToken, refreshToken, profile, cb)=>{
        const user=await User.find({email:profile._json.email});
        return cb(null,user);
        
         
    }))

passport.serializeUser((user,cb)=>{
    cb(null,user);
});
passport.deserializeUser((obj,cb)=>{
    cb(null,obj);
})