const catchAsync=require('./../utils/catchAsync.js');
const Course=require('./../models/courseModel.js')
exports.getHomePage=(req,res)=>{
    res.render('homePage.pug');
}

exports.getSignInPage=(req,res)=>{
    res.render('signinPage.pug')
}

exports.getLoginPage=(req,res)=>{
    res.render('login.pug');
}

exports.getDashboard=catchAsync.catch(async(req,res)=>{
    const courses=await Course.find();
    

    res.render('dashboard',{
        courses:courses
    })
})

exports.getSignUpPage=(req,res)=>{
    res.render('signup')
}