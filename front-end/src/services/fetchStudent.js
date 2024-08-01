export const fetchStudent = async (uid) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_SERVER}/student/getStudentByID/${uid}`, {
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


export const fetchStudentByOID = async (id)=>{
    try {
        const response = await fetch(`${import.meta.env.VITE_SERVER}/admin/getStudentByOID/${id}`, 
            {
                credentials : 'include', 
                method : 'GET', 
                headers : {
                    'Content-Type' : 'application/json'
                }
            }
        )
        if(response.ok){
            return await response.json(); 
        }
        return {};
    } catch (error) {
        console.log(error);
    }
}