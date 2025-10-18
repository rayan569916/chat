import axios from "axios";
import {USER_API} from '../api';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function UserList() {

    const [userData, setUserData] = useState([]);

    useEffect(()=>{
       userFunction() 
    },[])

    const navigate = useNavigate();

    const userFunction = async (e) =>{
        const accessToken=localStorage.getItem('accessToken')
        const response = await axios.get(USER_API,
            {headers: {Authorization:`Bearer ${accessToken}`}}
        );
        setUserData(response.data)
        console.log(userData)
    }
    const userChatFunction = async (ToUser) =>{
        try{
            localStorage.setItem('ToUser',ToUser)
            navigate('/chat');
        }
        catch (error){
            console.log(error)
        }

    }


    return(
        <div className="terminal">
            <ul>
                {userData.map((user, idx)=>(
                    <li className="terminal-input" onClick={() =>userChatFunction(user.username)} key={idx}>_&gt; {user.username}</li>
                ))}
            </ul>
        </div>
    )
}

export default UserList;