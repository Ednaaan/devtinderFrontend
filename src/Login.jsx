import React, { useState } from 'react';
import axios from "axios";
import { addUser } from './utils/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from './utils/constant';




const Login = () => {

  const[emailId, setEmailId] = useState("");
  const[password, setPassword] = useState("");
  const[firstName, setFirstName] = useState("");
  const[lastName, setLastName] = useState("");
  const[isLoginForm, setLoginForm] = useState(true);
  const[error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async()=> {
    try {
      const res = await axios.post(
        BASE_URL+"/login",
        {
        emailId,
        password
      },
    {
      withCredentials:true
    }
    );
    // console.log(res.data);  
    dispatch(addUser(res.data.data));
    return navigate("/");
      
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
      // console.log(err)
      
    }
  };

  const handleSignUp = async()=> {
    try {
      const res = await axios.post(BASE_URL + "/signup" , {firstName, lastName,emailId,password}, {
        withCredentials:true,
      });
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (error) {
      setError(err?.response?.data || "Something went wrong");
    }
  }




  return (
    <div className='flex justify-center my-10'>
      <div className="card bg-base-300 w-96 shadow-xl">
  <div className="card-body">
    <h2 className="card-title justify-center">{isLoginForm ? "LogIn" : "SignUp"}</h2>
    {!isLoginForm && ( 
      <>
    <label className="input input-bordered flex items-center gap-2 my-5">
    
    <input type="text" className="grow" placeholder="First Name"
    
    value={firstName}
    onChange={(e)=>{
      setFirstName(e.target.value)

    }}
    />
  </label>
  <label className="input input-bordered flex items-center gap-2 my-5">
    
    <input type="text" className="grow" placeholder="Last Name"
    
    value={lastName}
    onChange={(e)=>{
      setLastName(e.target.value)

    }}
    />
  </label>
  </>
  )}
  
    
<label className="input input-bordered flex items-center gap-2 my-5">
  
  <input type="text" className="grow" placeholder="Email"
  
  value={emailId}
  onChange={(e)=>{
    setEmailId(e.target.value)

  }}
  />
</label>
<label className="input input-bordered flex items-center gap-2 my-5">
  
  <input type="text" className="label" placeholder="Password"
  
  value={password}
  onChange={(e)=>{
    setPassword(e.target.value)

  }}
  
  />
  </label>
    <p className='text-red-600'>{error}</p>
    <div className="card-actions justify-center my-5">
      <button className="btn btn-primary" onClick={isLoginForm? handleLogin: handleSignUp}>
        {isLoginForm ? "Login": "Sign Up"}</button>
    </div>
    <p className='text-white text-center cursor-pointer'
    onClick={() => setLoginForm((value) => !value)}>
      {isLoginForm? "New User? signUp" : "Already have an account? Login"}</p>
  </div>
</div>
    </div>
  )
}

export default Login
