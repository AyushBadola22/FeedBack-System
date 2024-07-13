import config from '../config';
export const fetchSection = async (id) => {
    try {
        const response = await fetch(`${config.API_BASE_URL}/student/getSectionByID/${id}`, {
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
        return data; 
        
    } catch (error) {
        console.error('Error fetching courses:', error.message);
        throw error;
    }
};


