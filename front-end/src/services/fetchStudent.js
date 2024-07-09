export const fetchStudent = async (uid) => {
    try {
        const response = await fetch(`http://localhost:3000/student/getStudentByID/${uid}`, {
            method : 'GET', 
            headers: {
                'Content-Type': 'application/json',
            },
            credentials : 'include'
        });
        if(!response.ok){
            throw new Error('Error fetching the courses');
        }
        const data = await response.json();
        return data[0];
    } catch (error) {
        console.error('Error fetching courses:', error.message);
        throw error;
    }
};
