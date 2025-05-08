import { useState } from "react";
import google from "../assets/images/google.png";
import twitterLogo from "../assets/images/twitter.png";

const Sign = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [isPopupVisible, setPopupVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPopupMessage("Registration successful!");
    setPopupVisible(true);

    try {
      const response = await fetch("http://localhost:5000/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, username, email, password }),
        credentials: "include", // ✅ Required for cookies
      });

      const rawResponse = await response.text();

      let data = null;
      try {
        data = JSON.parse(rawResponse);
      } catch {
        if (rawResponse === "invalid") {
          alert("Invalid email or password. Please try again.");
          return;
        } else {
          throw new Error("Unexpected response from the server.");
        }
      }

      if (data.redirectTo) {
        window.location.href = data.redirectTo;
      } else {
        alert("No redirection path provided.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("An error occurred during registration. Please try again.");
    }
  };

  return (
    <div className="flex justify-center px-8 py-12">
      {/* Wrapper Div */}
      <div className="flex w-[900px] overflow-hidden">
        {/* Left Side - Image */}
        <div className="w-1/2 flex items-center justify-center bg-blue-500">
          <img
            src="https://abs.twimg.com/sticky/illustrations/lohp_en_1302x955.png"
            alt="Twitter Background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side - Signup Form */}
        <div className="w-1/2 flex flex-col justify-center px-10 py-8 bg-white">
          <img src={twitterLogo} alt="Twitter Logo" className="w-8 mb-4" />

          <h1 className="text-3xl font-bold">Happening now</h1>
          <h2 className="text-xl font-semibold mt-2">Join Twiller today</h2>

          {/* Form Inputs */}
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg bg-gray-100 focus:outline-none"
              required
            />  
            <input
              type="text"
              placeholder="Enter Full Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg bg-gray-100 focus:outline-none"
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg bg-gray-100 focus:outline-none"
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg bg-gray-100 focus:outline-none"
              required
            />

            <button className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600">
              Sign Up
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-4">
            <hr className="w-full border-gray-300" />
            <span className="px-2 text-gray-500">or</span>
            <hr className="w-full border-gray-300" />
          </div>

          {/* Google Sign-in */}
          <button className="w-full flex items-center justify-center border rounded-lg py-2 hover:bg-gray-100">
            <img src={google} alt="Google" className="w-5 h-5 mr-2" />
            Sign in with Google
          </button>

          {/* Already Have an Account? */}
          <p className="text-gray-500 text-sm mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 font-medium hover:underline">
              Log in
            </a>
          </p>
        </div>
      </div>

      {/* Popup Message */}
      {isPopupVisible && (
        <div className="fixed bottom-5 right-5 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
          {popupMessage}
        </div>
      )}
    </div>
  );
};

export default Sign;
