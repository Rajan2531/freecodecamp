const app=require("./app.js");
const mongoose=require("mongoose");
const dotenv=require("dotenv");

dotenv.config({path: "./config.env"});
const dbUrl=process.env.DATABASE_URL.replace("<PASSWORD>",process.env.DATABASE_PASSWORD);
mongoose.connect(dbUrl,{useNewUrlParser:true}).then(()=>{
    console.log("database connected successfully")
}).catch(err=>{
    console.log(err);
})

app.listen(process.env.PORT||3000,()=>{
    console.log("server is running");
})