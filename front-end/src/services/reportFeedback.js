export const reportFeedback = async (feedbackID)=>{
    try {
        const response = await fetch(`${import.meta.env.VITE_SERVER}/teacher/report`, {
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