import axios from 'axios'
import { showAlert } from './alert'

export const signup=async(name,email,password,passwordConfirm)=>
{
    try{
    const res=await axios({
        method:'post',
        url:'api/v1/users/signup',
        data:{
            name:name,
            email:email,
            password:password,
            passwordConfirm:passwordConfirm
        }
    })
    if(res)
    {
        showAlert("success","User registered successfully")
        setTimeout(()=>{
            location.assign('/dashboard');
        },1000)
    }
}
catch(err)
{
    showAlert("error",err.response.data.message)
    console.log(err);
}
}