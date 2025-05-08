import google from '../assets/images/google.png'
import {react,useState} from 'react'

import twitterLogo from "../assets/images/twitter.png";


import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();     

    const handlelogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include', 
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Login failed.');
            }

            console.log('Login successful:', data);

          
            localStorage.setItem('token', data.token);

          
            navigate('/home'); 

        } catch (error) {
            console.error(error.message);
            alert(error.message);
        }
    };
    
    return (
        <div className="flex justify-center px-8 py-12">
            {/* Wrapper Div with Left & Right Margins */}
            <div className="flex w-[900px] overflow-hidden">

                {/* Left Side - Image */}
                <div className="w-1/2 flex items-center justify-center bg-blue-500">
                    <img
                        src="https://abs.twimg.com/sticky/illustrations/lohp_en_1302x955.png"
                        alt="Twitter Background"
                        className="w-full h-full object-cover"
                    />
                </div>

            
                <div className="w-1/2 flex flex-col justify-center px-10 py-8 bg-white">
                    <img src={twitterLogo} alt="Twitter Logo" className="w-8 mb-4" />

                    <h1 className="text-3xl font-bold">Login to your account!</h1>

                    {/* Form Inputs */}
                    <form className="mt-6 space-y-4" onSubmit={handlelogin}>
                        <input type="email" placeholder="Email Address" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border rounded-lg bg-gray-100 focus:outline-none" Required />
                        <input type="password" placeholder="Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border rounded-lg bg-gray-100 focus:outline-none" Required />
                        <h1 className='text-xs'>Forget password?<a href="/forgetpass" className='text-blue-700'>click here</a> </h1>

                        <button className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600">
                            Login
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
                        Not have an account ? <a href="/sign" className="text-blue-500 font-medium hover:underline">Sign in</a>
                    </p>
                </div>
            </div>
        </div>
    )


}

export default Login