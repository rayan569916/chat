import {useEffect, useState} from 'react';
import axios from "axios";

function Login (){
    const [login,setLogin]= useState({'username':'','password':''})
    // useEffect(()=>{

    // })

    const loginFunction = (e) =>{
        console.log(login)
    }

    return (
        <form onSubmit={loginFunction} className=''>
            <div className=''>

                <textarea placeholder='username'
                value={login.username}
                onChange={e => setLogin({...Login,username:e.target.value})}
                />
                <textarea placeholder='password'
                value={login.password}
                onChange={e => setLogin({...Login,password:e.target.value})}/>
            </div>
            <div>
                <button type='submit'>save</button>
            </div>
        </form>
    )
}