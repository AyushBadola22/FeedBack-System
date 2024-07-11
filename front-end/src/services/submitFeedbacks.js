
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