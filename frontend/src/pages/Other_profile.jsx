import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Content from "../components/Contents";
import PostModal from "../components/PostModal";
import axios from "axios";
import { FaArrowLeft, FaEarthAmericas } from "react-icons/fa6";
import { IoIosFlag } from "react-icons/io";
import moment from "moment";

const Other_profile = () => {
  const [isBlurred, setIsBlurred] = useState(false);
  const { id } = useParams(); // Get the user ID from URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Fix navigation

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/profile/${id}`, {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError("Failed to load profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-10">Loading profile...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  return (
    <div className="relative w-screen h-screen">
      {/* Background Blur */}
      {isBlurred && <div className="fixed inset-0 bg-black/40 backdrop-blur-lg z-20"></div>}

      {/* Page Content */}
      <div className={`flex px-45 transition-all duration-300 ${isBlurred ? "blur-md pointer-events-none" : ""}`}>
        {/* Sidebar */}
        <div className="w-63 sticky top-0 h-screen">
          <Sidebar setBlur={setIsBlurred} />
        </div>

        {/* Profile Section */}
        <div className="flex-1 h-screen pl-1">
          <div className="min-h-screen bg-white text-black">
            <div className="bg-zinc-700 h-12 p-2 flex items-center gap-4 sticky top-0 z-50">
              {/* Back Arrow */}
              <FaArrowLeft className="text-xl text-white cursor-pointer" onClick={() => navigate(-1)} />

              {/* Username & Post Count */}
              <div className="flex flex-col">
                <h1 className="text-lg font-bold text-white">{user.name}</h1>
                <p className="text-sm text-gray-400">0 posts</p>
              </div>
            </div>

            {/* Cover Photo */}
            <div className="h-48 bg-gray-300"></div>

            {/* Profile Section */}
            <div className="relative px-6">
              {/* Profile Image */}
              <div className="absolute -top-16 left-6">
                <img
                  src={user.profilePic || "https://via.placeholder.com/150"}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white"
                />
              </div>

              {/* Edit Button */}
              <div className="flex justify-end">
                <button
                  className="mt-4 px-4 py-2 border border-gray-400 rounded-full hover:bg-gray-100"
                >
                  Follow
                </button>
              </div>

              {/* Profile Details */}
              <div className="mt-4">
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-gray-500">@{user.username}</p>
                <p>{user.bio}</p>
                <h3 className="text-blue-700 flex items-center">
                  <IoIosFlag className="mr-2" /> {user.loc}
                </h3>
                <h3 className="text-red-500 flex items-center">
                  <FaEarthAmericas className="mr-2" /> {user.web}
                </h3>
                <p className="text-gray-600 flex items-center">
                  📅 Joined {moment(user.createdAt).format("DD MMMM YYYY")}
                </p>

                {/* Follow Info */}
                <div className="flex space-x-4 mt-2">
                  <span className="font-semibold">{user.following.length}</span>
                  <span className="text-gray-600">Following</span>
                  <span className="font-semibold">{user.followers}</span>
                  <span className="text-gray-600">Followers</span>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="mt-6 border-b flex space-x-6 text-gray-600">
                <span className="font-bold border-b-2 border-black pb-2">Posts</span>
                <span className="hover:text-black cursor-pointer">Replies</span>
                <span className="hover:text-black cursor-pointer">Highlights</span>
                <span className="hover:text-black cursor-pointer">Articles</span>
                <span className="hover:text-black cursor-pointer">Media</span>
                <span className="hover:text-black cursor-pointer">Likes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-[1px] bg-gray-300 h-full"></div>

        {/* Content Section */}
        <div className="w-78 sticky top-0 h-screen">
          <Content setBlur={setIsBlurred} />
        </div>
      </div>

      {/* Post Modal */}
      <PostModal isOpen={isBlurred} onClose={() => setIsBlurred(false)} />
    </div>
  );
};

export default Other_profile;
