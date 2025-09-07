import {useEffect, useState} from 'react';
import axios from "axios";
import { LOGIN_API } from '../api';

function Login (){
    const [login,setLogin]= useState({'username':'','password':''})
    // useEffect(()=>{

    // })

    const loginFunction = async (e) =>{
        e.preventDefault();
        try{
            const response=await axios.post(LOGIN_API,login);
            console.log(response.data);
        }
        catch(error){
            console.error('Error during login:', error);
        } 
    }

    return (
        <form onSubmit={loginFunction} className=''>
            <div className=''>

                <textarea placeholder='username'
                value={login.username}
                onChange={e => setLogin({...login,username:e.target.value})}
                />
                <textarea placeholder='password'
                value={login.password}
                onChange={e => setLogin({...login,password:e.target.value})}/>
            </div>
            <div>
                <button type='submit'>save</button>
            </div>
        </form>
    )
}

export default Login;