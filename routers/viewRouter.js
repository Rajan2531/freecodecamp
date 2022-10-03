const express=require('express');
const app = require('../app.js');
const router=express.Router();
const authController=require('./../controllers/authController.js');
const viewsController=require('./../controllers/viewsController.js');




router.use(authController.isLoggedIn)
router.get('/',viewsController.getHomePage);
router.get('/login',viewsController.getLoginPage)
router.get('/dashboard',authController.protect,viewsController.getDashboard);
router.get('/signup',viewsController.getSignUpPage)


module.exports=router;