
import axios from 'axios'
import { showAlert } from './alert';
export const login=async(email,password)=>{
    try{
        console.log(email,password);
    const res=await axios({
        method:"post",
        url:"/api/v1/users/login",
        data:{
            email:email,
            password:password
        }

    })

    if(res)
    {
        showAlert("success","Logged in successfully");
        setTimeout(()=>{
                location.assign('/dashboard')
                
        },1000)
        
    }
}
catch(err)
{
    showAlert("error",err.response.data.message);
  console.log(err);
}
}