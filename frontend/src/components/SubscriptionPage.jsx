import { useState, useEffect } from "react";
import axios from "axios";

const plans = [
  { id: "free", name: "Free Plan", price: 0, tweets: 1, color: "#ccc", badge: "FREE" },
  { id: "bronze", name: "Bronze Plan", price: 100, tweets: 3, color: "#cd7f32", badge: "🥉 Bronze" }, // Added Bronze Plan
  { id: "silver", name: "Silver Plan", price: 300, tweets: 5, color: "#C0C0C0", badge: "🥈 Silver" },
  { id: "gold", name: "Gold Plan", price: 1000, tweets: "Unlimited", color: "#FFD700", badge: "🥇 Gold" },
];

const SubscriptionPage = ({ setBlur }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  // Fetch email from the token in localStorage
  useEffect(() => {
    const token = localStorage.getItem("token"); // Get the token from localStorage
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1])); // Decode the JWT payload
        setEmail(payload.email); // Extract email from the payload
      } catch (err) {
        console.error("Invalid token", err);
      }
    }
  }, []);

  const loadRazorpay = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const startPayment = async () => {
    if (!selectedPlan) {
      setError("Select a plan first");
      return;
    }
    if (!email) {
      setError("User email not found.");
      return;
    }
  
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.post("http://localhost:5000/subscribe",
        { planId: selectedPlan.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Handle free plan directly
      if (selectedPlan.id === "free") {
        alert("Free Plan Activated! Check your email.");
        return;
      }
  
      // Load Razorpay script
      const res = await loadRazorpay("https://checkout.razorpay.com/v1/checkout.js");
      if (!res) {
        alert("Failed to load Razorpay.");
        return;
      }
  
      // Configure Razorpay options
      const options = {
        key: "rzp_test_396l9Qf6gpYOCO",
        amount: data.amount,
        currency: data.currency,
        order_id: data.orderId,
        name: "Tweet Subscription",
        description: "Plan Purchase",
        prefill: {
          email: email,
        },
        theme: {
          color: "#3399cc",
        },
        handler: async (response) => {
          try {
            const { payment_id, order_id, signature } = response;
  
            await axios.post("http://localhost:5000/payment-success", {
              paymentId: payment_id,
              orderId: order_id,
              signature: signature,
              planId: selectedPlan.id,
            }, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
  
            alert("Payment Success! Invoice Sent.");
          } catch (error) {
            console.error(error);
            alert("Payment verification failed.");
          }
        },
      };
  
      // 🔥 Actually open Razorpay modal
      const rzp = new window.Razorpay(options);
      rzp.open();
  
    } catch (error) {
      console.error("Subscription error:", error);
      alert("Something went wrong while subscribing.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6"> Choose Your Tweet Plan</h1>

      <div className="flex flex-wrap justify-center gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            onClick={() => setSelectedPlan(plan)}
            className={`border-2 rounded-xl p-6 w-64 cursor-pointer shadow-md hover:scale-105 transition 
              ${selectedPlan?.id === plan.id ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
          >
            <div
              className="text-white rounded-full px-3 py-1 text-sm font-semibold mb-4"
              style={{ backgroundColor: plan.color }}
            >
              {plan.badge}
            </div>
            <h2 className="text-xl font-semibold mb-2">{plan.name}</h2>
            <p className="text-gray-700 mb-2">₹{plan.price} / month</p>
            <p className="text-gray-500">Tweets Allowed: <b>{plan.tweets}</b></p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={startPayment}
          className="bg-green-500 hover:bg-zinc-600 text-white py-2 px-8 rounded-full text-lg hover:text-xl"
        >
          Subscribe Now
        </button>
      </div>

      {error && (
        <div className="text-center text-red-500 mt-4">
          {error}
        </div>
      )}
    </div>
  );
};

export default SubscriptionPage;
