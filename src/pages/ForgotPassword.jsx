import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ForgotPassword = () => {
    const { resetPassword } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await resetPassword(email.trim());
        setLoading(false);
        setEmail('')
    };

    return (
        <div className="min-h-[60vh] w-full flex justify-center items-center mt-16">
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-[90%] max-w-[385px] shadow-lg px-4 py-6 rounded-lg">
                <i className="fa fa-exclamation-circle text-6xl text-blue-500" aria-hidden="true"></i>
                <p className="font-semibold text-2xl text-[#2c2c2c]">Forgot Password</p>
                <p className="text-[#2c2c2c] text-sm text-center">Enter your email and we will send you a link to reset your password</p>
                <input
                    type="email"
                    className="border border-stone-500 rounded p-3 w-full mt-6"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-green-500 text-white font-semibold p-2 rounded-lg hover:bg-green-600"
                >
                    {loading ? "sending..." : "Submit"}
                </button>

                <div className="mt-6">
                    <Link to='/login' className="text-stone-500 cursor-pointer" >
                        Back to Login 
                        <i className="fa-solid fa-right-to-bracket ml-2"></i>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default ForgotPassword;