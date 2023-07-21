


import { useEffect, useState } from 'react';

interface Counseling {
    date: string | null;
    advisor: Advisor;
    student: Student;
  }
  
  interface Advisor{
    name:string;
    email:string;
    phone:string;
    program:string;
 }

  
  interface Student {
    name: string;
    // Add more properties specific to the student if needed
  }

const CounselingTable = () => {
  const [counselings, setCounselings] = useState<Counseling[]>([]);
  const [advisors, setAdvisors] = useState<Advisor[]>([]);


  useEffect(
    ()=>{
        const fetchDoctores=async()=>{
            try{
                const response=await fetch (`http://localhost:8181/advisors`)
                if(!response.ok){
                    throw new Error("No puede rescatar Doctores.")
                }

                const data=await response.json()
                const myDoctor = data._embedded.advisors
                setAdvisors(myDoctor)
                
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
                  <th scope="col" className="px-6 py-3">Celular</th>
                  <th scope="col" className="px-6 py-3">Email</th>
              </tr>
          </thead>
          <tbody>
              {advisors.map((advisor, index) => (
                  <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700" key={index}>
                      <td className="px-6 py-4">{advisor.name}</td>
                      <td className="px-6 py-4">{advisor.phone}</td>
                      <td className="px-6 py-4">{advisor.email}</td>
                  </tr>
              ))}
          </tbody>
      </table><br></br><a href="/doctor" className="font-medium text-blue-600 dark:text-blue-500 hover:underline"> Create Doctor </a></>
  );
};

export default CounselingTable;
