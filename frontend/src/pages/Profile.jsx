import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Content from "../components/Contents";
import ProfileDisplay from "../components/Profiledisplay";
import PostModal from "../components/PostModal";

const Profile = () => {
  const [isBlurred, setIsBlurred] = useState(false);

  return (
    <div className="relative w-screen h-screen overflow-x-hidden">
      {/* Background Blur */}
      {isBlurred && <div className="fixed inset-0 bg-black/40 backdrop-blur-lg z-20"></div>}

      {/* Page Content */}
      <div className={`flex px-45 transition-all duration-300 ${isBlurred ? "blur-md pointer-events-none" : ""}`}>
        {/* Sidebar (Sticky Left) */}
        <div className="w-63 sticky top-0 h-screen shrink-0">
          <Sidebar setBlur={setIsBlurred} />
        </div>

        {/* Profile Section (Scrollable with page) */}
        <div className="flex-1 pl-1">
          <ProfileDisplay setBlur={setIsBlurred} />
        </div>

        {/* Divider */}
        <div className="w-[1px] bg-gray-300 h-full"></div>

        {/* Content Section (Sticky Right) */}
        <div className="w-78 sticky top-0 h-screen shrink-0">
          <Content setBlur={setIsBlurred} />
        </div>
      </div>

      {/* Post Modal */}
      <PostModal isOpen={isBlurred} onClose={() => setIsBlurred(false)} />
    </div>
  );
};

export default Profile;
