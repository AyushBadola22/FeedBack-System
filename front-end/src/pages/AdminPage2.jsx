import React, { useState } from 'react';
import { FaUsers, FaUserGraduate, FaChalkboardTeacher, FaBook } from 'react-icons/fa';

export const AdminPage = ()=> {
  const [activeTab, setActiveTab] = useState('createAdmin');

  const renderContent = () => {
    switch(activeTab) {
      case 'createAdmin':
        return <CreateAdminForm />;
      case 'addStudent':
        return <AddStudentForm />;
      case 'addTeacher':
        return <AddTeacherForm />;
      case 'addCourse':
        return <AddCourseForm />;
      default:
        return <CreateAdminForm />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sticky Navbar */}
      <nav className="sticky top-0 bg-black text-white shadow-md z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="font-bold text-xl">Admin Dashboard</span>
            </div>
            <div className="flex">
              <NavLink icon={<FaUsers />} text="Create Admin" onClick={() => setActiveTab('createAdmin')} active={activeTab === 'createAdmin'} />
              <NavLink icon={<FaUserGraduate />} text="Add Student" onClick={() => setActiveTab('addStudent')} active={activeTab === 'addStudent'} />
              <NavLink icon={<FaChalkboardTeacher />} text="Add Teacher" onClick={() => setActiveTab('addTeacher')} active={activeTab === 'addTeacher'} />
              <NavLink icon={<FaBook />} text="Add Course" onClick={() => setActiveTab('addCourse')} active={activeTab === 'addCourse'} />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">{activeTab.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</h2>
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

function NavLink({ icon, text, onClick, active }) {
  return (
    <a
      href="#"
      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
        active ? 'bg-orange-500 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
      }`}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {icon}
      <span className="ml-2">{text}</span>
    </a>
  );
}

function CreateAdminForm() {
    return (
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <InputField label="Name" id="adminName" type="text" placeholder="Enter admin name" />
            <InputField label="Email" id="adminEmail" type="email" placeholder="Enter admin email" />
            <InputField label="Password" id="adminPassword" type="password" placeholder="Enter password" />
            <Button text="Create Admin" />
        </form>
    );
}

function AddStudentForm() {
    return (
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <InputField label="Name" id="studentName" type="text" placeholder="Enter student name" />
            <InputField label="Email" id="studentEmail" type="email" placeholder="Enter student email" />
            <InputField label="Student ID" id="studentId" type="text" placeholder="Enter student ID" />
            <Button text="Add Student" />
        </form>
    );
}

function AddTeacherForm() {
    return (
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <InputField label="Name" id="teacherName" type="text" placeholder="Enter teacher name" />
            <InputField label="Email" id="teacherEmail" type="email" placeholder="Enter teacher email" />
            <InputField label="Department" id="teacherDepartment" type="text" placeholder="Enter department" />
            <Button text="Add Teacher" />
        </form>
    );
}

function AddCourseForm() {
    const [sections, setSections] = useState([]);
    const [subjects, setSubjects] = useState([]);

    const addSection = () => setSections([...sections, '']);
    const addSubject = () => setSubjects([...subjects, '']);

    return (
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <InputField label="Course Name" id="courseName" type="text" placeholder="Enter course name" />
            <InputField label="Course Code" id="courseCode" type="text" placeholder="Enter course code" />

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Sections</label>
                {sections.map((section, index) => (
                    <InputField key={index} id={`section-${index}`} type="text" placeholder={`Section ${index + 1}`} />
                ))}
                <button type="button" onClick={addSection} className="mt-2 text-orange-500 hover:text-orange-700">
                    <FaPlusCircle className="inline mr-1" /> Add Section
                </button>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Subjects</label>
                {subjects.map((subject, index) => (
                    <InputField key={index} id={`subject-${index}`} type="text" placeholder={`Subject ${index + 1}`} />
                ))}
                <button type="button" onClick={addSubject} className="mt-2 text-orange-500 hover:text-orange-700">
                    <FaPlusCircle className="inline mr-1" /> Add Subject
                </button>
            </div>

            <Button text="Add Course" />
        </form>
    );
}

function InputField({ label, id, type, placeholder }) {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>
                {label}
            </label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id={id}
                type={type}
                placeholder={placeholder}
            />
        </div>
    );
}

function Button({ text }) {
    return (
        <button
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
        >
            {text}
        </button>
    );
}

