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


export const fetchTeachersByID = async(id) =>{
    try {
        const response = await fetch(`http://localhost:3000/student/getTeacherByID/${id}`, {
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json', 
            }, 
            credentials : 'include'
        })
        if(!response.ok){
            console.log('failed to fetch teacher');
            return ;
        }
        const data = await response.json(); 
        return data ;
    } catch (error) {
        console.error(error.message);
    }
}

export const fetchTeachersOfCourse = async(id) => {
    try {
        
        const response = await fetch(`http://localhost:3000/admin/getTeachersByCourse/${id}`, {
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json', 
            }, 
            credentials : 'include'
        });
        console.log(response);
        const data = await response.json(); 
        console.log(data);
        if(!response.ok){
            console.log('failed to fetch teacher');
            return ;
        }
        console.log('Data is ...............', data);
        return data;        
    } catch (error) {
        console.error(error.message);
    }
}

export const fetchTeachersByUID = async(uid) =>{
    try {
        const response = await fetch(`http://localhost:3000/teacher/getTeacherByUID/${uid}`, {
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json', 
            }, 
            credentials : 'include'
        })
        if(!response.ok){
            console.log('failed to fetch teacher');
            return null;
        }
        const data = await response.json(); 
        return data ;
    } catch (error) {
        console.error(error.message);
    }
}