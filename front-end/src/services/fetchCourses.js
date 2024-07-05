export const fetchCourses = async () => {
    try {
        const response = await fetch('http://localhost:3000/courses/allCourses', {
            method : 'GET', 
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(!response.ok){
            throw new Error('Error fetching the courses');
        }
        
        const data = await response.json();
        console.log("Data  : "+JSON.stringify(data));
        return data;
    } catch (error) {
        console.error('Error fetching courses:', error.message);
        throw error;
    }
};
