import config from '../config';
export const reportFeedback = async (feedbackID)=>{
    try {
        const response = await fetch(`${config.API_BASE_URL}/teacher/report`, {
            credentials : 'include', 
            method : "POST", 
            headers : {
                'Content-Type' : 'application/json'
            }, 
            body : JSON.stringify({
                feedbackID : feedbackID
            })
        })

        if(response.ok){
            console.log('reported successfully');
        }
    } catch (error) {
        console.log(error.message);
    }
    
} 