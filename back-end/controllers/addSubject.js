import mongoose from "mongoose";
import Course from "../model/courseModel.js";
import Subject from "../model/subjectSchema.js";

export const addSubjectToCourse = async (req, res) => {
    const { subjectName, code, semester } = req.body;
    const { courseID } = req.params;

    if (!mongoose.Types.ObjectId.isValid(courseID)) {
        return res.status(400).json({ message: "Invalid Course ID format." });
    }

    if (!subjectName || !code || !semester) {
        return res.status(400).json({ message: "Subject name, code, and semester are required." });
    }

    try {
        const course = await Course.findById(courseID);

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        const subjectExists = await Subject.findOne({ $or: [{ code }, { subjectName }] });
        if (subjectExists) {
            return res.status(400).json({ message: "Subject with this name or code already exists" });
        }

        
        const newSubject = new Subject({ subjectName, code, semester, course: courseID });
        await newSubject.save();

        if (!course.subjects) {
            course.subjects = [];
        }
        course.subjects.push(newSubject._id);
        await course.save();

        res.status(200).json({ message: "Subject added successfully", subject: newSubject });
        console.log("Subject added");

    } catch (error) {
        console.error("Error adding subject:", error);
        if (error.code === 11000) {
            res.status(400).json({ message: "Duplicate subject name or code" });
        } else {
            res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }
};