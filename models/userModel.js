const mongoose=require("mongoose");
const validator=require("validator")
const bcrypt=require('bcryptjs');
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'A name must be there for an user'],
    },
    email:{
        type:String,
        required:[true, 'An email must be there'],
        unique:true,
        validate:[validator.isEmail]
    },
    password:{
        type:String,
        required:[true,' A Password is must'],
        minlength:6
    },
    passwordConfirm:{
        type:String,
        required:[true, ' Please, confirm your password'],
        minlength:6,
        validator:{
            validate:function(inputPassword){
                return inputPassword===this.password;
            },
            message:"Password did not match"
        }
    }
})

// pre middleware to encrypt password
userSchema.pre('save',async function(next){
    if(!this.isModified('password'))
    {
        next();
    }
    this.password=await bcrypt.hash(this.password,12);
    this.passwordConfirm=undefined;
    next();
})

userSchema.methods.checkPassword=async function(saved_password,recievedPassword){
    return await bcrypt.compare(saved_password,recievedPassword);
}



const User=mongoose.model('User',userSchema);


module.exports=User;