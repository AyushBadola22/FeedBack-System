import { NavBar } from "../components/navBar"
import { CourseTable } from "../components/courseTable"
import { useEffect, useState } from "react"
import { fetchCourses } from "../services/fetchCourses";
import { IoIosAddCircle } from "react-icons/io";
import { AddCourseForm } from "../components/addCourseForm";


export const AdminPage = () => {
    const [courses, setCourses] = useState([]);
    const [showModel , setShowModel] = useState(false)
    const closeModel = ()=> setShowModel(false); 
    const setModel = ()=> setShowModel(true); 

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

        getCourses();

        const intervalId = setInterval(getCourses, 60000);

        return () => clearInterval(intervalId);
    }, []);

 

    return <>
        <NavBar />
        <CourseTable courses={courses} />

        <div className="fixed bottom-8 left-10">
            <button onClick={setModel}
                className="shadow-lg bg-primary font-bold text-white rounded-full px-3 py-1 uppercase flex gap-2 text-xl justify-center items-center"
            >
                Add Course <IoIosAddCircle size={26} />
            </button>
        </div>

        {showModel && <AddCourseForm closeModel = {closeModel}/>}
    </>
} 
