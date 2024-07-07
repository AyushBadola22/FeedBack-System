import Teacher from "../model/teacherModel.js";

export const getTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find(); 
        if(!teachers.sections){
            teachers.sections = []
        }

        let teachersData = teachers
        .sort((a,b)=> a.uid.localeCompare(b.uid))
        .map(teacher => ({
            uid : teacher.uid, 
            name : teacher.name,
            email : teacher.email,
            subject : teacher.subject,
            sections : teacher.section,            
            _id : teacher._id
        }));

        

        res.status(200).json({ teachers: teachersData }); 
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal error" }); 
    }
}
