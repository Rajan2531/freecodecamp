const express=require("express");
const router=express.Router();
const authController=require('./../controllers/authController.js');
const courseController=require("./../controllers/courseController.js");
router.route('/').get(authController.protect,courseController.getAllcourses).post(authController.protect,courseController.createCourses);

module.exports=router;