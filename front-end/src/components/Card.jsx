export const Card = ({ name, subject, course, className })=> {
    return (
        <div className={`flex gap-4 rounded-xl shadow-sm p-6 mb-5 ${className}`}>
            <div className="space-y-2 text-justify">
                <h3 className="text-[22px] flex gap-2">Name : <p className='font-extrabold'>{name}</p></h3>
                <h3 className="text-[22px] flex gap-2">Subject : <p className='font-extrabold'>{subject}</p></h3>
                <h3 className="text-[22px] flex gap-2">Course : <p className='font-extrabold'>{course}</p></h3>
            </div>
        </div>
    );
}
