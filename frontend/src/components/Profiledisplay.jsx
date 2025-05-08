import React, { useState, useEffect, useRef } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoIosFlag } from "react-icons/io";
import { FaEarthAmericas } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const Profiledisplay = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]); // Ensuring it's always an array
  const [loading, setLoading] = useState(true); // Loading state
  const videoRef = useRef(null); // Reference to video element
  const lastTap = useRef(0); // For detecting double tap
  const swipeStartX = useRef(0); // For detecting swipe

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/home", {
          withCredentials: true,
        });
        console.log("User API response:", response.data);
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (!user?._id) return;

        console.log("Fetching posts for user ID:", user._id);
        const response = await axios.get(`http://localhost:5000/postdata/${user._id}`, {
          withCredentials: true,
        });

        console.log("Posts API response:", response.data);

        if (!Array.isArray(response.data)) {
          throw new Error("Invalid posts response: Not an array");
        }

        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts([]); // Ensuring posts is always an array
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchPosts();
  }, [user]);

  // Handle play/pause toggle
  const handleVideoClick = () => {
    const videoElement = videoRef.current;
    if (videoElement.paused) {
      videoElement.play();
    } else {
      videoElement.pause();
    }
  };

  // Handle double tap to skip 10 seconds forward or backward
  const handleDoubleTap = (event) => {
    const currentTime = Date.now();
    const videoElement = videoRef.current;
    const videoWidth = videoElement.clientWidth;
    const tapX = event.clientX; // X-coordinate of the tap

    if (currentTime - lastTap.current < 300) {
      // Double tap detected
      if (tapX > videoWidth / 2) {
        // Double tap on the right side: Skip forward 10 seconds
        videoElement.currentTime += 10;
      } else {
        // Double tap on the left side: Skip backward 10 seconds
        videoElement.currentTime -= 10;
      }
    } else {
      lastTap.current = currentTime;
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Top Navigation Bar */}
      <div className="bg-zinc-700 h-12 p-2 flex items-center gap-4 sticky top-0 z-50">
        <FaArrowLeft className="text-xl text-white cursor-pointer" onClick={() => navigate(-1)} />
        <div className="flex flex-col">
          <h1 className="text-lg font-bold text-white">{user ? user.name : "Loading..."}</h1>
          <p className="text-sm text-gray-400">{posts.length} posts</p>
        </div>
      </div>

      {/* Profile Header */}
      <div className="h-48 bg-gray-300"></div>
      <div className="relative px-6">
        <div className="absolute -top-16 left-6">
          <img
            src={user ? user.profilePic : ""}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white"
          />
        </div>

        <div className="flex justify-end">
          <button onClick={() => navigate("/edit")} className="mt-4 px-4 py-2 border border-gray-400 rounded-full hover:bg-gray-100">
            Edit Profile
          </button>
        </div>

        <div className="mt-4">
          <h1 className="text-2xl font-bold">{user ? user.name : "Loading..."}</h1>
          <p className="text-gray-500">@{user ? user.username : "Loading..."}</p>
          <p>{user ? user.bio : ""}</p>
          <h3 className="text-blue-700 flex items-center"><IoIosFlag className="mr-2" /> {user?.loc || ""}</h3>
          <h3 className="text-red-500 flex items-center"><FaEarthAmericas className="mr-2" /> {user ? user.web : ""}</h3>
          <p className="text-gray-600 flex items-center">
            📅 Joined {user ? moment(user.createdAt).format("DD MMMM YYYY") : "Loading..."}
          </p>
          <div className="flex space-x-4 mt-2">
            <span className="font-semibold">{user?.following?.length || 0}</span>
            <span className="text-gray-600">Following</span>
            <span className="font-semibold">{user?.follower?.length || 0}</span>
            <span className="text-gray-600">Followers</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-6 border-b flex space-x-6 text-gray-600">
        <span className="font-bold border-b-2 border-black pb-2">Posts</span>
      </div>

      {/* Posts Section */}
      <div className="p-4">
        {loading ? (
          <p className="text-center text-gray-500">Loading posts...</p>
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="border-b py-4">
              <h2 className="font-bold">{user?.name}</h2>
              <p className="text-gray-600 text-sm">{moment(post.createdAt).fromNow()}</p>
              <p className="mt-2">{post.tweet}</p>
              {post.image && (
                <img src={post.image} alt="Post" className="mt-2 rounded-lg max-w-full" />
              )}
              {post.audio && (
                <audio controls className="mt-2 w-full">
                  <source src={post.audio} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              )}
              {post.video && (
                <video
                  ref={videoRef}
                  controls
                  className="mt-2 w-full rounded-lg"
                  onClick={handleVideoClick}
                  onDoubleClick={handleDoubleTap} // Double tap gesture
                >
                  <source src={post.video} type="video/mp4" />
                  Your browser does not support the video element.
                </video>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No posts available</p>
        )}
      </div>
    </div>
  );
};

export default Profiledisplay;
