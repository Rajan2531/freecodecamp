const express=require("express");
const app=express();
const path=require('path');
const userRouter=require('./routers/userRouter.js');
const error=require("./utils/errorHandler.js")
const courseRouter=require('./routers/courseRouter.js');
const viewsRouter=require('./routers/viewRouter.js');
const viewsController=require('./controllers/viewsController.js');
const cookieParser=require("cookie-parser"); 
const session=require('express-session');
const passport=require('passport');
const Course = require("./models/courseModel.js");
require('./utils/passport-setup.js')
app.use(session({
    resave:false,
    saveUninitialized:true,
    secret:'SECRET'
}))
app.use(passport.authenticate('session'));


app.use(passport.initialize());
app.use(passport.session());





app.use(cookieParser());
app.use(express.json());



app.set('view engine', 'pug')
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')))
// mounting routers
app.use('/',viewsRouter);

//google auth
app.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
app.get('/auth/google/callback',passport.authenticate('google',{failureRedirect: '/login'}),async function(req,res){
    console.log(req.user)
    res.locals.user=req.user;
    const courses=await Course.find();
    res.render('dashboard',{courses
    })
})


///
app.get('/signin',viewsController.getSignInPage)
app.use('/api/v1/users',userRouter);
app.use('/api/v1/courses',courseRouter);


app.use(error.errorHandle)
module.exports=app;