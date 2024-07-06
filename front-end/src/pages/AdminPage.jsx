import { useState, useEffect } from 'react';
import { NavBar } from "../components/navBar";
import { CourseTable } from "../components/courseTable";
import { IoIosAddCircle } from "react-icons/io";
import { AddCourseForm } from "../components/addCourseForm";
import { fetchCourses } from "../services/fetchCourses";
import { AddSectionForm } from '../components/addSectionForm';
import { AddSubjectForm } from '../components/addSubject';
import { TeacherTable } from '../components/teacherTable';
import { fetchTeachers } from '../services/fetchTeachers';
import { AddTeacherForm } from '../components/addTeacherForm';

export const AdminPage = () => {

    const [activeTab, setActiveTab] = useState('courses');
    const [courses, setCourses] = useState([]);
    const [teachers, setTeachersData] = useState([])

    //-------------------------------------------------------------------//
    // ---------------   Courses Tab logic -----------------------------//
    const [showCoursesModel, setShowModel] = useState(false);
    const [showSectionModel, setSectionModel] = useState(false);
    const [showSubjectModel, setSubjectModel] = useState(false);


    const closeModel = () => setShowModel(false);
    const setModel = () => setShowModel(true);
    const showSubjectForm = () => setSubjectModel(true);
    const closeSubjectForm = () => setSubjectModel(false);
    const showSectionForm = () => setSectionModel(true);
    const closeSectionForm = () => setSectionModel(false);

    useEffect(() => {
        const getCourses = async () => {
            try {
                const data = await fetchCourses();
                setCourses(data.courses || []);
            } catch (error) {
                console.error('Error fetching courses:', error);
                setCourses([]);
            }
        };

        const getTeachers = async () => {
            try {
                const response = await fetchTeachers();
                console.log("Response:", response);

                if (response) {
                    const teachersArray = response.map(teacher => ({
                        uid: teacher.uid,
                        name: teacher.name,
                        email: teacher.email,
                        section: teacher.section || [],
                        subject: teacher.subject,
                        _id: teacher._id
                    }));
                    setTeachersData(teachersArray);
                } else {
                    setTeachersData([]);
                }
            } catch (error) {
                console.error('Error fetching teachers:', error);
                setTeachersData([]);
            }
        };

        if (activeTab === 'courses') {
            getCourses();
            const intervalId = setInterval(getCourses, 60000);
            return () => clearInterval(intervalId);
        } else if (activeTab === 'teachers') {
            getTeachers();
            getCourses();
            const intervalId = setInterval(getCourses, 60000);
            return () => clearInterval(intervalId);
        }
    }, [activeTab]);

    //---------------------- Course Tab Logic Ended --------------------//


    //-------------------------------------------------------------------//
    // ---------------   Teacher Tab logic -----------------------------//
    const [showTeacherModel, setTeacherModel] = useState(false);
    const showTeacherForm = () => setTeacherModel(true);
    const hideTeacherForm = () => setTeacherModel(false);

    //-------------------Teacher Tab Logic Ended --------------------//
   
    //-------------------------------------------------------------------//
    // ---------------   Student Tab logic -----------------------------//
    const [showStudentModel, setStudentModel] = useState(false);
    const showStudentForm = () => setStudentModel(true);
    const hideStudentForm = () => setStudentModel(false);
    //-------------------Student Tab Logic Ended --------------------//

    const renderContent = () => {
        switch (activeTab) {
            case 'courses':
                return <CourseTable courses={courses} />;
            case 'students':
                return <h1>StudentTable</h1>;
            case 'teachers':
                return <TeacherTable courses={courses} teachers={teachers} />;
            case 'reported':
                return <h1>Reported table</h1>;
            default:
                return <CourseTable courses={courses} />;
        }
    };

    return (
        <>
            <NavBar setActiveTab={setActiveTab} activeTab={activeTab} />
            {renderContent()}


            {/* Courses tab on the admin page */}
            {activeTab === 'courses' &&
                <div className="fixed bottom-8 left-10 flex space-x-4">
                    {/* Add course */}
                    <button
                        onClick={setModel}
                        className="shadow-lg bg-primary font-bold text-white rounded-full px-3 py-1 uppercase flex gap-2 text-sm justify-center items-center hover:opacity-80 hover:bg-white hover:text-primary hover:ring-2 hover:ring-orange-400 ease-in-out transition-all hover:shadow-lg hover:delay-75"
                    >
                        Add Course <IoIosAddCircle className='hover:transform hover:transition-transform duration-75 hover:rotate-180 hover:scale-110' size={20} />
                    </button>

                    {/* Add section */}
                    <button
                        onClick={showSectionForm}
                        className="shadow-lg bg-primary font-bold text-white rounded-full px-3 py-1 uppercase flex gap-2 text-sm justify-center items-center hover:opacity-80 hover:bg-white hover:text-primary hover:ring-2 hover:ring-orange-400 ease-in-out transition-all hover:shadow-lg hover:delay-75"
                    >
                        Add Section <IoIosAddCircle className='hover:transform hover:transition-transform duration-75 hover:rotate-180 hover:scale-110' size={20} />
                    </button>

                    {/* Add subject */}
                    <button
                        onClick={showSubjectForm}
                        className="shadow-lg bg-primary font-bold text-white rounded-full px-3 py-1 uppercase flex gap-2 text-sm justify-center items-center hover:opacity-80 hover:bg-white hover:text-primary hover:ring-2 hover:ring-orange-400 ease-in-out transition-all hover:shadow-lg hover:delay-75"
                    >
                        Add Subject <IoIosAddCircle className='hover:transform hover:transition-transform duration-75 hover:rotate-180 hover:scale-110' size={20} />
                    </button>
                </div>
            }


            {/* *********************************************************
                Teachers tab on the admin page 
            **********************************************************/}
            {
                activeTab === 'teachers' &&
                <div className="fixed bottom-8 left-10 flex space-x-4">
                    {/* Add Teacher */}
                    <button
                        onClick={showTeacherForm}
                        className="shadow-lg bg-primary font-bold text-white rounded-full px-3 py-1 uppercase flex gap-2 text-sm justify-center items-center hover:opacity-80 hover:bg-white hover:text-primary hover:ring-2 hover:ring-orange-400 ease-in-out transition-all hover:shadow-lg hover:delay-75"
                    >
                        Add teacher <IoIosAddCircle className='hover:transform hover:transition-transform duration-75 hover:rotate-180 hover:scale-110' size={20} />
                    </button>
                </div>

            }

            {showCoursesModel && <AddCourseForm closeModel={closeModel} />}
            {showSectionModel && <AddSectionForm closeSectionModel={closeSectionForm} courses={courses} />}
            {showSubjectModel && <AddSubjectForm closeSubjectModel={closeSubjectForm} courses={courses} />}

            {showTeacherModel && <AddTeacherForm courses={courses} onCancel={hideTeacherForm} /> }

        </>
    );
}