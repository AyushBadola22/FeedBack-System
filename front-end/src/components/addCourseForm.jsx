import React, { useState } from 'react';

export const AddCourseForm = ({closeModel}) => {
    const [errorOccured , setError] = useState({
        errorStatus : false, 
        message : ""
    });

    const [courseData , setCourseData] = useState({
        courseName : "", 
        duration : 0
    });

    const handleChange = (e)=>{
        const {name , value} = e.target; 

        setCourseData(prevData => ({
            ...prevData, 
            [name] : value
        }))
    }

    const handleSubmit = async (e)=>{
        e.preventDefault(); 
        setError({
            errorStatus : false , 
            errorMessage : "" 
        });
        console.log(courseData);
        try {
            const response = await fetch('http://localhost:3000/courses/addCourse',{
                method : 'POST', 
                headers : {
                    'Content-Type' : 'application/json'
                }, 
                body : JSON.stringify(courseData)
            }); 

            if(!response.ok){
                setError({
                    errorStatus : true, 
                    message : response.json()
                })
            }
            closeModel();
        } catch (error) {
            setError({
                errorStatus : true  , 
                message : error.message
            }); 
            console.log(errorOccured)
        }

    }

    return (
        <>
            {/* Background overlay */}
            <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center'>
                {/* Form container */}
                <div className='bg-white p-6 rounded-lg shadow-md w-full max-w-md'>
                    <form onSubmit={handleSubmit}>
                        <h2 className="text-2xl font-bold mb-4">Add New Course</h2>
                        
                        {/* Course name */}
                        <div className="mb-4">
                            <label htmlFor="courseName" className="block text-sm font-medium text-gray-700">Course Name</label>
                            <input
                                type="text"
                                id="courseName"
                                className="px-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 outline-none"
                                name='courseName'
                                required
                                onChange={handleChange}
                                value={courseData.courseName}
                            />
                        </div>
    
                        {/* Total Semester Duration */}
                        <div className="mb-4">
                            <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Total Semester Duration</label>
                            <input
                                type="number"
                                id="duration"
                                className="px-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 outline-none"
                                required
                                name='duration'
                                onChange={handleChange}
                                value={courseData.duration}
                            />
                        </div>
                        
                        {/* Buttons */}
                        <div className="flex justify-start space-x-2">
                            <button
                                onClick={closeModel}
                                type="button"
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit" 
                                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                            >
                                Add Course
                            </button>
                        </div>
    
                        {/* Error message */}
                        {errorOccured.errorStatus && 
                            <p className='font-bold mt-5 text-red-500 block w-full'>Something went Wrong</p>
                        }
                    </form>
                </div>
            </div>
        </>
    )
};