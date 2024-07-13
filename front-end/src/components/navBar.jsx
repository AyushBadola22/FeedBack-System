import { useNavigate } from 'react-router-dom';
import { FaUsers, FaUserGraduate, FaChalkboardTeacher, FaBook } from 'react-icons/fa';
import config from '../config';


export const NavBar = ({ setActiveTab, activeTab }) => {
    const navigate = useNavigate();
    const logout = async ()=>{
        console.log('logging out');
        const response = await fetch(`${config.API_BASE_URL}/logout`, {
            credentials : 'include', 
            method : "GET", 
            headers : {
                'Content-Type' : 'application/json'
            }
        })
        if(response.ok){
            navigate('/login');
        }
    }
    return (
        <nav className="sticky top-0 bg-background text-primary shadow-md z-10">
            <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
               
                <div>
                    <h1 className="font-bold text-3xl">Admin Dashboard</h1>
                </div>

                <ul className='flex space-x-4'>
                    <li>
                        <button 
                            onClick={() => setActiveTab('courses')}
                            className={`flex items-center font-bold px-3 py-1 rounded-full shadow-sm ${activeTab === 'courses' ? 'bg-white text-primary ring-2 ring-orange-500' : 'bg- bg-primary text-white'}  hover:opacity-85 hover:scale-110 transition-all ease-in-out delay-75 hover:shadow-lg`}
                        >
                            <FaBook className="mr-2" />
                            <h3>Courses</h3>
                        </button>
                    </li>
                    <li>
                        <button 
                            onClick={() => setActiveTab('students')}
                            className={`flex items-center font-bold px-3 py-1 rounded-full shadow-sm ${activeTab === 'students' ? 'bg-white text-primary ring-2 ring-orange-500' : 'bg- bg-primary text-white'}  hover:opacity-85  hover:scale-110 transition-all ease-in-out delay-75 hover:shadow-lg`}
                        >
                            <FaUserGraduate className="mr-2" />
                            <h3>Students</h3>
                        </button>
                    </li>
                    <li>
                        <button 
                            onClick={() => setActiveTab('teachers')}
                            className={`flex items-center font-bold px-3 py-1 rounded-full shadow-sm ${activeTab === 'teachers' ? 'bg-white text-primary ring-2 ring-orange-500' : 'bg- bg-primary text-white'}  hover:opacity-85  hover:scale-110 transition-all ease-in-out delay-75 hover:shadow-lg`}
                        >
                            <FaChalkboardTeacher className="mr-2" />
                            <h3>Teachers</h3>
                        </button>
                    </li>
                    <li>
                        <button 
                            onClick={() => setActiveTab('reported')}
                            className={`flex items-center font-bold px-3 py-1 rounded-full shadow-sm ${activeTab === 'reported' ? 'bg-white text-primary ring-2 ring-orange-500' : 'bg- bg-primary text-white'}  hover:opacity-85  hover:scale-110 transition-all ease-in-out delay-75 hover:shadow-lg`}
                        >
                            <FaUsers className="mr-2" />
                            <h3>Reported</h3>
                        </button>
                    </li>
                    <li>
                        <button 
                            onClick={logout}
                            className='flex items-center font-bold px-3 py-1 rounded-full shadow-sm text-white bg-primary hover:opacity-85  transition-all ease-in-out delay-75 hover:shadow-lg'
                        >
                            <h3>Logout</h3>
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
}