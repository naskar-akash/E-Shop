import React,{useState, useEffect} from 'react';
import {getUserProfile} from "./Services/UserServices";
import AlertMsg from "./Services/AlertMsg";

const Profile = () => {
    const { serverMsg, status, showAlert } = AlertMsg(3);
    const [user, setUser] = useState(null);

    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const response = await getUserProfile();
          console.log(response.data.profilePic);
          setUser(response.data);
        } catch (error) {
          showAlert(error.response || error, "success", "error");
        }
        };
        fetchProfile();
    }, [])

    
  return (
    <div className='w-full min-h-screen mx-auto'>
      <img src={user?.profilePic} alt="Profile" className='w-[200px] h-[200px] object-cover'/>
    </div>
  )
}

export default Profile
