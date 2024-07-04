import React from 'react';
import { FaUsers, FaUserGraduate, FaChalkboardTeacher, FaBook } from 'react-icons/fa';

export const NavBar = () => {
    return (
        <nav className="sticky top-0 bg-background text-primary shadow-md z-10">
            <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
               
                <div>
                    <h1 className="font-bold text-3xl">Admin Dashboard</h1>
                </div>

                <ul className='flex space-x-4'>
                    <li>
                        <a href="/getAllCourses" className="flex items-center bg-primary text-white font-bold px-3 py-1 rounded-full shadow-sm">
                            <FaBook className="mr-2" />
                            <h3>Courses</h3>
                        </a>
                    </li>
                    <li>
                        <a href="/getStudents" className="flex items-center bg-primary text-white font-bold px-3 py-1 rounded-full shadow-sm">
                            <FaUserGraduate className="mr-2" />
                            <h3>Students</h3>
                        </a>
                    </li>
                    <li>
                        <a href="/getTeachers" className="flex items-center bg-primary text-white font-bold px-3 py-1 rounded-full shadow-sm">
                            <FaChalkboardTeacher className="mr-2" />
                            <h3>Teachers</h3>
                        </a>
                    </li>
                    <li>
                        <a href="/reported" className="flex items-center bg-primary text-white font-bold px-3 py-1 rounded-full shadow-sm">
                            <FaUsers className="mr-2" />
                            <h3>Reported</h3>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}