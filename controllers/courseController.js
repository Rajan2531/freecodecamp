const Course=require('./../models/courseModel.js');
const catchAsync=require('./../utils/catchAsync.js');
exports.getAllcourses=catchAsync.catch(async (req,res,next)=>{
    const allCourses=await Course.find();
    res.status(200).json({
        status:"success",
        data:allCourses
    })
})

exports.createCourses=catchAsync.catch(async(req,res,next)=>{
    const recievedCourseData={
        title:req.body.title,
        duration:req.body.duration
    }

    const course=await Course.create(recievedCourseData);
    res.status(201).json({
        status:"success",
        data:course
    })
})