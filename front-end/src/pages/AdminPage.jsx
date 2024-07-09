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
import { StudentTable } from '../components/studentTable';
import Select from 'react-select';
import { AddStudentForm } from '../components/addStudentForm';
import { useNavigate , useLocation} from 'react-router-dom';

export const AdminPage = () => {

    const location = useLocation(); 
    const user = location.state || {};
    const {uid , role} = user; 
    console.log(role);
    const navigate = useNavigate()
    if(!user || role != 'superadmin' && role != 'admin'){
        navigate('/login'); 
    }   

    
    const [activeTab, setActiveTab] = useState('courses');
    const [courses, setCourses] = useState([]);
    const [teachers, setTeachersData] = useState([])
    const [students, setStudentsData] = useState([])

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
    const [selectedYear, setSelectedYear] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);

    const handleYearChange = (selectedOptions) => {
        setSelectedYear(selectedOptions);
        // if(selectedCourse){
        //     fetchStudents(selectedCourse.value, selectedOptions.value); 
        // }
    };

    const handleCourseChange = (selectedOption) => {
        setSelectedCourse(selectedOption);
        setSelectedYear(null);
    };

    //-------------------Student Tab Logic Ended --------------------//


    const getYears = (startYear) => {
        let years = [];
        if (!startYear) startYear = 2015;
        for (let year = startYear; year <= new Date().getFullYear(); year++) {
            years.push({ value: year, label: year.toString() });
        }
        return years;
    }


    // !  fetch teacher , students , courses here 

    
    const fetchStudents = async (courseID , year) => {
        console.log('fetching students');
        if(!courseID || !year ) return; 
        try {
            const response = await fetch(`http://localhost:3000/admin/getStudents/${courseID}/${year}`, {
                headers : {
                    'Content-Type' : 'application/json'
                }, 
                credentials : 'include'
            }); 
            console.log(response);
            if(!response.ok){
                console.log("Error fetching data");
                setStudentsData([]);
            }
            const data = await response.json(); 
            // console.log(data);
            setStudentsData(data); 
        } catch (error) {
            console.log('Error fetching students :'+error);
            setStudentsData([]); 
        }
    }


    useEffect(() => {
        const getCourses = async () => {
            console.log('fetching courses');
            try {
                const data = await fetchCourses();
                setCourses(data.courses || []);
            } catch (error) {
                console.error('Error fetching courses:', error);
                setCourses([]);
            }
        };

        const getTeachers = async () => {
            console.log("fetching teachers");
            try {
                const response = await fetchTeachers();
                // console.log("Response:", response);

                if (response) {
                    const teachersArray = response.map(teacher => ({
                        uid: teacher.uid,
                        name: teacher.name,
                        email: teacher.email,
                        section: teacher.sections || [],
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

        }
        else if (activeTab === 'students') {
            getCourses();
            console.log(courses);
            let coursesList = courses.map((course) => {
                return {
                    value: course._id,
                    label: course.courseName
                }
            })
            setCourses(coursesList);
            if(selectedYear && selectedCourse){
                fetchStudents(selectedCourse.value, selectedYear.value);
                console.log(students);
            }
        }

    }, [activeTab, showTeacherModel, selectedCourse, selectedYear /*showStudentModel*/]);


    // * All tabs that will be renderd if i click a button at nav bar.
    const renderContent = () => {   
        switch (activeTab) {
            case 'courses':
                return <CourseTable courses={courses} />;
            case 'students':
                return <StudentTable students={students || []}  />;
            case 'teachers':
                return <TeacherTable teachers={teachers} /*courses = {courses} */ />;
            case 'reported':
                return <h1>Reported table</h1>;
            default:
                return <CourseTable courses={courses} />;
        }
    };
    // * render ended ***************************************************

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


            {
                activeTab === 'students' &&
                <div>
                    <div className='fixed w-1/4 left-5 top-24'>
                        <div className='flex space-x-4'>
                            <Select
                                placeholder='Select Course'
                                id="selectedCourse"
                                onChange={handleCourseChange}
                                options={courses.map(course => ({ value: course._id, label: course.courseName }))}
                                value={selectedCourse}
                                noOptionsMessage={() => "No course has been added yet"}
                                className="shadow-md shadow-cyan-200 rounded-md  w-1/2 hover:ring-2 hover:border-cyan-300 hover:scale-105 transition-all ease-in-out duration-150 "
                            />
                            <Select
                                placeholder='Select Year'
                                id="selectedYear"
                                value={selectedYear}
                                options={getYears(2020)}
                                onChange={handleYearChange}
                                noOptionsMessage={() => "No year has been added yet"}
                                className="shadow-md shadow-cyan-200 rounded-md outline-none w-1/2 hover:ring-2 hover:border-cyan-300 hover:scale-105 transition-all ease-in-out duration-150  "
                            />
                        </div> {/* options , value , onChange  */}
                    </div>



                    <div className="fixed bottom-8 left-10 flex space-x-4">   
                        {/* Add Student Button */}
                        <button
                       
                            className="shadow-lg bg-primary font-bold text-white rounded-full px-3 py-1 uppercase flex gap-2 text-sm justify-center items-center hover:opacity-80 hover:bg-white hover:text-primary hover:ring-2 hover:ring-orange-400 ease-in-out transition-all hover:shadow-lg hover:delay-75"
                            onClick={showStudentForm}
                        >
                            Add Student <IoIosAddCircle className='hover:transform hover:transition-transform duration-75 hover:rotate-180 hover:scale-110' size={20} />
                        </button>
                    </div>
                </div>


            }


            {showCoursesModel && <AddCourseForm closeModel={closeModel} />}
            {showSectionModel && <AddSectionForm closeSectionModel={closeSectionForm} courses={courses} />}
            {showSubjectModel && <AddSubjectForm closeSubjectModel={closeSubjectForm} courses={courses} />}

            {showTeacherModel && <AddTeacherForm courses={courses} onCancel={hideTeacherForm} />}

            {showStudentModel && <AddStudentForm onCancel={hideStudentForm}/>}
        </>
    );
}