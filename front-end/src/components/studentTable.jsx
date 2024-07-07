import Select from 'react-select'
export const StudentTable = ({ students }) => {

    console.log(students);

    return (
        <>

            <div className="overflow-x-auto">
                <h3 className="text-center font-bold underline underline-offset-4 text-7xl mt-5 text-primary mb-5">Students</h3>
                <table className="min-w-full text-center text-md font-light">
                    <thead
                        className="border-b bg-primary font-medium text-white">
                        <tr className="uppercase">
                            {/* Row  headings */}
                            <th scope="col" className=" px-6 py-4 border-2 border-gray">UID</th>
                            <th scope="col" className=" px-6 py-4 border-2 border-gray">Name</th>
                            <th scope="col" className=" px-6 py-4 border-2 border-gray">Mail id</th>
                            <th scope="col" className=" px-6 py-4 border-2 border-gray">Section</th>
                            <th scope="col" className=" px-6 py-4 border-2 border-gray">Semester</th>
                            <th scope="col" className=" px-6 py-4 border-2 border-gray">Batch</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(!students || students.length === 0) ? (
                            <tr>
                                <td colSpan={5}
                                className= 'fixed left-1/2 transform -translate-x-1/2 w-80 h-64 text-center font-bold text-primary mt-5'>
                                    Nothing here yet. <br />Make sure 'course' and 'batch' is chosen
                                </td>
                            </tr>
                        ) : (
                            students.map((student, index) => (
                                <tr key={index} className="bg-gray-50" >
                                    <td className="whitespace-normal  border-2 border-l-orange-900 px-6 py-4 font-medium">{student.uid}</td>
                                    <td className="whitespace-normal  border-2 border-l-orange-900 px-6 py-4">{student.name}</td>
                                    <td className="whitespace-normal  border-2 border-l-orange-900 px-6 py-4">{student.email}</td>
                                    <td className="whitespace-normal  border-2 border-l-orange-900 px-6 py-4">{student.section.code}</td>
                                    <td className="whitespace-normal border-2 px-6 py-4">{`Semester  ${student.semester}`} </td>
                                    <td className="whitespace-normal border-2 px-6 py-4">{student.yearOfJoining} </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

            </div>
        </>
    );
};

