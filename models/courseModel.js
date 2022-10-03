const mongoose= require('mongoose');

const courseSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,'A course title is must']
    },
    duration:{
        type:String,
        required:[true,'A course duration is must']
    }
})

const Course=mongoose.model('Course',courseSchema);

module.exports=Course;