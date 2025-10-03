import { useState } from "react"
import axios from "axios"
import { LOGIN_API, SIGNUP_API } from "../api"


function SignUp() {

    const [SignUp,setSignUp]= useState({'username':'','email':'','password':''})

    const signUpFunction = async(e) =>{
        e.preventDefault(); 
        try{
            const signup_response = await axios.post(SIGNUP_API,SignUp);
            if (signup_response.status === 201) {
                const login_payload={
                    'username': SignUp.username,
                    'password': SignUp.password
                }
                const login_response = await axios.post(LOGIN_API,login_payload);
                const accessToken = login_response.data.access_token;
                const refreshToken = login_response.data.refresh_token;
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                window.location.href = '/chat';
            }
        }
        catch(error){
            console.error('Error during sign up:', error);
        }

    }


    return(
        <form onSubmit={signUpFunction} className=''>
            <div className=''>
                <textarea placeholder='username' value={SignUp.username}
                    onChange={e => setSignUp({...SignUp,username:e.target.value})}></textarea>
                <textarea placeholder='email' value={SignUp.email}
                    onChange={e => setSignUp({...SignUp,email:e.target.value})}></textarea>
                <textarea placeholder='password' value={SignUp.password}
                    onChange={e => setSignUp({...SignUp,password:e.target.value})}></textarea>
            </div>
            <div>
                <button type='submit'>save</button>
            </div>
        </form>
    )
};

export default SignUp;