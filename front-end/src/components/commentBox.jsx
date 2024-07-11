import { useState } from "react";

export const CommentBox = ({studentName , dateAndTime , teacherName, commentData})=>{
    const handleName = ()=>{
        setShowName(!showName); 
    }
    studentName = studentName || 'ayush', 
    dateAndTime = dateAndTime  || '12/12/12 on 12:12:21'
    teacherName = teacherName || 'Rahul Chauhan', 
    commentData = commentData || 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio maiores dolorum quas libero et doloremque magni? Atque dolor enim cupiditate aspernatur mollitia. Earum itaque ad, commodi dolor qui nihil voluptatem?'

    const [showName , setShowName] = useState(false); 
    return (
        <div className=" w-4/6 text-left px-5 bg-orange-100 shadow-lg border-2 border-orange-50 mt-7 ml-10 hover:scale-105 transition-all ease-in-out rounded-lg hover:border-primary ">
            <div>
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl mb-2 mt-3 font-mono font-bold text-gray-500">{showName ? studentName : 'Anonymous'}</h1>
                    <button 
                    className=" text-sm bg-primary text-white rounded-xl px-3 py-1 -mt-2 mr-4"
                    onClick={handleName}
                    > {showName ? "Hide Name" : "Show Name"}</button>

                </div>
            </div>
            
            <p className="mb-3">{commentData}</p>

            <div className="text-sm mt-5 mb-2 flex justify-between font-bold text-gray-600 mr-5"> 
                <p className="">{dateAndTime}</p>
                <p className="">{teacherName}</p>
            </div>
        </div>
    );
}
