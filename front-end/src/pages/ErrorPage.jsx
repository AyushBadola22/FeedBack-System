import { Link } from 'react-router-dom';
import image from '../assets/cat.png';

export const ErrorPage = () => {
    return (
        <div className='container mx-auto px-4 h-screen flex flex-col justify-center items-center'>
            <div className='flex flex-col md:flex-row items-center justify-between gap-8'>
                <div className='text-center md:text-left'>
                    <h1 className='oswald font-bold md:text-[11rem] text-primary leading-none mb-4'>404</h1>
                    <h2 className='quatro md:text-5xl mb-4 uppercase'>Page not found</h2>
                    <p className='mb-6 text-lg text-justify'>
                        Cat is confused, maybe you entered the wrong link. <br />
                        Cat is saying if that if that is not the case then the link is broken. <br />   
                        Engineer Cat will fix it soon so stay tuned meow.
                    </p>

                    <div className='flex items-start'>
                        <Link to="/" className=' bg-primary text-white py-2 px-6 rounded-full hover:bg-opacity-80 transition duration-300 quatro text-xl -ml-2'>
                            To Instructions 
                        </Link>
                        
                        <Link to="/login" className=' bg-primary text-white py-2 px-6 rounded-full hover:bg-opacity-80 transition duration-300 quatro text-xl ml-5'>
                            To Log in Page 
                        </Link>
                        
                    </div>
                </div>
                <div className='mt-6 md:mt-0'>
                    <img className='object-contain h-72 md:h-96 sway-left-right' 
                         src={image} alt="Confused Cat" />
                </div>
            </div>
        </div>
    );
}