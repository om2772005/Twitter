import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaCamera } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate(); 
  
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [loc, setLoc] = useState("");
  const [web, setWeb] = useState("");
  const [profilePic, setProfilePic] = useState("");

  const updateUser = async () => {
    const updates = {};

    if (name.trim() !== "") updates.name = name;
    if (bio.trim() !== "") updates.bio = bio;
    if (loc.trim() !== "") updates.loc = loc;
    if (web.trim() !== "") updates.web = web;
    if (profilePic.trim() !== "") updates.profilePic = profilePic;

    if (Object.keys(updates).length === 0) {
      console.log("No valid fields to update");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/edit",
        updates,
        { withCredentials: true } // ✅ Important for sending cookies
      );
      console.log("User updated:", response.data);
      navigate("/profile"); // ✅ Correctly placed here
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const [user, setUser] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/home", {
          withCredentials: true, 
        });
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    if (window.location.pathname === "/edit") {
      fetchUserData();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-black flex flex-col items-center">
      {/* Header */}
      <div className="bg-zinc-700 h-14 w-full p-3 flex items-center gap-4 sticky top-0 z-50 shadow-md">
        <FaArrowLeft 
          className="text-xl text-white cursor-pointer" 
          onClick={() => navigate(-1)}
        />
        <div>
          <h1 className="text-lg font-bold text-white">{user ? user.name : "Loading..."}</h1>
          <p className="text-sm text-gray-400">0 posts</p>
        </div>
      </div>
      
      {/* Profile Edit Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mt-6 w-11/12 max-w-md text-center">
        <h1 className="text-2xl font-semibold text-gray-700 mb-4">Edit Your Profile</h1>
        
        {/* Profile Picture Upload */}
        <div className="relative w-32 h-32 mx-auto group ">
          <img 
            src={user ? user.profilePic : "Loading..."} 
            alt="Profile" 
            className="w-32 h-32 rounded-full border-4 border-gray-300 hover:opacity-50"
          />

          <div className="absolute bottom-2 right-2 bg-gray-800 text-white p-2 rounded-full cursor-pointer transition-opacity opacity-0 group-hover:opacity-100 flex items-center justify-center">
            <label className="cursor-pointer flex items-center">
              <FaCamera className="text-lg" />
              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </label>
          </div>
        </div>

        {/* Name Input */}
        <div className="mt-6 text-left">
          <label className="block text-gray-600 font-medium mb-1">Name</label>
          <input 
            type="text" 
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={user ? user.name : ''}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Bio Input */}
        <div className="mt-4 text-left">
          <label className="block text-gray-600 font-medium mb-1">Bio</label>
          <textarea 
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder={user ? user.bio : ''}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
        </div>

        {/* Location Input */}
        <div className="mt-6 text-left">
          <label className="block text-gray-600 font-medium mb-1">Location</label>
          <input 
            type="text" 
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={user ? user.loc : ''}
            value={loc}
            onChange={(e) => setLoc(e.target.value)}
          />
        </div>

        {/* Website Input */}
        <div className="mt-6 text-left">
          <label className="block text-gray-600 font-medium mb-1">Website</label>
          <input 
            type="text" 
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={user ? user.web : ''}
            value={web}
            onChange={(e) => setWeb(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <button 
          type="button" 
          className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition" 
          onClick={(e) => {
            e.preventDefault();
            updateUser();
          }}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
