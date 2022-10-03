const appError = require('../utils/appError.js');
const User=require('./../models/userModel.js');
const catchAsync=require('./../utils/catchAsync.js');
const jwt=require('jsonwebtoken');
const util=require('util');
require('../utils/passport-setup.js');

// google auth








const createJwtToken= function(id)
{
    const token=  jwt.sign({id}, process.env.JWT_TOKEN_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
    return token;
}

exports.signup=catchAsync.catch(async (req,res,next)=>{
    const data={
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        passwordConfirm:req.body.passwordConfirm,
    }
    const user=await User.create(data);
    if(!user)
    {
        return next(new appError("could'nt create user",400));
    }
    console.log(user.id)
    const token=createJwtToken(user.id);
    res.cookie("jwt",token,{
        expires:new Date(Date.now()+10*1000*60)
    })
    res.status(200).json({
        status:"success",
        token:token,
        data:user
    })
})

exports.login=catchAsync.catch(async (req,res,next)=>{
    const email=req.body.email;
    const password=req.body.password;
    if(!email)
    {
        return next(new appError("Please enter correct email id",400));
    }
    if(!password)
    return next(new appError("Please, enter password"));
    const user=await User.findOne({email});
    if(!user||!(await user.checkPassword(password,user.password)))
    {
        return next(new appError("Please input correct credentials",400));
    }
    const token=createJwtToken(user.id);
    res.cookie("jwt",token,{
        expires:new Date(Date.now()+10*60*1000)
    })
    res.status(200).json({
        status:"success",
        token:token,
        user
    }) 
})

exports.protect=catchAsync.catch(async (req,res,next)=>{
     let recievedToken;
     console.log(req.cookies.jwt);
     
     if(req.headers.Authorization&&req.headers.Authorization.startsWith('Bearer'))
     {
        recievedToken=req.headers.Authorization.split(' ')[1];
     }
     else if(req.cookies.jwt)
      recievedToken=req.cookies.jwt;

    if(!recievedToken)
    {
        return next(new appError("You are not logged in. Please log in",400));
    }
    
     const tokenDecoded=await util.promisify(jwt.verify)(recievedToken,process.env.JWT_TOKEN_SECRET);
     console.log(tokenDecoded);
     const userWithInputEmail=await User.findById(tokenDecoded.id);
     if(!userWithInputEmail)
     {
        return next(new appError("User with this email id does not exists",400));
     }
     req.user=userWithInputEmail;
     res.locals.user=userWithInputEmail;
     next();
     
})

exports.isLoggedIn=async (req,res,next)=>{
    if(req.cookies.jwt)
    {
        try{
        const decoded=await util.promisify(jwt.verify)(req.cookies.jwt,process.env.JWT_SECRET);

        const freshuser=await User.findById({_id:decoded.id});
        //console.log(freshuser);
    // checking if user exists
        if(!(freshuser))
        {
            return next(new appError("User does not exists now",404));
        }
    // checking if password changed after login
    const passwordchangedOrNot=freshuser.checkIfPasswordModifiedAfterLogin(decoded.iat);
        if(passwordchangedOrNot)
        {
            return next(new appError("password changed after login, please login again",401))
        }
        res.locals.user=freshuser;
        return next();

    }
    catch(err){
        return next();
    }}
    next();
}
