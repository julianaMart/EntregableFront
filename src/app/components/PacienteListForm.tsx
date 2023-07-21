


import { useEffect, useState } from 'react';

  
  interface Student{
    name:string;
    email:string;
    dateOfBirth:string;
 }

  
  interface Student {
    name: string;
    // Add more properties specific to the student if needed
  }

const CounselingTable = () => {
  
  const [students, setStudents] = useState<Student[]>([]);


  useEffect(
    ()=>{
        const fetchDoctores=async()=>{
            try{
                const response=await fetch (`http://localhost:8181/students`)
                if(!response.ok){
                    throw new Error("No puede rescatar Pacientes.")
                }

                const data=await response.json()
                const myDoctor = data._embedded.students
                setStudents(myDoctor)
                
            }catch(error){
                console.error(error)
            }

        }

        fetchDoctores()
    }
)

  return (
    <><table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                  <th scope="col" className="px-6 py-3">Nombre</th>
                  <th scope="col" className="px-6 py-3">Email</th>
                  <th scope="col" className="px-6 py-3">Fecha Nacimiento</th>
              </tr>
          </thead>
          <tbody>
              {students.map((student, index) => (
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700" key={index}>
                      <td className="px-6 py-4">{student.name}</td>
                      <td className="px-6 py-4">{student.email}</td>
                      <td className="px-6 py-4">{student.dateOfBirth}</td>
                  </tr>
              ))}
          </tbody>
      </table><br></br><a href="/paciente" className="font-medium text-blue-600 dark:text-blue-500 hover:underline"> Create Pacient </a></>
  );
};

export default CounselingTable;
