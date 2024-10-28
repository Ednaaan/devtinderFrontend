import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from './utils/constant'
import { addRequest, removeRequest } from './utils/RequestSlice'
import { useDispatch, useSelector } from 'react-redux'


const Request = () => {
    const requests = useSelector((store) => store.requests);
    const dispatch = useDispatch();

    

    const reviewRequest = async (status, _id) => {
      try {
        const res = axios.post(BASE_URL + "/request/review"+"/" +status+ "/" +_id,{},{
          withCredentials:true,
        });
        dispatch(removeRequest(_id));
      } catch (error) {
        
      }
    }



    const fetchRequest = async() => {
        try {
            const res = await axios.get(BASE_URL + "/user/request/received", {
                withCredentials: true,
            });

            console.log(res.data.data);
            dispatch(addRequest(res.data.data));
        } catch (error) {

            
        }
    };

    useEffect(() =>{
        fetchRequest();
    },[]);


    if(!requests) return;
    if(requests.length === 0) return <h1 className='flex justify-center'>No Connections Request found</h1>
    
    
      return (
        <div className='text-center my-10'>
            <h1 className='text-bold text-2xl'>CONNECTIONS REQUEST</h1>
            {requests.map((requests) =>{
              const{ _id,firstName, lastName, age, gender , photoUrl,about } = requests.fromUserId;
    
              return(
                <div key={_id} className=' flex items-center m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto'>
                  <div>
                    <img alt="photo"
                    className='w-20 h-20 rounded-full'
                    src={photoUrl}
                    />
                      
                    
                  </div>
                  <div className='text-left mx-4'>
                    <h2 className='font-bold text-2xl'>{firstName + " " + lastName}</h2>
                    <p>{age+" " + gender}</p>
                    <p>{about}</p>
               </div>
        <div className='flex space-x-4 mx-6'>
             <button className="btn  bg-slate-950"onClick={() => reviewRequest("accepted", requests._id)}>
                Accept
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="red">
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
             </button>
      </div>
     <div>
        <button className="btn bg-slate-950" onClick={() => reviewRequest("rejected", requests._id)}>
            Reject
            <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="red">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
    </div>

    
                </div>
              )
            })}
          
        </div>
      )
    }
    

export default Request;
