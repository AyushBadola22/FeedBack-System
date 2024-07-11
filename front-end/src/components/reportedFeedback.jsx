import { CommentBox } from "./commentBox";
export const ReportedFeedback = ({reportedFeedbacks}) => {
    return (
        <div className="w-full h-full flex flex-col justify-between items-center gap-7 mb-20">
      <h3 className="text-center font-bold underline underline-offset-4 text-7xl mt-5 text-primary mb-5">Reported</h3>
      <CommentBox></CommentBox>
            <CommentBox studentName={'Ayush Badola'} teacherName={'MR Abhishek Panthri'} commentData={'Bekar teacher hai'} ></CommentBox>
            <CommentBox></CommentBox>
            <CommentBox></CommentBox>
            <CommentBox></CommentBox>
            <CommentBox></CommentBox>
            <CommentBox></CommentBox>
            <CommentBox></CommentBox>
            
        </div>
    );
};

