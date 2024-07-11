import FeedBack from '../model/feedbackModel.js'

export const getFeedbacks = async (req, res) => {
    try {
        const feedbacks = await FeedBack.find({status : 'submitted'}); 
        res.status(200).json(feedbacks); 
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
