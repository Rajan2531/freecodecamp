
import axios from 'axios'

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
        setTimeout(()=>{
                location.assign('/dashboard')
                
        },1000)
        
    }
}
catch(err)
{
  console.log(err);
}
}