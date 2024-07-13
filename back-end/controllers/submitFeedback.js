import Feedback from '../model/feedbackModel.js'
import Student from '../model/studentModel.js';

export const submitFeedback = async (req, res) => {
    const { student, teacher, section, course, interactivity, engagement, clarity, preparedness, fairness, availability, comment } = req.body
    const studentExists = await Student.findByIdAndUpdate(student,
        { $set: { "feedbackGiven.status": true } }, 
        { new : true}
    );
    try {
        const feedback = new Feedback({ student, teacher, section, course, interactivity, engagement, clarity, preparedness, fairness, availability, comment });
        await feedback.save();
        res.status(200).json("Feedback submitted")
    } catch (error) {
        console.log('Internal error occured  : ' + error.message);
    }
}



// to check whether the user has already given the feedback or not 
export const feedbackGiven = async (req, res) => {
    const { studentID } = req.params;
    try {
        console.log(studentID);
        const student = await Feedback.findOne({ student: studentID });
        if (student) {
            return res.status(400).json({ message: "The student have already given the feedback", status: 'submitted' });
        }
        res.status(200).status(200).json({ status: 'not submitted' });
    } catch (error) {
        res.status(500).json({ errormessage: "Internal error : " + error.message })
    }
}
