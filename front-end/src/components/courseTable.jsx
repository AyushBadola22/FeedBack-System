export const CourseTable = ({ courses }) => {
  return (
    <div className="overflow-x-auto">
      <h3 className="text-center font-bold underline underline-offset-4 text-7xl mt-5 text-primary mb-5">Courses</h3>
     <table className="min-w-full text-center text-md font-light">
        <thead
          className="border-b bg-primary font-medium text-white">
          <tr className="">
            <th scope="col" className=" px-6 py-4">Course Name</th>
            <th scope="col" className=" px-6 py-4">Total Semesters</th>
            <th scope="col" className=" px-6 py-4">Total Subjects</th>
            <th scope="col" className=" px-6 py-4">Total Sections</th>
          </tr>
        </thead>
        <tbody>
          {courses.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-6 py-4 whitespace-nowrap text-center">Nothing here yet</td>
            </tr>
          ) : (
            courses.map((course, index) => (
              <tr key={index} className="bg-gray-50" >
                <td className="whitespace-nowrap  border-2 border-l-orange-900 px-6 py-4 font-medium">{course.courseName}</td>
                <td className="whitespace-nowrap  border-2 border-l-orange-900 px-6 py-4">{course.semester}</td>
                <td className="whitespace-nowrap  border-2 border-l-orange-900 px-6 py-4">{(course.subjects) ? course.subjects.length : 0}</td>
                <td className="whitespace-nowrap border-2 px-6 py-4">{(course.sections) ? course.sections.length : 0}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

    </div>
  );
};

