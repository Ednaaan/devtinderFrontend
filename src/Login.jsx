import React, { useState } from 'react';
import axios from "axios";
import { addUser } from './utils/userSlice';
import { useDispatch } from 'react-redux';

const dispatch = useDispatch();


const Login = () => {

  const[emailId, setEmailId] = useState("");
  const[password, setPassword] = useState("");

  const handleLogin = async()=> {
    try {
      const res = await axios.post("http://localhost:2409/login",{
        emailId,
        password
      },
    {
      withCredentials:true
    }
    );
    dispatch(addUser(res.data));
      
    } catch (err) {
      console.log(err)
      
    }
  }




  return (
    <div className='flex justify-center my-10'>
      <div className="card bg-base-300 w-96 shadow-xl">
  <div className="card-body">
    <h2 className="card-title justify-center">Login</h2>
   
<label className="input input-bordered flex items-center gap-2 my-10">
  
  <input type="text" className="grow" placeholder="Email"
  
  value={emailId}
  onChange={(e)=>{
    setEmailId(e.target.value)

  }}
  />
</label>
<label className="input input-bordered flex items-center gap-2">
  
  <input type="text" className="label" placeholder="password"
  
  value={password}
  onChange={(e)=>{
    setPassword(e.target.value)

  }}
  
  />
</label>
    
    <div className="card-actions justify-center my-5">
      <button className="btn btn-primary" onClick={handleLogin}>Login</button>
    </div>
  </div>
</div>
    </div>
  )
}

export default Login
