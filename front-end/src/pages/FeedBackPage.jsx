import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card } from '../components/Card';
import { StarRating } from '../components/StarRating';


// TODO : Understand how it works 
// TODO : Teacher 1 out of 0 , fix this 
// TODO : Make a teacher array with details and pass to feedback form 
// TODO : pass the studentData and teacherArray and use it to map the differnt names 
// TODO : Send feedback to the frontend





export const FeedbackPage = () => {
    const location = useLocation();
    const { studentData, teacherArray } = location.state || {};

    console.log(studentData, teacherArray);
    const [teachers, setTeachers] = useState([]);
    const [currentTeacherIndex, setCurrentTeacherIndex] = useState(0);
    const [feedback, setFeedback] = useState({
        interactivity: -1,
        engagement: -1,
        preparedness: -1,
        fairness: -1,
        availability: -1,
        comment: ''
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState({
        status : false , 
        message : ''
    });

    const navigate = useNavigate();



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
        ]
    };



    const handleRatingChange = (name, value) => {
        setFeedback(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e)=>{
        e.preventDefault(); 
        setError({status : false , message : ""})
        const {interactivity, availability , engagement,fairness, preparedness} = feedback; 
        if(interactivity < 0 || availability < 0 || engagement < 0 || fairness < 0 || preparedness < 0){
            setError({status : true , message : "Please rate all the fields"})
            return ; 
        }
        console.log(feedback);
    }

    return (
        <div className="w-full min-h-screen bg-orange-50 py-8">
            <div className='max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg'>
                <h1 className="mb-8 text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl">
                    FEEDBACK <span className="px-2 text-white bg-orange-500 rounded-md">FORM</span>
                </h1>
              
                <form onSubmit={handleSubmit} 
                className="space-y-8 bg-white rounded-lg">
                    <Card
                        className="bg-orange-100"
                        name='name'
                        subject='subject'
                        course='course'
                    />

                    {Object.keys(descriptions).map((category) => (
                        <div key={category} className="space-y-3">
                            <label className="block capitalize text-lg font-semibold text-gray-700">{category}</label>
                            <StarRating
                                name={category}
                                rating={feedback[category]}
                                setRating={handleRatingChange}
                                descriptions = {descriptions}
                            />
                        </div>
                    ))}

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
                </form>
            </div>
        </div>
    );
};