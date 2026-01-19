import React, { useState, useEffect } from "react";
import { getUserProfile, updateProfilePic } from "./Services/UserServices";
import AlertMsg from "./Services/AlertMsg";

const Profile = () => {
  const { serverMsg, status, showAlert } = AlertMsg(3);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getUserProfile();
        setUser(response.data);
      } catch (error) {
        showAlert(error.response || error, "success", "error");
      }
    };
    fetchProfile();
  }, []);

  // Function to handle profile picture
  const handleProfilePic = async (file) => {
    const formData = new FormData();
    formData.append("profilePic", file);
    try {
      const response = await updateProfilePic(formData);
      showAlert(response.data.message, "success", "error");
    } catch (error) {
      showAlert(error.response || error, "success", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      {/* Decorative background elements */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10 animate-pulse"></div>
      <div
        className="fixed bottom-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -z-10 animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      {/*Showing flash message*/}
      {serverMsg && (
        <div
          className={`fixed top-1/2 left-1/2 p-6 rounded-lg shadow-lg shadow-zinc-500 text-white transition-transform duration-300 z-50 ${
            status === "success" ? "bg-green-500" : "bg-red-500"
          }`}
          style={{ transform: "translate(-50%, -50%)" }}
        >
          {serverMsg}
        </div>
      )}

      {/* Main container */}
      <div className="max-w-md mx-auto">
        {/* Header with decorative line */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              User Profile
            </h2>
          </div>
          <p className="text-gray-500 text-sm">
            Welcome to your profile dashboard
          </p>
        </div>

        {user ? (
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden backdrop-blur-lg border border-gray-100">
            {/* Gradient header bar */}
            <div className="h-32 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>

            {/* Profile content */}
            <div className="px-6 py-8 text-center relative -mt-20 z-10">
              {/* Profile image with file input */}
              <div className="flex justify-center mb-6">
                <label className="relative cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-lg opacity-75 animate-pulse"></div>
                  <img
                    src={user?.profilePic}
                    alt="Profile"
                    className="relative w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg hover:scale-105 transition-transform duration-300"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleProfilePic(e.target.files[0])}
                    className="hidden"
                  />
                </label>
              </div>

              {/* User info */}
              <div className="space-y-3">
                <div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-1">
                    {user.name}
                  </h3>
                  {user.role && (
                    <span className="inline-block bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-1 rounded-full text-sm font-semibold mb-2">
                      ⭐ Admin
                    </span>
                  )}
                </div>

                {/* Info cards */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-100">
                  <p className="text-gray-600 text-sm mb-1">Email</p>
                  <p className="text-gray-800 font-semibold">{user.email}</p>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-100">
                  <p className="text-gray-600 text-sm mb-1">Address</p>
                  <p className="text-gray-800 font-semibold">
                    {user.address}, {user.pincode}
                  </p>
                </div>

                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-4 border border-indigo-100">
                  <p className="text-gray-600 text-sm mb-1">Member Since</p>
                  <p className="text-gray-800 font-semibold">
                    {user.joinedDate} at {user.joinedTime}
                  </p>
                </div>

                {user.role && (
                  <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-4 border border-yellow-300 mt-4">
                    <p className="text-lg font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                      🎉 You are an Admin! 🎉
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="inline-block">
                <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              </div>
              <p className="mt-4 text-gray-600 font-semibold">
                Loading your profile...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
