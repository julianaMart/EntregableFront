import { useEffect, useState } from "react";


// interface Program{
//     name:string;
//     code:number;    
//     _links: Record<string, {href:string}>
// }

interface Student{
    id: number;
    name: string;
    email: string;
    phone: string;
    dateOfBirth: Date;
}

const PacienteForm =()=>{

    // const [programs, setPrograms]= useState<Program[]>([])
    const [submitted, setSubmitted]=useState(false)
    const handleSubmit= async (e:any)=>{
         
        e.preventDefault()
        const myStudent:Student={
            id:e.target.id.value,
            name:e.target.name.value,
            email:e.target.email.value,
            phone:e.target.phone.value,
            dateOfBirth:e.taget.dateOfBirth.value
        }
        console.log(myStudent)

        try{
            const response = await fetch ('http://localhost:8181/students',{
                method:"POST",
                headers:{
                    "Content-type":"application/json"
                },
                body: JSON.stringify(myStudent)
            })

            const data=await response.json()
            console.log(data)

            e.target.reset()
            setSubmitted(true)
            setTimeout(()=>{
                setSubmitted(false),3000
            })

        }catch(error){
            console.error(error)
        }
    }


    return(
        <form onSubmit={handleSubmit}>
            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                name="name"
                placeholder="Nombre"
            />
            <br></br>
            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="email"
                name="email"
                placeholder="Correo"
            />                        
            <br></br>
            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="text"
                name="phone"
                placeholder="Telefono"
            />
            <br></br>
            
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> ADD </button>
            <br></br>
            <a href="/paciente/list" className="font-medium text-blue-600 dark:text-blue-500 hover:underline"> List Pacients </a>

            {
                submitted && <div>
                    Se registro correctamente.
                </div>
            }
        </form>
    )
}

export default PacienteForm;