import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Content from "../components/Contents";
import ProfileDisplay from "../components/Profiledisplay";
import PostModal from "../components/PostModal";
import twitter from "../assets/images/twitter.png";


const Profile = () => {
  const [isBlurred, setIsBlurred] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
 return (
    <div className="relative w-screen h-screen overflow-x-hidden">

      {/* Background Blur */}
      {isBlurred && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-lg z-20"></div>
      )}

      {/* Navbar for Mobile */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 flex items-center justify-between bg-white px-4 py-3 shadow-md">
        <div className="text-xl font-bold flex items-center space-x-2">
          <img src={twitter} alt="Logo" className="w-8 h-8" />
          <span>Twiller</span>
        </div>
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="bg-gray-800 text-white px-3 py-2 rounded-md"
        >
          ☰
        </button>
      </div>

      {/* Mobile Sidebar Drawer */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 flex lg:hidden">
          <div className="bg-white w-68 h-screen max-h-screen shadow-lg overflow-y-auto overflow-x-hidden pt-2 px-3 pb-2">
 {/* Adjusted sidebar width */}
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="text-black font-bold mb-4"
            >
              ✕ Close
            </button>
            <Sidebar setBlur={setIsBlurred} />
          </div>
          <div
            className="flex-1 bg-black/40"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        </div>
      )}

      {/* Page Content (Desktop + Mobile) */}
      <div
        className={`flex flex-col lg:flex-row lg:px-45 overflow-y-auto transition-all duration-300 ${
          isBlurred ? "blur-md pointer-events-none" : ""
        }`}
      >
        {/* Sidebar (Desktop Only) */}
        <div className="hidden lg:block w-63 sticky top-0 h-screen">
          <Sidebar setBlur={setIsBlurred} />
        </div>

        {/* Profile Section (with adjusted top margin for mobile) */}
        <div className="flex-1 h-screen pl-1 mt-[80px] lg:mt-0"> {/* Adjusted margin-top for mobile */}
          <ProfileDisplay setBlur={setIsBlurred} />
        </div>

        {/* Divider (Desktop Only) */}
        <div className="hidden lg:block w-[1px] bg-gray-300 h-full"></div>

        {/* Content Section */}
        <div className="hidden lg:block w-78 sticky top-0 h-screen">
          <Content setBlur={setIsBlurred} />
        </div>
      </div>

      {/* Post Modal */}
      <PostModal isOpen={isBlurred} onClose={() => setIsBlurred(false)} />
    </div>
  );
};

export default Profile;
