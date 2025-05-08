import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Content from "../components/Contents";
import Edit_profile from '../components/Edit_profile'
import PostModal from "../components/PostModal";

const Profile = () => {
  const [isBlurred, setIsBlurred] = useState(false);

  return (
    <div className="relative w-screen h-screen">
      {/* Background Blur */}
      {isBlurred && <div className="fixed inset-0 bg-black/40 backdrop-blur-lg z-20"></div>}

      {/* Page Content */}
      <div className={`flex px-45 overflow-y-auto transition-all duration-300 ${isBlurred ? "blur-md pointer-events-none" : ""}`}>
        {/* Sidebar */}
        <div className="w-63 sticky top-0 h-screen">
          <Sidebar setBlur={setIsBlurred} />
        </div>

        {/* Profile Section */}
        <div className="flex-1 h-screen pl-1">
          <Edit_profile setBlur={setIsBlurred} />
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

export default Profile;
