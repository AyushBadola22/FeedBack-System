import Course from "../model/courseModel.js";
import mongoose from "mongoose";

export const addSubjectToCourse = async (req, res) => {
    const { name, code, semester } = req.body;
    const courseID = req.params.courseID;

    if (!mongoose.Types.ObjectId.isValid(courseID)) {
        return res.status(400).send( "Invalid course ID format" );
    }

    try {
        const course = await Course.findById(courseID);
        
        if (!course) {
            return res.status(404).send("Course not found" );
        }

        if (!course.subjects) {
            course.subjects = [];
        }

        const subjectExists = course.subjects.some(subject => 
            subject.name === name || subject.code === code
        );

        if (subjectExists) {
            return res.status(400).send( "Subject with the same name or code already exists in the course");
        }

        const newSubject = { name, code, semester };
        course.subjects.push(newSubject);

        await course.save();

        console.log("Subject added");
        res.status(200).send("Subject added successfully");

    } catch (error) {
        console.error("Error adding subject:", error);
        res.status(500).send("Internal server error");
    }
};