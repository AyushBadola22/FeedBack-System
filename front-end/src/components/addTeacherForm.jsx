import { useState, useEffect } from 'react';
import Select from 'react-select';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


export const AddTeacherForm = ({ courses, onCancel }) => {
    const [teacherData, setTeacherData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        subjectID: "",
        sections: [] ,
        courseID : ""
    });

    const [selectedCourse, setSelectedCourse] = useState(null);
    const [availableSections, setAvailableSections] = useState([]);
    const [availableSubjects, setAvailableSubjects] = useState([]);

    const [error, setError] = useState({
        status: false,
        message: false
    })
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTeacherData(prev => ({ ...prev, 
            [name]: name === 'name' ? value.toUpperCase() : value
         }));
    };

    const handleCourseChange = (selectedOption) => {
        console.log(selectedOption.value);
        setSelectedCourse(selectedOption);
        setTeacherData(prev => ({ ...prev, subjectID: "", sections: [] , courseID : selectedOption.value}));
        setAvailableSubjects([]);
        setAvailableSections([]);
    };

    const handleSubjectChange = (selectedOption) => {        
        setTeacherData(prev => ({ ...prev, subjectID: selectedOption.value }));
    };

    const handleSectionChange = (selectedOptions) => {
        setTeacherData(prev => (
            {
                ...prev,
                sections: selectedOptions.map(option => option.value)
            }
        ));
    };

    const handleSubmit = async (e) => {
        console.log(selectedCourse);
        e.preventDefault();
        console.log(teacherData);
        if (teacherData.confirmPassword !== teacherData.password)
            return setError({ status: true, message: 'Both password does not match. ' })
        if (!selectedCourse) {
            return setError({ status: true, message: 'No course selected' })
        }
        if (!teacherData.subjectID) {
            return setError({ status: true, message: 'No subject selected.' })
        }
        setError({ status: false, message: "" });
        console.log(teacherData);
        try {
            const response = await fetch(`http://localhost:3000/create/teacher`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials : 'include',
                body: JSON.stringify({
                    name: teacherData.name,
                    email: teacherData.email,
                    password: teacherData.password,
                    subjectID: teacherData.subjectID,
                    sections: teacherData.sections || [], 
                    courseID : teacherData.courseID
                })
            });


            if (!response.ok) {
                setSelectedCourse(null)
                setAvailableSubjects([])
                setAvailableSections([])
                const errorData = await response.json();
                setError({
                    status: true,
                    message: errorData.message
                });
            } else {
                setError({ status: false, messgae: "" });
                onCancel();
            }
        } catch (error) {
            setError({
                status: true,
                message: "Failed to add section. Please try again."
            });
            console.error('Error adding section:', error);
        }
    };

    useEffect(() => {
        if (selectedCourse) {
            const fetchData = async () => {
                try {
                    const courseID = selectedCourse.value;
                    const sectionsResponse = await fetch(`http://localhost:3000/admin/${courseID}/getSections`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': "application/json"
                        }, 
                        credentials : 'include',
                    });


                    const subjectsResponse = await fetch(`http://localhost:3000/admin/${courseID}/getSubjects`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': "application/json"
                        }, 
                        credentials : 'include', 
                    })


                    const sectionsData = await sectionsResponse.json();
                    const subjectsData = await subjectsResponse.json();

                    if (!sectionsData.sections || !Array.isArray(sectionsData.sections)) {
                        console.warn('No sections in this course:', sectionsData);
                        setAvailableSections([]);
                    } else {
                        let sectionList = [];

                        sectionsData.sections.forEach((section) => {
                            sectionList.push({
                                value: section._id,
                                label: `${section.sectionCode} Sem-${section.semester}`
                            });
                        });
                        sectionList.sort((a, b) => a.label.localeCompare(b.label));
                        setAvailableSections(sectionList)
                    }

                    if (!subjectsData.subjects || !Array.isArray(subjectsData.subjects)) {
                        console.log('Invalid subjects data:', subjectsData);
                        setAvailableSubjects([]);
                    } else {
                        let subjectList = [];
                        subjectsData.subjects.map(subject => {
                            subjectList.push({
                                value: subject._id,
                                label: `${subject.name}-Sem-${subject.semester}`
                            })
                        });
                        subjectList.sort((a, b) => a.label.localeCompare(b.label));
                        setAvailableSubjects(subjectList);
                    }

                } catch (error) {
                    console.log('Error fetching data:', error);
                }
            };

            fetchData();
            setTeacherData(prev => ({ ...prev, 
                courseID : selectedCourse.value
            }));
        }
    }, [selectedCourse]);

    //******************************************************************************* */
    /// frontend part *****************************************************************
    return (
        <>
            <div className='fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex justify-center items-center transition-all ease-in-out'>
                <div className='bg-white p-6 rounded-lg shadow-md w-full max-w-md'>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                autoComplete='off'
                                value={teacherData.name}
                                onChange={handleInputChange}
                                className="uppercase mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-400
                                focus:ring-offset-4 outline-none px-2 "
                                required
                            />
                        </div>

                        {/* email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                autoComplete='off'
                                type="email"
                                id="email"
                                name="email"
                                value={teacherData.email}
                                onChange={handleInputChange}
                                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-400
                                focus:ring-offset-4 outline-none px-2"
                                required
                            />
                        </div>


                        {/* password */}
                        <div className='relative'>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={teacherData.password}
                                    onChange={handleInputChange}
                                    className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-400 focus:ring-offset-4 outline-none px-2 pr-10"
                                    required
                                />
                                <div
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                </div>
                            </div>
                        </div>

                        <div className='relative'>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={teacherData.confirmPassword}
                                    onChange={handleInputChange}
                                    className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-400 focus:ring-offset-2 outline-none px-2 pr-10 "
                                    required
                                />
                                <div
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                </div>
                            </div>
                        </div>

                        {/* course */}
                        <div>
                            <label htmlFor="course" className="block text-sm font-medium text-gray-700">Department</label>
                            <Select
                                id="course"
                                options={courses.map(course => ({ value: course._id, label: course.courseName }))}
                                onChange={handleCourseChange}
                                value={selectedCourse}
                                className="mt-2"
                            />
                        </div>

                        {/* sections */}
                        <div>
                            <label htmlFor="sections" className="block text-sm font-medium text-gray-700">Assigned Sections </label>
                            <Select
                                id="sections"
                                isMulti
                                options={availableSections}
                                noOptionsMessage={() => "No sections has been created yet"}
                                maxMenuHeight={145}
                                onChange={handleSectionChange}
                                value={teacherData.sections.map(id => availableSections.find(s => s.value === id))}
                                // it shows options avaialble
                                // user chooses option and it must be included in state
                                className="mt-2"
                            />
                        </div>

                        {/*  subjects */}
                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Assigned Subject </label>
                            <Select
                                id="subject"
                                maxMenuHeight={120}
                                options={availableSubjects}
                                noOptionsMessage={() => "No subject has been added to the course yet"}
                                onChange={handleSubjectChange}
                                value={teacherData.subjectID ? availableSubjects.find(s => s.value === teacherData.subjectID) : null}
                                className="mt-2"
                                isDisabled={!selectedCourse}
                            />
                        </div>
                        <div className="flex justify-between items-center mt-4">
                            <p className="text-red-500 font-bold text-sm">
                                {error.status && `${error.message}`}
                            </p>
                            <div className="flex space-x-2">
                                <button
                                    type="button"
                                    onClick={onCancel}
                                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 text-sm"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="shadow-lg bg-primary font-bold text-white rounded-lg px-3 py-1 text-sm justify-center items-center hover:opacity-80 hover:bg-white hover:text-primary hover:ring-2 hover:ring-orange-400 ease-in-out transition-all hover:shadow-lg hover:delay-75"
                                >
                                    Add Teacher
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};