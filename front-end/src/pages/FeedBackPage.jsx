import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card } from '../components/Card';
import { StarRating } from '../components/StarRating';
import { fetchTeachersByID } from '../services/fetchTeachers';
import catImg from '../assets/cat3.jpeg'
import { submitAllFeedbacks } from '../services/submitFeedbacks';



export const FeedbackPage = () => {


    // states
    const navigate = useNavigate();
    const location = useLocation();

    const [responseGiven, setResponseGiven] = useState(false);
    const [studentDetails, setStudentDetails] = useState({});
    const [teachers, setTeachers] = useState([]);
    const [currentTeacherIndex, setCurrentTeacherIndex] = useState(0);
    const [feedback, setFeedback] = useState({
        interactivity: -1,
        engagement: -1,
        preparedness: -1,
        fairness: -1,
        availability: -1,
        clarity: -1,
        comment: '',
        teacher: ''
    });
    const [feedbackArray, setFeedbackArray] = useState([]);
    const [error, setError] = useState({
        status: false,
        message: ''
    });
    const [feedbackSubmitted, setIsFeedbackSubmitted] = useState(false);
    const descriptions = {
        interactivity: [
            "No interaction",
            "Minimal interaction",
            "Some interaction",
            "Good interaction",
            "Very interactive"
        ],
        engagement: [
            "Not engaging",
            "Slightly engaging",
            "Moderately engaging",
            "Engaging",
            "Very engaging"
        ],
        preparedness: [
            "Unprepared",
            "Slightly prepared",
            "Moderately prepared",
            "Well prepared",
            "Very well prepared"
        ],
        fairness: [
            "Unfair",
            "Somewhat fair",
            "Moderately fair",
            "Fair",
            "Very fair"
        ],
        availability: [
            "Unavailable",
            "Rarely available",
            "Sometimes available",
            "Often available",
            "Very available"
        ],
        clarity: [
            "Unclear",
            "Poorly Clear",
            "Moderately Clear",
            "Well Clear",
            "Very Clear"
        ]
    };


    //************************************************************* */

    useEffect(() => {

        const fetchTeachers = async () => {
            const { studentData, teacherArray, cookieData } = location.state || {};
            if (!cookieData || cookieData.role != 'student') {
                navigate('/login')
                return;
            }

            const studentID = studentData.student;
            const submitted = await feedbackGiven(studentID);
            if (!submitted) {
                setIsFeedbackSubmitted(true);
            }
            setStudentDetails({
                studentID: studentData.student,
                teacherID: "",
                sectionID: studentData.section.id,
                courseID: studentData.course
            });

            const fetchByID = async (teacherID) => {
                const teacher = await fetchTeachersByID(teacherID);
                Promise.resolve(teacher);
                return {
                    name: teacher.name,
                    subject: teacher.subject.name,
                    id: teacher._id
                }
            }

            const teacherDetails = teacherArray.map(async (teacherid) => {
                return fetchByID(teacherid);
            })
            setTeachers(await Promise.all(teacherDetails));
        }

        const feedbackGiven = async (id) => {
            const response = await fetch(`${import.meta.env.VITE_SERVER}/student/feedbackGIven/${id}`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "GET",
                credentials: 'include'
            });
            setResponseGiven(response.ok)
            return response.ok;
        }

        fetchTeachers();

    }, [])

    //************************************************************************************ */


    const handleRatingChange = (name, value) => {
        setFeedback(prev => ({ ...prev, [name]: value }));
    };

    // Submit the feedbacks through the services 
    const handleSubmit = (e) => {
        e.preventDefault();
        setError({ status: false, message: "" });

        const { interactivity, availability, engagement, fairness, preparedness } = feedback;
        if (interactivity < 0 || availability < 0 || engagement < 0 || fairness < 0 || preparedness < 0) {
            setError({ status: true, message: "Please rate all the fields" });
            return;
        }

        const updatedFeedback = {
            ...feedback,
            teacher: teachers[currentTeacherIndex].id,
            student: studentDetails.studentID,
            section: studentDetails.sectionID,
            course: studentDetails.courseID
        };

        // Use spread operator to create a new array with the added feedback
        const updatedFeedbackArray = [...feedbackArray, updatedFeedback];
        setFeedbackArray(updatedFeedbackArray);

        if (currentTeacherIndex === teachers.length - 1) {
            setIsFeedbackSubmitted(true);
            submitAllFeedbacks(updatedFeedbackArray);
            return;
        }

        setFeedback({
            interactivity: -1,
            engagement: -1,
            preparedness: -1,
            fairness: -1,
            availability: -1,
            clarity: -1,
            comment: '',
            teacher: ''
        });
        setCurrentTeacherIndex(currentTeacherIndex + 1);
    };


    const handleLogOut = async (e) => {
        const response = await fetch(`${import.meta.env.VITE_SERVER}/logout`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });

        console.log(await response.json());
        navigate('/login')
    }
    // TODO : check that user have given the feedback or not.  Timer 

    return (
        <div className="w-full min-h-screen bg-orange-50 py-8">
            {
                feedbackSubmitted ? <div>
                    <div className={`gap-4 rounded-xl shadow-sm p-6 mb-5 flex justify-center quatro font-extrabold`}>
                        <div className="bg-accent p-5 space-y-2  rounded-lg flex justify-between items-center flex-col ">
                            <p className="text-[22px] flex gap-2 text-center">Thanks for your response. <br />Your feedback has been submitted. </p>
                            <img src={catImg} alt="img" className='rounded-full w-1/2 mb-6 border-primary border-2 sway-left-right hover:scale-90' />
                            <button
                                className='relative mt-3 bg-primary rounded-lg px-3 py-2 text-xl text-white hover:bg-white hover:border-2 hover:border-primary hover:text-primary transition-all ease-in-out'
                                onClick={handleLogOut}
                            >Log Out</button>
                        </div>
                    </div>
                </div> :
                    <div className='max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg'>
                        <h1 className="mb-8 text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl">
                            FEEDBACK <span className="px-2 text-white bg-orange-500 rounded-md">FORM</span>
                        </h1>

                        {(teachers && teachers.length && currentTeacherIndex < teachers.length) ? <form onSubmit={handleSubmit}
                            className="space-y-8 bg-white rounded-lg">

                            <Card
                                className="bg-orange-100"
                                name={teachers[currentTeacherIndex].name}
                                subject={teachers[currentTeacherIndex].subject}
                            />

                            {Object.keys(descriptions).map((category) => (
                                <div key={category} className="space-y-3">
                                    <label className="block capitalize text-lg font-semibold text-gray-700">{category}</label>

                                    <StarRating
                                        name={category}
                                        rating={feedback[category]}
                                        setRating={handleRatingChange}
                                        descriptions={descriptions}
                                    />
                                </div>
                            ))}


                            {/* Feedback area  */}
                            <div className="space-y-2 ">
                                <label className="block text-lg font-semibold text-gray-700">Additional Comments</label>
                                <textarea
                                    name="comment"
                                    className="w-full p-3 border border-orange-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                    rows="4"
                                    placeholder="Please provide any additional feedback here..."
                                    value={feedback.comment}
                                    onChange={(e) => setFeedback(prev => ({ ...prev, comment: e.target.value }))}
                                ></textarea>
                            </div>

                            {
                                error.status && <p className='text-red-500 font-bold'>{error.message}</p>
                            }
                            <div className="flex justify-between items-center">
                                <p className="text-sm text-gray-600">
                                    Teacher {currentTeacherIndex + 1} of {teachers.length}
                                </p>
                                <button
                                    type="submit"
                                    className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors"
                                >
                                    {currentTeacherIndex < teachers.length - 1 ? 'Next Teacher' : 'Submit All Feedback'}
                                </button>
                            </div>
                        </form> : <p className='text-center'>{teachers.length === 0 ? 'There are no teachers' : 'Thanks for feedback'}</p>
                        }
                    </div>
            }
        </div>
    );
};


