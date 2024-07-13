import { Comment, AnonymousComment } from "./commentBox";
import { useState, useEffect } from 'react'
import { fetchFeedbacks } from "../services/submitFeedbacks";
import catIMg from '../assets/cat4.png'


export const ReportedFeedback = ({ reportedFeedbacks }) => {

    return (
        <div className="w-full h-full  mb-20">
            <h3 className="text-center font-bold underline underline-offset-4 text-7xl mt-5 text-primary mb-5">Reported</h3>

                {
                    Array.isArray(reportedFeedbacks) && reportedFeedbacks.length ?  
                    <div className="flex flex-col justify-between items-center gap-7">
                        {
                            reportedFeedbacks.map((feedback)=> <Comment  studentName={feedback.studentName} date={feedback.date} teacherName={feedback.teacherName} comment={feedback.comment} key={feedback.id}/>)
                        }
                    </div> : <div className=" -mt-5 text-xl font-mono font-bold flex justify-center items-center ">No reported feedbacks yet
                         <img src={catIMg} className="w-32 sway-left-right" alt="" /></div>
                }

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
        <div>
            {
                comments.length ? (
                    <div className="w-full h-full flex flex-col justify-between items-center gap-7 mb-20">
                        <h3 className="text-center font-bold underline underline-offset-4 text-7xl mt-5 text-primary mb-5">Feedbacks</h3>
                        {
                            Array.isArray(comments) && comments.map((comment) => (
                                <AnonymousComment commentData={comment} key={comment.id} />
                            ))
                        }
                    </div>
                ) : (
                    <div className="flex justify-center items-center gap-3 mt-10">
                        <img src={catIMg} className="w-32 sway-left-right -mt-3" alt="" />
                        <h3 className="font-mono font-bold ">No feedback comments yet </h3>
                    </div>
                )
            }

        </div>
    );
}