
export const fetchCourses = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_SERVER}/admin/allCourses`, {
            method : 'GET', 
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        if(!response.ok){
            throw new Error('Error fetching the courses');
        }
        
        const data = await response.json();
        // console.log("Data  : "+JSON.stringify(data));
        return data;
    } catch (error) {
        console.error('Error fetching courses:', error.message);
        throw error;
    }
};
