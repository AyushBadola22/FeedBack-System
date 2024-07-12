import { act, useEffect, useState } from "react";
import { NavBarTeacher } from "../components/navBarTeacher";
import { FeedbackSummary,  } from "../components/feedbackSummary";
import {Feedback } from '../components/reportedFeedback'
import { useLocation, useNavigate } from "react-router-dom";
import { fetchTeachersByUID } from "../services/fetchTeachers";
import {fetchFeedbacksOfSection} from '../services/submitFeedbacks'
// Fallback Card component


export const TeacherPage = () => {
    const location = useLocation(); 
    const navigate =  useNavigate()
    const [teacher , setTeacher] = useState({
        name : '' , email : '' , section : [] , subjectName : '', id : ''
    })
    const [activeTab, setActiveTab] = useState('summary');
    const [ratingSummary , setRatingsummary] = useState({
        availability : 0 , 
        preparedness : 0 , 
        clarity : 0, 
        engagement : 0 , 
        interactivity : 0 , 
        fairness : 0 , 
        totalFeedbacks : 0
    });

    const renderContent = () => {
        switch (activeTab) {
            case 'summary':
                return <FeedbackSummary teacherData={teacher} ratingSummary={ratingSummary} />
            case 'comments':
                return <Feedback teacherID={teacher.id}/>
            default:
                return <h1>Summary Tab</h1>
        }
    }

    useEffect(() => {
        const fetchTeacher = async () => {
            const { uid, role } = location.state || {};
            
            if (!role || role !== 'teacher') {
                navigate('/login');
            }
            
            const teacherResponse = await fetchTeachersByUID(uid); 
            const {name , email , section, subject , _id} = teacherResponse; 
            const teacherData = {
                name : name , email : email , section : section , subjectName : subject.name, id : _id
            };
            setTeacher(teacherData);

            const sectionsRatings = []     

            for(let i = 0 ; i<section.length; i++){
                const response = await fetchFeedbacksOfSection(_id , section[i].id); 
                sectionsRatings.push({
                    section : section[i].name, 
                    summary : response
                }); 
            }
            // const feedbackResponse = await fetchFeedbacksOfSection(_id , section[0].id); 
            

            const updatedSummary = [...sectionsRatings , sectionsRatings]; 
            setRatingsummary(sectionsRatings, updatedSummary);
        };

        fetchTeacher();
    }, [location , navigate ]);

    return (
        <>
            <NavBarTeacher setActiveTab={setActiveTab} activeTab={activeTab} />

            {renderContent()}
        </>
    );
};