import { useState } from 'react';
import studentImg from './../assets/collegeStudent.png';
import logo from '../assets/gehuLogo.png';

import { FaCreativeCommonsNcJp, FaEye, FaEyeSlash } from 'react-icons/fa';

export const LoginPage = () => {

    // All the states 
    const [user, setUser] = useState({
        uid: "",
        password: ""
    }); // update the user

    const [showPassword, setShowPassword] = useState(false);

    // All the handlers 
    const toggleVisibility = () => {
        setShowPassword(!showPassword);
    }

    const handleInput = (event) => {
        const { name, value } = event.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(user);

        
    }

    return <div className='-mt-8 min-h-screen flex flex-col items-center justify-center bg-gray-100'>

        <img src={logo} alt="Logo" className='w-64 h-auto mb-8 hover:w-72 hover:ease-in-out hover:transition-all' />

        <div className='flex flex-col md:flex-row items-center max-w-4xl w-full bg-white rounded-lg shadow-lg overflow-hidden'>
            <div className='w-full md:w-1/2 p-8 hidden md:block'>
                <img src={studentImg} alt="Student" className='w-full h-auto object-cover sway-left-right' />
            </div>

            <div className='w-full md:w-1/2 p-10 flex flex-col items-center'>
                <h2 className='oswald text-4xl md:text-5xl font-bold text-center mb-8'>Login</h2>

                {/* FORM Handling  */}

                <form onSubmit={handleSubmit} className='w-full'>
                    
                    {/* UID input field */}
                    <div className='mb-6'>
                        <label className='block quatro-bold text-xl text-gray-700 mb-2' htmlFor="uid">UID</label>
                        <input
                            className='shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:scale-105'
                            type="text" name="uid" id="uid" placeholder='Enter your UID' autoComplete='off' required value={user.uid} onChange={handleInput}
                        />
                    </div>

                    {/* Password input field */}
                    <div className='mb-6'>
                        <label className='block quatro-bold text-xl text-gray-700 mb-2' htmlFor="password">Password</label>
                        <div className='flex items-center'>
                            <input
                                className='shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary'
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                id="password"
                                placeholder='Enter your Password'
                                autoComplete='off'
                                required
                                value={user.password}
                                onChange={handleInput}
                            />

                            {/* Eye button */}
                            <div
                                className="-ml-8 cursor-pointer"
                                onClick={toggleVisibility}
                            >
                                {showPassword ? <FaEyeSlash size={24} /> : <FaEye size={24} />}
                            </div>
                        </div>
                    </div>

                    {/* Sign in button  */}

                    <div className='flex flex-col md:flex-row items-center justify-between'>
                        <button className='quatro font-extrabold text-xl rounded-full bg-primary text-white px-6 py-3 hover:bg-opacity-90 transition duration-300 mb-4 md:mb-0 w-full md:w-auto mt-4'>
                            Sign in
                        </button>

                        {/* Forgot password */}
                        <a className="mt-4 font-bold quatro text-primary text-xl hover:text-opacity-80 transition duration-300" href='/error'>
                            Forgot Password?
                        </a>

                    </div>
                </form>
            </div>
        </div>
    </div>
};
