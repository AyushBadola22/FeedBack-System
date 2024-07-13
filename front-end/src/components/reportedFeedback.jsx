import { Comments, AnonymousComment } from "./commentBox";
import { useState, useEffect } from 'react'
import { fetchFeedbacks } from "../services/submitFeedbacks";
export const ReportedFeedback = ({ reportedFeedbacks }) => {
    return (
        <div className="w-full h-full flex flex-col justify-between items-center gap-7 mb-20">
            <h3 className="text-center font-bold underline underline-offset-4 text-7xl mt-5 text-primary mb-5">Reported</h3>
            <Comments></Comments>
            <Comments studentName={'Ayush Badola'} teacherName={'MR Abhishek Panthri'} commentData={'Bekar teacher hai'} ></Comments>
            <Comments></Comments>
            <Comments></Comments>
            <Comments></Comments>
            <Comments></Comments>
            <Comments></Comments>
            <Comments></Comments>

        </div>
    );
};




export const Feedback = ({ teacherID }) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            const response = await fetchFeedbacks(teacherID);
            console.log(response);
            setComments(response);
        }
        fetchComments();
    }, [teacherID]);


    return (

        <div className="w-full h-full flex flex-col justify-between items-center gap-7 mb-20">
            <h3 className="text-center font-bold underline underline-offset-4 text-7xl mt-5 text-primary mb-5">Feedbacks</h3>
            {
                Array.isArray(comments) && comments.map((comment) => (
                    <AnonymousComment commentData={comment} key={comment.id} />
                ))
            }
        </div>
    );
}