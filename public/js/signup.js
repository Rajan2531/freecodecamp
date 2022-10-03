import axios from 'axios'

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
        setTimeout(()=>{
            location.assign('/dashboard');
        },1000)
    }
}
catch(err)
{
    console.log(err);
}
}