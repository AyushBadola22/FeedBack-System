import catImg from '../assets/cat4.png';
import { Rating } from '@smastrom/react-rating'

const Card = ({ className, name, subject, email }) => (
    <div className={`p-4 rounded-lg ${className}`}>
        <h2 className="text-2xl font-bold">{name}</h2>
        <p>{subject}</p>
        <p>{email}</p>
    </div>
);

const SectionCard = ({ ratings }) => (
    <div className="bg-background bg-opacity-40 p-4 rounded-lg shadow-lg border-gray-50 transition-all ease-in-out hover:scale-105 hover:border-primary hover:border-2">
        <p className='text-sm text-left mb-4 font-mono ml-5'>Average Ratings </p>
    
        <h2 className="text-2xl font-bold mb-4 bg-primary text-white inline-block px-2 py-2 ml-4 rounded-lg shadow-sm hover:border-white hover:border-2">
            Section {ratings.section}
        </h2>
        {
            ratings.summary.totalFeedbacks == 0 ? <p className='text-center font-mono font-bold text-primary'>No feedbacks yet</p>
                :
                <div className="grid grid-cols-3 gap-4 mx-5 " >
                    <div className="flex justify-between items-center">
                        <h3>Interactivity</h3>
                        <div className="flex items-center">
                            <Rating style={{ maxWidth: 100 }} readOnly orientation="horizontal" value={ratings.summary.interactivity} />
                            <span>({ratings.summary.interactivity.toFixed(1)})</span>
                        </div>
                    </div>
                    <div></div>
                    <div className="flex justify-between items-center">
                        <h3>Availability</h3>
                        <div className="flex items-center">
                            <Rating style={{ maxWidth: 100 }} readOnly orientation="horizontal" value={ratings.summary.availability} />
                            <span>({ratings.summary.availability.toFixed(1)})</span>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <h3>Fairness</h3>
                        <div className="flex items-center">
                            <Rating style={{ maxWidth: 100 }} readOnly orientation="horizontal" value={ratings.summary.fairness} />
                            <span>({ratings.summary.fairness.toFixed(1)})</span>
                        </div>
                    </div>
                    <div></div>
                    <div className="flex justify-between items-center">
                        <h3>Preparedness</h3>
                        <div className="flex items-center">
                            <Rating style={{ maxWidth: 100 }} readOnly orientation="horizontal" value={ratings.summary.preparedness} />
                            <span>({ratings.summary.preparedness.toFixed(1)})</span>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <h3>Clarity</h3>
                        <div className="flex items-center">
                            <Rating style={{ maxWidth: 100 }} readOnly orientation="horizontal" value={ratings.summary.clarity} />
                            <span>({ratings.summary.clarity.toFixed(1)})</span>
                        </div>
                    </div>
                    <div></div>
                    <div className="flex justify-between items-center">
                        <h3>Engagement</h3>
                        <div className="flex items-center">
                            <Rating style={{ maxWidth: 100 }} readOnly orientation="horizontal" value={ratings.summary.engagement} />
                            <span>({ratings.summary.engagement.toFixed(1)})</span>
                        </div>
                    </div>
                </div>
        }
        <p className='text-sm text-left mt-5 font-mono ml-5'>Total Feedbacks recorded - {ratings.summary.totalFeedbacks} </p>
    </div>
);

export const FeedbackSummary = ({ teacherData, ratingSummary }) => {
    if (!teacherData.section || teacherData.section.length === 0) {
        return (
            <div className="w-full h-full flex gap-5 justify-center items-center">
                <h1 className="mb-8 mt-8 text-center text-xl font-bold leading-none tracking-tight">
                    You are not assigned any section yet
                </h1>
                <img src={catImg} className='w-28' alt="" srcSet="" />
            </div>
        );
    }

    return (
        <div>
            <h1 className="mb-8 mt-8 text-center text-4xl font-bold underline text-primary leading-none tracking-tight md:text-5xl">
                Teacher Feedback Summary
            </h1>
            <div className="max-w-4xl mx-auto p-6 bg-orange-50 rounded-lg shadow-lg border-gray-50">
                <Card
                    className="bg-orange-500 shadow-lg text-white mb-6 hover:scale-105 transition-all ease-in-out"
                    name={teacherData.name}
                    subject={teacherData.subjectName}
                    email={teacherData.email}
                />

                <div className="space-y-6">
                    {Array.isArray(ratingSummary) && ratingSummary.map((ratings) => (
                        <SectionCard key={ratings.section} ratings={ratings} />
                    ))}
                </div>
            </div>
        </div>
    );
};