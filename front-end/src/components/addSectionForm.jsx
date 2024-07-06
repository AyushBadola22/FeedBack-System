import React, { useState, useEffect } from 'react';


export const AddSectionForm = ({ closeSectionModel, courses }) => {

    const [errorOccured, setErrorOccured] = useState({
        errorStatus: false,
        message: ""
    });

    const [sectionData, setSectionData] = useState({
        sectionCode: "",
        semester: 0,
        courseId: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSectionData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(sectionData);
        setErrorOccured({
            errorStatus: false,
            message: ""
        });

        try {
            const response = await fetch(`http://localhost:3000/admin/${sectionData.courseId}/addSection`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sectionCode: sectionData.sectionCode,
                    semester: sectionData.semester
                })
            });


            if (!response.ok) {
                const errorData = await response.json();
                setErrorOccured({
                    errorStatus: true,
                    message: errorData.message
                });
            } else {
                closeSectionModel();
            }
        } catch (error) {
            setErrorOccured({
                errorStatus: true,
                message: "Failed to add section. Please try again."
            });
            console.error('Error adding section:', error);
        }
    };

    return (
        <>
            <div></div>
            <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center transition-all ease-in-out'>
                <div className='bg-white p-6 rounded-lg shadow-md w-full max-w-md'>
                    <form onSubmit={handleSubmit}>
                        <h2 className="text-2xl font-bold mb-4">Add New Section</h2>

                        {/* Course Dropdown */}
                        <div className="mb-4">
                            <label htmlFor="courseId" className="block text-sm font-medium text-gray-700">Select Course</label>
                            <select
                                id="courseId"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                                name='courseId'
                                required
                                onChange={handleChange}
                                value={sectionData.courseId}
                            >
                                <option value="">Select a course</option>
                                {courses.map(course => (
                                    <option key={course._id} value={course._id}>
                                        {course.courseName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Section Code */}
                        <div className="mb-4">
                            <label htmlFor="sectionCode" className="block text-sm font-medium text-gray-700">Section Code</label>
                            <input
                                type="text"
                                id="sectionCode"
                                className="px-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 outline-none"
                                name='sectionCode'
                                required
                                onChange={handleChange}
                                value={sectionData.sectionCode}
                            />
                        </div>

                        {/* Semester */}
                        <div className="mb-4">
                            <label htmlFor="semester" className="block text-sm font-medium text-gray-700">Semester</label>
                            <input
                                type="number"
                                id="semester"
                                className="px-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 outline-none"
                                required
                                name='semester'
                                onChange={handleChange}
                                value={sectionData.semester}
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-start space-x-2">
                            <button
                                onClick={closeSectionModel}
                                type="button"
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                            >
                                Add Section
                            </button>
                        </div>

                        {/* Error message */}
                        {errorOccured.errorStatus &&
                            <p className='font-bold mt-5 text-red-500 block w-full'>{errorOccured.message}</p>
                        }
                    </form>
                </div>
            </div>
        </>
    );
};