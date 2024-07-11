import { FaStar } from 'react-icons/fa';
export const StarRating = ({ name, rating, setRating, descriptions }) => {
    return (
        <div className="flex flex-col items-start space-y-2">
            <div className="flex items-center space-x-4 ">
                {
                    [...Array(5)].map((star, index) => {
                        const ratingValue = index + 1;
                        return (
                            <label key={index} className={`cursor-pointer hover:scale-125 transition-all ease-in-out ${ratingValue ? 'animate-none' : 'animate-pulse'}`}>
                                <input
                                    type="radio"
                                    name={name}
                                    value={ratingValue}
                                    onClick={() => setRating(name, ratingValue)}
                                    className="hidden"
                                />
                                <FaStar
                                    className= 'transition-colors duration-200 ease-in-out'  
                                    color={ratingValue <= rating ? "#FFA500" : "#e4e5e9"}
                                    size={30}
                                />
                            </label>
                        );
                    })
                }
            </div>
            {rating > 0 && (
                <p className="text-sm text-gray-600 mt-1">
                    {descriptions[name][rating - 1]}
                </p>
            )}
        </div>
    );
};