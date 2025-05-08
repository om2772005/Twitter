import {
  FaHome,
  FaSearch,
  FaBell,
  FaEnvelope,
  FaBookmark,
  FaList,
  FaUser,
  FaEllipsisH,
  FaFeather,
  FaDollarSign,  // Importing Dollar Sign Icon
  FaCrown       // Importing Crown Icon
} from "react-icons/fa";
import twitter from '../assets/images/twitter.png';
import React, { useState, useEffect } from "react";
import PostModal from "./PostModal";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Sidebar = ({ setBlur }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTweetOpen, setIsTweetOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5000/logout', {
        method: 'POST',
        credentials: 'include'
      });
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
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

    if (
      window.location.pathname === "/home" ||
      window.location.pathname === "/profile" ||
      window.location.pathname === "/edit" ||
      window.location.pathname === "/explore" ||
      window.location.pathname === "/subscribe"
    ) {
      fetchUserData();
    }
  }, []);

  const handleLanguageChange = async (e) => {
    const lang = e.target.value;
    const otpType = lang === "fr" ? "email" : "mobile";

    const confirmSwitch = window.confirm(`Switching to ${lang.toUpperCase()} requires a ${otpType} OTP. Proceed?`);
    if (!confirmSwitch) return;

    try {
      const sendRes = await fetch("http://localhost:5000/api/verify-language", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ language: lang }),
      });

      const sendData = await sendRes.json();

      if (sendData.success) {
        const otp = prompt(`Enter OTP sent to your ${otpType}:`);
        const verifyRes = await fetch("http://localhost:5000/api/verify-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ otp }),
        });

        const verifyData = await verifyRes.json();

        if (verifyData.success) {
          alert(`Language switched to ${lang.toUpperCase()}`);
          window.location.reload();
        } else {
          alert("Invalid OTP. Try again.");
        }
      } else {
        alert("Failed to send OTP.");
      }
    } catch (err) {
      console.error("Language switch error:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="w-64 h-screen p-4 border-r flex flex-col justify-between">
      <nav className="space-y-4">
        <div className="text-xl font-bold flex items-center space-x-2">
          <img src={twitter} alt="Logo" className="w-8 h-8" />
          <span>Twiller</span>
        </div>
        <ul className="p-5 space-y-2">
          <a href="home"><li className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded cursor-pointer"><FaHome /> <span>Home</span></li></a>
          <a href="explore"><li className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded cursor-pointer"><FaSearch /> <span>Explore</span></li></a>
          <li className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded cursor-pointer"><FaBell /> <span>Notifications</span></li>
          <li className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded cursor-pointer"><FaEnvelope /> <span>Messages</span></li>
          <li className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded cursor-pointer"><FaBookmark /> <span>Bookmarks</span></li>
          <a href="/profile"><li className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded cursor-pointer"><FaUser /> <span>Profile</span></li></a>
        </ul>

        {/* Tweet Button (Red) */}
        <div className="mt-auto">
          <button
            onClick={() => setBlur(true)}
            className="w-full bg-blue-500 text-white py-3 rounded-full text-lg font-semibold shadow-xl hover:scale-105 transform transition-all duration-300 ease-in-out hover:bg-red-600"
          >
            <FaFeather className="inline-block mr-2" />
            Tweet
          </button>
        </div>

        {/* Subscribe Button with Dollar or Crown Icon */}
        <div className="mt-3">
        <button
      onClick={() => navigate('/subscribe')}
      className="w-full bg-yellow-300 text-black py-3 rounded-full text-lg font-semibold shadow-xl transform transition-all duration-300 ease-in-out hover:bg-yellow-500 hover:text-white hover:scale-110 animate-pulse"
    >
      <FaCrown className="inline-block ml-2" /> {/* Crown Icon */}
      Subscribe
    </button>
        </div>

        {/* Language Selector */}
        <div className="mt-6">
          <label htmlFor="language" className="text-sm font-semibold text-gray-700 mb-1 block">
            Change Language 🌐
          </label>
          <select
            id="language"
            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none"
            onChange={handleLanguageChange}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="hi">Hindi</option>
            <option value="pt">Portuguese</option>
            <option value="zh">Chinese</option>
            <option value="fr">French</option>
          </select>
        </div>
      </nav>

      <PostModal isOpen={isTweetOpen} onClose={() => setIsTweetOpen(false)} />

      <div className="relative">
        <button
          className="flex items-center space-x-3 p-2 w-full rounded-full hover:bg-gray-200"
          onClick={() => setIsOpen(!isOpen)}
        >
          <img className="w-12 h-12 rounded-full" src={user ? user.profilePic : ""} alt="Profile" />
          <div className="flex flex-col">
            <h1 className="text-lg font-bold">{user ? user.name : ""}</h1>
            <h4 className="text-xs text-gray-500">{user ? user.username : ""}</h4>
          </div>
          <FaEllipsisH className="ml-auto" />
        </button>

        {isOpen && (
          <div className="absolute bottom-16 left-0 w-56 bg-white text-black rounded-lg shadow-lg">
            <div className="p-3 space-y-2">
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-300 rounded-md">
                Add an existing account
              </button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-300 rounded-md" onClick={handleLogout}>
                Log out @{user ? user.username : ""}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
