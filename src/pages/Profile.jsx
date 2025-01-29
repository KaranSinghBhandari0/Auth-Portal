import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
    const { user, updatingProfile, updateUserProfile, setImage } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        username: user.username || "",
        mobile: user.phoneNumber || "",
        DOB: user.DOB || "",
    });

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUserProfile(formData);
    };

    return (
        <div className="min-h-screen w-full">
            {/* Profile Header Section */}
            <div className="w-full h-48 md:h-64 bg-primary rounded-xl relative">
                <img
                    src={user.image || '/avatar.png'}
                    alt="Avatar"
                    className="rounded-full w-[200px] h-[200px] absolute bottom-[-100px] left-1/2 transform -translate-x-1/2 border-4 border-white shadow-lg"
                />
                <div className="absolute bottom-[-90px] left-1/2 transform -translate-x-1/2 translate-x-[70px] bg-white rounded-full shadow-md cursor-pointer p-2 flex items-center justify-center bg-neutral-300 h-10 w-10 rounded-full">
                    <label
                        htmlFor="avatar"
                        className="flex items-center justify-center rounded-full p-2 cursor-pointer"
                    >
                        <i className="fa-solid fa-camera"></i>
                    </label>
                    <input
                        type="file"
                        id="avatar"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>
            </div>

            {/* Profile Details Section */}
            <div className="mt-32 text-center px-4">
                <p className="text-2xl text-tertiary font-semibold">
                    {formData.username}
                </p>

                <div className="max-w-[500px] border rounded-xl mx-auto mt-6 mb-8 border-2 border-secondary px-6 py-8 shadow-md bg-white">
                    {/* Username Field */}
                    <div className="flex md:gap-4 items-center w-full mb-6">
                        <p className="text-tertiary font-semibold md:text-lg text-left min-w-[100px]">
                            Username:
                        </p>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="border-b border-black outline-none w-full text-stone-500 px-2 py-1"
                        />
                    </div>

                    {/* Email Field */}
                    <div className="flex md:gap-4 items-center w-full mb-6">
                        <p className="text-tertiary font-semibold md:text-lg text-left min-w-[100px]">
                            Email:
                        </p>
                        <p className="border-b border-black outline-none w-full text-stone-500 px-2 py-1 bg-transparent cursor-not-allowed text-start">
                            {user.email}
                        </p>
                    </div>

                    {/* Phone Field */}
                    <div className="flex md:gap-4 items-center w-full mb-6">
                        <p className="text-tertiary font-semibold md:text-lg text-left min-w-[100px]">
                            Phone:
                        </p>
                        <input
                            type="number"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            className="border-b border-black outline-none w-full text-stone-500 px-2 py-1"
                        />
                    </div>

                    {/* Date of Birth Field */}
                    <div className="flex md:gap-4 items-center w-full mb-6">
                        <p className="text-tertiary font-semibold md:text-lg text-left min-w-[100px]">
                            DOB:
                        </p>
                        <input
                            type="date"
                            name="DOB"
                            value={formData.DOB ?? ""}
                            onChange={handleChange}
                            className="border-b border-black outline-none w-full text-stone-500 px-2 py-1"
                        />
                    </div>

                    {/* Save Button */}
                    <div className="mt-8 text-center">
                        <button
                            onClick={handleSubmit}
                            disabled={updatingProfile}
                            className={`bg-primary text-white px-6 py-2 rounded-lg shadow-md transition duration-300 ${updatingProfile
                                ? "bg-gray-500 cursor-not-allowed"
                                : "hover:bg-primary-dark"
                                }`}
                        >
                            {updatingProfile ? "Saving..." : "Save Changes"}
                        </button>
                    </div>

                    <p className="text-sm text-start mt-4 text-stone-500">
                        Account Created:{" "}
                        {new Date(user.accountCreatedAt).toLocaleString()}
                    </p>
                </div>
            </div>
        </div>
    );
}
