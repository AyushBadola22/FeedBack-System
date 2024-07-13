
export const submitAllFeedbacks = async (feedbackArray) => {

    for (const feedback of feedbackArray) {
        try {
            console.log(feedback);
            const response = await fetch('http://localhost:3000/student/submitFeedback', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    student: feedback.student,
                    teacher: feedback.teacher,
                    course: feedback.course,
                    section: feedback.section,
                    interactivity: feedback.interactivity,
                    clarity: feedback.clarity,
                    fairness: feedback.fairness,
                    availability: feedback.availability,
                    engagement: feedback.engagement,
                    comment: feedback.comment,
                    preparedness: feedback.preparedness
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Feedback submitted successfully:', data);

        } catch (error) {
            console.log(error.message);
        }
    }
}

export const fetchFeedbacksOfSection = async (teacherID, sectionID) => {
    try {
        const response = await fetch('http://localhost:3000/teacher/getFeedbacksBySection', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                teacherID: teacherID,
                sectionID: sectionID
            })
        });

        if (!response.ok) {
            throw new Error("Error fetching data : ");
        }

        const data = await response.json();
        
        const feedbackSummary = {
            availability: 0,
            preparedness: 0,
            clarity: 0,
            fairness: 0,
            engagement: 0,
            interactivity: 0,
            totalFeedbacks: 0
        }
        if(data && data.length == 0) return feedbackSummary;
        for (let i = 0; i < data.length; i++) {
            feedbackSummary.availability += data[i].availability;
            feedbackSummary.preparedness += data[i].preparedness;
            feedbackSummary.clarity += data[i].clarity;
            feedbackSummary.fairness += data[i].fairness;
            feedbackSummary.engagement += data[i].engagement;
            feedbackSummary.interactivity += data[i].interactivity;
        }

        const length = data.length;

        feedbackSummary.availability /=length;
        feedbackSummary.preparedness /=length;
        feedbackSummary.clarity /=length;
        feedbackSummary.fairness /=length;
        feedbackSummary.engagement /=length;
        feedbackSummary.interactivity /=length;
        feedbackSummary.totalFeedbacks = length;
        return feedbackSummary;
    } catch (error) {
        console.log(error);
    }
} 

export const fetchFeedbacks = async (teacherID )=>{
    try {
        const response = await fetch(`http://localhost:3000/teacher/getFeedbacks/${teacherID}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        const feedbacks  = await response.json();
        const validFeedbacks = feedbacks.filter(feedback => feedback !== null);
        return validFeedbacks; 
    }catch(error){
        console.log(error);
    }
}