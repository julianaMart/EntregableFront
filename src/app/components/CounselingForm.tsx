import { useEffect, useState } from "react";


interface Student {
    id: number;
    name: string;
    email: string;
    phone: string;
    dateOfBirth: Date;
    _links: Record<string, { href: string }>;
}

interface Advisor {
  name: string;
  email: string;
  phone: string;
  program: string;
  _links: Record<string, { href: string }>;
}

interface Counseling {
    student: string;
    advisor: string;
    date: string;
}
const CounselingForm = () => {
const [students, setStudents] = useState<Student[]>([]);
const [advisors, setAdvisors] = useState<Advisor[]>([]);

const [submitted, setSubmitted] = useState(false);
  

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("http://localhost:8181/students");
        const data = await response.json();
        setStudents(data._embedded.students);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStudents();
  }, []);


  useEffect(() => {
    const fetchAdvisors = async () => {
      try {
        const response = await fetch("http://localhost:8181/advisors");
        const data = await response.json();
        setAdvisors(data._embedded.advisors);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAdvisors();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    
    const counseling: Counseling = ({
        student: e.target.student.value,
        advisor: e.target.advisor.value,
        date: e.target.date.value,
    });
    

    try {
      const response = await fetch("http://localhost:8181/counselings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(counseling),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        //Clear the form
        e.target.reset();

        //Disable the submit button
        e.target.disabled = true;

        setSubmitted(true); // Set the submitted state to true
        setTimeout(() => {
          setSubmitted(false); // Reset the submitted state after 3 seconds
          //Redirect to the list of counselings
          window.location.href = "/counseling/list";          
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //Extract the student id from the href
const getStudentId = (student: string) => {
    const studentHrefParts = student.split("/");
    const studentId = studentHrefParts[studentHrefParts.length - 1];
    return studentId;
};
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <select name="student" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option value="0">Seleccione un Paciente</option>
          {students.map((student) => (
            <option key={getStudentId(student._links.student.href)} value={student._links.student.href}>
              {student.name}
            </option>
          ))}
        </select>
        <br></br>
        <select name="advisor" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option value="0">Seleccione un Doctor</option>
          {advisors.map((advisor) => (
            <option key={advisor._links.advisor.href} value={advisor._links.advisor.href}>
              {advisor.name}
            </option>
          ))}
        </select>
        <br></br>
        <input type="date" name="date" placeholder="Fecha" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        <br></br>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> ADD </button>
        <br></br>
            <a href="/counseling/list" className="font-medium text-blue-600 dark:text-blue-500 hover:underline"> List Appointments </a>
      </form>
      {submitted && <div className="success-message">Record inserted successfully!</div>}
    </div>
  );
};

export default CounselingForm;
