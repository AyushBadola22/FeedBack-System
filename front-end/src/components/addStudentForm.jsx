import { useState, useEffect } from 'react';
import Select from 'react-select';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { fetchCourses } from '../services/fetchCourses';

export const AddStudentForm = ({ onCancel }) => {
    const [studentData, setStudentData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        section: "",
        semester: 1,
        yearOfJoining: (new Date().getFullYear())
    });

    const [availableSections, setAvailableSections] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedSemester, setSelectedSemester] = useState(null);

    const [availableSemesters, setAvailableSemester] = useState([]);
    const [error, setError] = useState({
        status: false,
        message: false
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        const loadCourses = async () => {
            try {
                const coursesData = await fetchCourses();
                const formattedCourses = coursesData.courses.map(course => ({
                    value: course._id,
                    label: course.courseName,
                    semesters: course.semester
                }));
                setCourses(formattedCourses);
            } catch (error) {
                console.error('Error loading courses:', error);
                setError({ status: true, message: 'Failed to load courses' });
            }
        };

        loadCourses();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStudentData(prev => ({ ...prev,
             [name]: name === 'name' ? value.toUpperCase() : value}));
    };

    const handleSemesterChange = (selectedOption) => {
        setStudentData(prev => ({ ...prev, semester: selectedOption.value }))
        setSelectedSemester(selectedOption)
    };



    const handleCourseChange = (selectedOption) => {
        setSelectedCourse(selectedOption);
        setStudentData(prev => ({ ...prev, section: "" }));
        setAvailableSections([]);
        setSelectedSemester(null);

        let semesterOptions = [];
        for (let i = 1; i <= selectedOption.semesters; i++) {
            semesterOptions.push({ value: i, label: `Semester ${i}` });
        }

        setAvailableSemester(semesterOptions);
    };


    const handleSectionChange = (selectedOption) => {
        setStudentData(prev => ({
            ...prev,
            section: selectedOption.value
        }));
    };

    useEffect(() => {
        if (selectedCourse && selectedSemester) {
            const fetchSections = async () => {
                try {
                    const sectionsResponse = await fetch(`http://localhost:3000/admin/${selectedCourse.value}/getSections`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': "application/json"
                        }
                    });


                    const sectionsData = await sectionsResponse.json();
                    if (!sectionsData.sections || !Array.isArray(sectionsData.sections)) {
                        console.warn('No sections in this course:', sectionsData);
                        setAvailableSections([]);
                    } else {
                        let sectionList = sectionsData.sections
                            .filter(section => section.semester === selectedSemester.value) // Filter by selected semester
                            .map(section => ({
                                value: section._id,
                                label: `${section.sectionCode}`
                            }));
                        sectionList.sort((a, b) => a.label.localeCompare(b.label));
                        setAvailableSections(sectionList);
                    }
                } catch (error) {
                    console.log('Error fetching sections:', error);
                    setError({ status: true, message: 'Failed to fetch sections' });
                }
            };

            fetchSections();
        }

    }, [selectedCourse, selectedSemester]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (studentData.confirmPassword !== studentData.password)
            return setError({ status: true, message: 'Both passwords do not match.' });
        if (!selectedCourse) {
            return setError({ status: true, message: 'No course selected' });
        }
        if (!studentData.section) {
            return setError({ status: true, message: 'No section selected.' });
        }
        setError({ status: false, message: "" });

        try {
            const response = await fetch(`http://localhost:3000/create/student`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: studentData.name,
                    email: studentData.email,
                    password: studentData.password,
                    courseID: selectedCourse.value,
                    sectionID: studentData.section,
                    semester: studentData.semester,
                    yearOfJoining: studentData.yearOfJoining
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError({
                    status: true,
                    message: errorData.message
                });
            } else {
                setError({ status: false, message: "" });
                onCancel();
            }
        } catch (error) {
            setError({
                status: true,
                message: "Failed to add student. Please try again."
            });
            console.error('Error adding student:', error);
        }
    };


    //******************************************************************************* */
    /// frontend part *****************************************************************
    return (
        <>
            <div className='fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex justify-center items-center transition-all ease-in-out'>
                <div className='bg-white p-6 rounded-lg shadow-md w-full max-w-md'>
                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                autoComplete='off'
                                value={studentData.name}

                                onChange={handleInputChange}
                                className="uppercase mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-400
                                focus:ring-offset-4 outline-none px-2 "
                                required
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                autoComplete='off'
                                type="email"
                                id="email"
                                name="email"
                                value={studentData.email}
                                onChange={handleInputChange}
                                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-400
                                focus:ring-offset-4 outline-none px-2"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className='relative'>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={studentData.password}
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

                        {/* Confirm password */}
                        <div className='relative'>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={studentData.confirmPassword}
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


                        {/* Select Course */}
                        <div>
                            <label htmlFor="course" className="block text-sm font-medium text-gray-700">Course</label>
                            <Select
                                isSearchable
                                id="course"
                                options={courses}
                                value={selectedCourse}
                                onChange={handleCourseChange}
                                className="mt-2"
                            />
                        </div>

                        {/* Select Semester */}
                        <div>
                            <label htmlFor="semester" className="block text-sm font-medium text-gray-700">Semester</label>
                            <Select
                                id="semester"
                                options={availableSemesters || []}
                                noOptionsMessage={() => 'Semester has not been defined for the course yet.'}
                                value={selectedSemester}
                                isDisabled={!selectedCourse}
                                maxMenuHeight={500}
                                onChange={handleSemesterChange}
                                className="mt-2 "
                            />
                        </div>

                        {/* Select Section */}
                        <div>
                            <label htmlFor="section" className="block text-sm font-medium text-gray-700">Assign a Section</label>
                            <Select
                                isDisabled={!selectedCourse || !selectedSemester}
                                id="section"
                                options={availableSections}
                                placeholder={(availableSections && availableSections.length > 0 && 'Select Section') || 'No sections exist'}
                                noOptionsMessage={() => "No sections exist for this semseter in the course."}
                                onChange={handleSectionChange}
                                value={(availableSections && availableSections.find(sec => sec.value === studentData.section) || null)}
                                className="mt-2"
                            />
                        </div>

                        {/* Years of joining */}
                        <div>
                            <label htmlFor="yearOfJoining" className="block text-sm font-medium text-gray-700">Year Of Joining</label>
                            <input
                                type="number"
                                id="yearOfJoining"
                                name="yearOfJoining"
                                autoComplete='off'
                                value={studentData.yearOfJoining}
                                onChange={handleInputChange}
                                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-400
                                focus:ring-offset-4 outline-none px-2 "
                                required
                            />
                        </div>

                        {/* Error message  */}
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
                                    Add Student to {selectedCourse ? selectedCourse.label : 'Course'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};