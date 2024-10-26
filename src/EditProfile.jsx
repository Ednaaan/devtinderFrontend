import React, { useState, useEffect } from 'react';
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from './utils/constant';
import { useDispatch } from 'react-redux';
import { addUser } from './utils/userSlice';

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state
  const [toast, setToast] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    // Update state when `user` prop changes
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setAge(user.age || "");
      setGender(user.gender || "");
      setAbout(user.about || "");
      setPhotoUrl(user.photoUrl || "");
      setLoading(false); // Stop loading once user data is available
    }
  }, [user]); // This ensures state updates whenever `user` changes

  const saveProfile = async () => {
    setError("");

    try {
      const res = await axios.patch(BASE_URL + "/profile/edit", {
        firstName,
        lastName,
        age,
        gender,
        about,
        photoUrl,
      }, {
        withCredentials: true,
      });
      dispatch(addUser(res?.data?.data));
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };

  if (loading) {
    return <div>Loading profile...</div>; // Loading indicator while user data is not available
  }

  return (
    <>
      <div className='flex justify-center my-10'>
        <div className='flex justify-center mx-10'>
          <div className="card bg-base-300 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center my-3 ">Edit Profile</h2>

              <label className="input input-bordered flex items-center gap-2">
                <input type="text" className="grow" placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <input type="text" className="label" placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <input type="text" className="label" placeholder="Age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <input type="text" className="label" placeholder="Gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <input type="text" className="label" placeholder="about"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <input type="text" className="label" placeholder="photoUrl"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </label>
              <p className='text-red-600'>{error}</p>
              <div className="card-actions justify-center my-5">
                <button className="btn btn-primary" onClick={saveProfile}>Save</button>
              </div>
            </div>
          </div>
        </div>
        <UserCard user={{ firstName, lastName, age, gender, about, photoUrl }} />
      </div>

      {toast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-info">
            <span>Profile Saved Successfully</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
