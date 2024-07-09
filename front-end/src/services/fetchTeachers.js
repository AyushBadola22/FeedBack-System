export const fetchTeachers = async () => {
    try {
        const response = await fetch('http://localhost:3000/admin/getTeachers', {
            method : 'GET', 
            headers: {
                'Content-Type': 'application/json',
            },
            credentials : 'include'
        });
        if(!response.ok){
            throw new Error('Error fetching the courses');
        }
        
        let data = await response.json();
        return data.teachers; 
        
    } catch (error) {
        console.error('Error fetching courses:', error.message);
        throw error;
    }
};


export const fetchTeachersOfSection = async() =>{
    try {
        const response = await fetch('https')
    } catch (error) {
        
    }
}
