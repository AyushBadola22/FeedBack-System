import Student from "../model/studentModel.js";

export const getStudents = async (req, res) => {
    try {
        const { courseID, yearOfJoining } = req.params;

        const students = await Student.find({
            'course.id': courseID,
            yearOfJoining: yearOfJoining
        }).select('uid name email section yearOfJoining semester');

        if (!students || students.length === 0) {
            return res.status(200).json([]);
        }
        res.status(200).json(students);
    } catch (error) {
        console.error("Error adding student:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}; 

// by uid
export const getStudentByID = async (req, res) => {
    try {
        const {uid} = req.params;

        const student = await Student.find({uid}).select('uid name email section yearOfJoining semester')

        if (!student || !student.length) {
            return res.status(200).json("No such student exists");
        }
        // console.log(student);
        res.status(200).json(student);
    } catch (error) {
        console.error("Error getting student:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}; 

export const getStudentByOID = async (req, res)=>{
    try {
        console.log('Finding the student here');
        const {id} = req.params; 

        const student = await Student.findById(id); 
        if(!student){
            return res.status(404).json({message : "Student not found"}); 
        }
        res.status(200).json({name : student.name, uid : student.uid}); 
    } catch (error) {
        res.status(500).json("Internal error"); 
    }
}