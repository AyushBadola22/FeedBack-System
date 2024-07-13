import { useState } from "react";

export const Comments = ({ studentName, dateAndTime, teacherName, commentData }) => {
    const handleName = () => {
        setShowName(!showName);
    }
    studentName = studentName || 'ayush',
        dateAndTime = dateAndTime || '12/12/12 on 12:12:21'
    teacherName = teacherName || 'Rahul Chauhan',
        commentData = commentData || 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio maiores dolorum quas libero et doloremque magni? Atque dolor enim cupiditate aspernatur mollitia. Earum itaque ad, commodi dolor qui nihil voluptatem?'

    const [showName, setShowName] = useState(false);
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



export const AnonymousComment = ({ commentData }) => {
    console.log("Data :     "+commentData);
    const [reported, setReported] = useState(false);
    const [showDialogueBox, setShowDialogueBox] = useState(false);

    if (!commentData) return null;

    const handleReportClick = () => {
        setShowDialogueBox(true);
    };

    const handleConfirmReport = () => {
        setReported(true);
        setShowDialogueBox(false);
        // Here you would typically call an API to report the comment
        // For example: reportCommentToAPI(commentData.id);
    };

    const handleCancelReport = () => {
        setShowDialogueBox(false);
    };

    return (
        <>
            <div className={`w-4/6 text-left px-5 bg-orange-100 shadow-lg border-2 border-orange-50 mt-7 ml-10 hover:scale-105 transition-all ease-in-out rounded-lg hover:border-primary ${reported && 'hidden'}`}>
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl mb-2 mt-3 font-mono font-bold text-gray-500">Anonymous</h1>
                    <button
                        className="text-sm bg-primary text-white rounded-xl px-3 py-1 -mt-2 mr-4"
                        onClick={handleReportClick}
                    >
                        {reported ? "Reported" : "Report"}
                    </button>
                </div>
                <p className="mb-3">{commentData.comment}</p>
            </div>

            {showDialogueBox && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
                    <div className="bg-white p-5 rounded-lg shadow-xl">
                        <h2 className="text-xl font-bold mb-4">Confirm Report</h2>
                        <p className="mb-4">Are you sure you want to report this comment?</p>
                        <div className="flex justify-end space-x-2">
                            <button
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                                onClick={handleCancelReport}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                onClick={handleConfirmReport}
                            >
                                Report
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};