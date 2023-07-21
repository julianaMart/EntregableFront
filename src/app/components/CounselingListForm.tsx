import { useEffect, useState } from 'react';

interface Counseling {
    date: string | null;
    advisor: Advisor;
    student: Student;
  }
  
  interface Advisor {
    name: string;
    // Add more properties specific to the advisor if needed
  }
  
  interface Student {
    name: string;
    // Add more properties specific to the student if needed
  }

const CounselingTable = () => {
  const [counselings, setCounselings] = useState<Counseling[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8181/counselings');
        const data = await response.json();

        const counselingData = [];
        for (const counseling of data._embedded.counselings) {
          const advisorResponse = await fetch(counseling._links.advisor.href);
          if (!advisorResponse.ok) {
            continue
          }
          
          
          const advisorData = await advisorResponse.json();

          console.log(advisorData);

          const studentResponse = await fetch(counseling._links.student.href);
          const studentData = await studentResponse.json();
          

          counselingData.push({
            advisor: advisorData,
            student: studentData,
            date: counseling.date,
          });
        }

        setCounselings(counselingData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <><table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">Doctor Name</th>
          <th scope="col" className="px-6 py-3">Pacient Name</th>
          <th scope="col" className="px-6 py-3">Appointment Date</th>
        </tr>
      </thead>
      <tbody>
        {counselings.map((counseling, index) => (
          <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700" key={index}>
            <td className="px-6 py-4">{counseling.advisor.name}</td>
            <td className="px-6 py-4">{counseling.student.name}</td>
            <td className="px-6 py-4">{counseling.date}</td>
          </tr>
        ))}
      </tbody>
    </table><br></br><a href="/counseling" className="font-medium text-blue-600 dark:text-blue-500 hover:underline"> Create Appointments </a></>
  );
};

export default CounselingTable;
