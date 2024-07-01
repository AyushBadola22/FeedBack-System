import { useNavigate } from 'react-router-dom';
import logo from './../assets/gehuLogo.png'
import cat from './../assets/cat2.jpeg'

export const HomePage = () => {

    const navigate = useNavigate();
    const handleClick = ()=>{
        console.log("clicked");
        navigate('login'); 
    }

    return <div className='bg-slate-200 scroll-smooth'>

        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg ">

            {/* Logo */}
            <div className='flex justify-center mb-3 mt-4'>
                <img src={logo} alt="" className='w-60 ' />
            </div>

            <h1 className="text-4xl font-bold mt-10  mb-6 text-center bg-primary text-white rounded-xl p-2 outline-double oswald shadow-lg uppercase text-stroke">Instructions</h1>

            {/* Instructions inside it */}
            <section className="mb-8 quatro">
                <h2 className="text-3xl font-semibold mb-4 text-gray-900 underline underline-offset-4">Rating System</h2>
                <p className="mb-4 text-md ">Rating system uses a scale from 1 to 5:</p>
                <ul className="list-disc pl-6 mb-4 text-md">
                    <li><strong>1 - Poor:</strong> Significant improvement needed</li>
                    <li><strong>2 - Fair:</strong> Below average, needs improvement</li>
                    <li><strong>3 - Average:</strong> Meets basic expectations</li>
                    <li><strong>4 - Good:</strong> Above average performance</li>
                    <li><strong>5 - Excellent:</strong> Outstanding performance</li>
                </ul>
            </section>

            <section className="mb-8 quatro">
                <h2 className="text-3xl font-semibold mb-4 text-gray-900  underline underline-offset-4">Feedback Categories</h2>
                <p className="mb-4 text-md">You'll be asked to rate your teachers in several categories, including:</p>
                <ul className="list-disc pl-6 mb-4 text-md">
                    <li>Interactivity in class</li>
                    <li>Ability to engage students</li>
                    <li>Clarity of explanations</li>
                    <li>Preparedness for lessons</li>
                    <li>Fairness in grading</li>
                    <li>Availability for help outside class</li>
                </ul>
            </section>

            <section className="mb-8 quatro">
                <h2 className="text-3xl underline underline-offset-4 font-semibold mb-4 text-gray-900">Guidelines for Responsible Feedback</h2>
                <ul className="list-disc pl-6 mb-4 text-md">
                    <li>Be honest and objective in your ratings</li>
                    <li>Provide constructive criticism, not personal attacks</li>
                    <li>Avoid offensive language or inappropriate comments</li>
                    <li>Rate based on the entire semester, not just recent events</li>
                    <li>Consider both strengths and areas for improvement</li>
                    <li>If you give a low rating, explain why in the comments</li>
                </ul>
            </section>

            <section className="mb-8 quatro">
                <h2 className="text-3xl underline underline-offset-4  font-semibold mb-4 text-gray-900">Important Notes</h2>
                <ul className="list-disc pl-6 mb-4">
                    <li>Your feedback is anonymous, but can be traced if reported for abuse</li>
                    <li>You need at least 75% attendance in a subject to provide feedback</li>
                    <li>Feedback is used to improve teaching quality, so be thoughtful</li>
                    <li>If you experience technical issues, contact the IT support team</li>
                </ul>
            </section>

        
            <p className="text-gray-600 italic text-left flex-1 md:mt-1 ">
                Remember, your feedback helps improve the learning experience for everyone. 
                <br />Thank you for taking the time to provide thoughtful and constructive feedback!
            </p>
            
            <div className='flex items-center justify-center gap-6 space-x-8 mt-8'>
                <button 
                    onClick={handleClick} 
                    className='rounded-md quatro font-extrabold text-xl bg-primary text-white px-8 py-3 hover:bg-opacity-90 transition duration-300'
                >
                    <a href="/login"> Log in</a>
                </button>

                <img src={cat} alt="cat image" className='w-40 md:-mt-6 object-cover sway-left-right' />
            </div>
        </div>
    </div>
};

