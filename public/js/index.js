import {login} from './login.js'
import {signup} from './signup.js'

const loginForm=document.querySelector(".form--login");
console.log(loginForm);
const signupForm=document.querySelector(".form--signup");
const signUpButton=document.querySelector('.signup_button')
if(loginForm)
{
    loginForm.addEventListener('submit',e=>{
        e.preventDefault();
        const email=document.getElementById('email').value;
        const password=document.getElementById('password').value;
        console.log(email)
        login(email,password);
    })
}

if(signupForm)
{
    signupForm.addEventListener('submit',e=>{
        e.preventDefault();
        const name=document.getElementById('name').value;
        const email=document.getElementById('email').value;
        const password=document.getElementById('password').value;
        const passwordConfirm=document.getElementById('passwordConfirm').value;
        signup(name,email,password,passwordConfirm);
    })
}

if(signUpButton)
{
    signUpButton.addEventListener('click',e=>{
        location.assign('/signup');
    })
}