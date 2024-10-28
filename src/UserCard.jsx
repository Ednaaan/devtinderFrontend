import axios from 'axios';
import React from 'react';
import { BASE_URL } from './utils/constant';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from './utils/feedSlice';

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  console.log("User object received in UserCard:", user);

  if (!user) {
    return <div className='flex justify-center text-bold'>No user data available</div>;
  }

  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;

  const handleSendRequest = async(status, userId) => {
    try {
      const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId, {} , {
        withCredentials: true,
      });
      dispatch(removeUserFromFeed(userId));

    } catch (error) {
      
    }
  }

  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure>
        <img src={user.photoUrl} alt="Picture" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + " " + gender}</p>}
        {about && <p>{about}</p>}
        
        <div className="card-actions justify-center my-4">
          <button className="btn btn-primary" onClick={() => handleSendRequest("ignore", _id)}>Ignore</button>
          <button className="btn btn-secondary"onClick={() => handleSendRequest("interested", _id)}>Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
