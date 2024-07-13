import FeedBack from '../model/feedbackModel.js'

export const getFeedbacks = async (req, res) => {
    try {
        const {teacherID} = req.params;
        console.log(teacherID);
        const feedbacks = await FeedBack.find({status : 'submitted' , teacher : teacherID}); 
        const validFeedbacks = feedbacks.map((feedback)=>{
            if( feedback.comment && feedback.comment.length) {
                return {
                    comment : feedback.comment, 
                    id : feedback._id 
                }
            } 
        })
        res.status(200).json(validFeedbacks); 
    } catch (error) {
        console.error("Error getting feedbacks:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}; 

export const getReportedFeedback = async (req, res) => {
    try {
        const feedbacks = await FeedBack.find({status : 'reviewed'}); 
        res.status(200).json(feedbacks); 
    } catch (error) {
        console.error("Error getting feedbacks:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}; 


export const getFeedbacksOfSection = async (req, res) => {
    try {
        const {teacherID , sectionID} = req.body
        const feedbacks = await FeedBack.find({section : sectionID , teacher : teacherID}); 
        res.status(200).json(feedbacks || []); 

    } catch (error) {
        res.status(500).json({message : 'Internal error : '+error.message});    
    }
}