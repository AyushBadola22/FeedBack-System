import { useNavigate } from "react-router-dom";

export const NavBarTeacher = ({ setActiveTab, activeTab }) => {
    const navigate = useNavigate();
    const logout = async ()=>{
        console.log('logging out');
        const response = await fetch(`${import.meta.env.VITE_SERVER}/logout`, {
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
                    <h1 className="font-bold text-3xl">Teacher Dashboard</h1>
                </div>

                <ul className='flex space-x-4 transition-all ease-in-out'>
                    <li>
                        <button 
                            onClick={() => setActiveTab('summary')}
                            className={`flex items-center font-bold px-3 py-1 rounded-full shadow-sm ${activeTab === 'summary' ? 'bg-white text-primary ring-2 ring-orange-500' : 'bg- bg-primary text-white'}  hover:opacity-85 transition-all ease-in-out delay-75 hover:shadow-lg`}
                        >
                            <h3>Feedback Summary</h3>
                        </button>
                    </li>
                    <li>
                        <button 
                            onClick={() => setActiveTab('comments')}
                            className={`flex items-center font-bold px-3 py-1 rounded-full shadow-sm ${activeTab === 'comments' ? 'bg-white text-primary ring-2 ring-orange-500' : 'bg- bg-primary text-white'}  hover:opacity-85  transition-all ease-in-out delay-75 hover:shadow-lg`}
                        >
                            <h3>Feedback Comments</h3>
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