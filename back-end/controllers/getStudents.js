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
        console.error("Error adding subject:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}; 