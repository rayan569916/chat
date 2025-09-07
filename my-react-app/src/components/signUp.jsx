import axios from "axios";
import { useState } from "react";
import { SIGNUP_API } from "../api";

function SignnUp (){
    const [signUp,setSignUp]= useState({'username':'','email':'','password':''})
    const newPassword='';

    const signUpRequest = async (e) => {
        const signUpRequest = await axios.post(SIGNUP_API,signUp);

    }
    return (
        <form onSubmit={signUpRequest}>
            <textarea placeholder="username" onChange={e => setSignUp({...signUp,username:e.target.value})} value={signUp.username}/>
            <textarea placeholder="email" onChange={e => setSignUp({...signUp,email:e.target.value})} value={signUp.email}/>
            <textarea placeholder="new password" onChange={e => newPassword=e.target.value} value={newPassword}/>
            <textarea placeholder="confirm password" onChange={e => setSignUp({...signUp,password:e.target.value})} value={signUp.password}/>
            <button type="submit"><span>➤</span></button>
        </form>
    );
}