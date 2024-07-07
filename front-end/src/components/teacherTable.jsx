export const TeacherTable = ({ teachers }) => {
  // console.log(teachers);
  return (
    <div className="overflow-x-auto">
      <h3 className="text-center font-bold underline underline-offset-4 text-7xl mt-5 text-primary mb-5">Teachers</h3>
      <table className="min-w-full text-center text-md font-light">
        <thead
          className="border-b bg-primary font-medium text-white">
          <tr className="uppercase">
            {/* Row  headings */}
            <th scope="col" className=" px-6 py-4 border-2 border-gray">UID</th>
            <th scope="col" className=" px-6 py-4 border-2 border-gray">Name</th>
            <th scope="col" className=" px-6 py-4 border-2 border-gray">Mail id</th>
            <th scope="col" className=" px-6 py-4 border-2 border-gray">Subject</th>
            <th scope="col" className=" px-6 py-4 border-2 border-gray">Sections</th>
          </tr>
        </thead>
        <tbody>
          {(!teachers || teachers.length == 0) ? (
            <tr>
              <td colSpan={5} className="px-6 py-4 whitespace-nowrap text-center font-bold text-primary">Nothing here yet</td>
            </tr>
          ) : (
            teachers.map((teacher, index) => (
              <tr key={index} className="bg-gray-50" >
                <td className="whitespace-normal  border-2 border-l-orange-900 px-6 py-4 font-medium">{teacher.uid}</td>
                <td className="whitespace-normal  border-2 border-l-orange-900 px-6 py-4">{teacher.name}</td>
                <td className="whitespace-normal  border-2 border-l-orange-900 px-6 py-4">{teacher.email}</td>
                <td className="whitespace-normal  border-2 border-l-orange-900 px-6 py-4">{teacher.subject.name}</td>
                <td className="whitespace-normal border-2 px-6 py-4">{teacher.section && teacher.section.length > 0
                  ? teacher.section.map(sec => sec.name).join(" , ")
                  : "Not assigned yet"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

    </div>
  );
};

