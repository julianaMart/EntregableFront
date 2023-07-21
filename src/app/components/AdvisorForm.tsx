import { useEffect, useState } from "react";


interface Program{
    name:string;
    code:number;    
    _links: Record<string, {href:string}>
}

interface Advisor{
    name:string;
    email:string;
    phone:string;
    program:string;
}

const AdvisorForm =()=>{

    const [programs, setPrograms]= useState<Program[]>([])
    const [submitted, setSubmitted]=useState(false)
    const handleSubmit= async (e:any)=>{
         
        e.preventDefault()
        const myAdvisor:Advisor={
            name:e.target.name.value,
            email:e.target.email.value,
            phone:e.target.phone.value,
            program:e.target.program.value
        }
        console.log(myAdvisor)

        try{
            const response = await fetch ('http://localhost:8181/advisors',{
                method:"POST",
                headers:{
                    "Content-type":"application/json"
                },
                body: JSON.stringify(myAdvisor)
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

    useEffect(
        ()=>{
            const fetchPrograms= async()=>{
                try{
                    const response=await fetch("http://localhost:8181/programs")
                    const data=await response.json()
                    setPrograms(data._embedded.programs)

                }catch(error){
                    console.error(error)
                }
            };
            
            fetchPrograms();
            
        },[]
    )

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
            {/* <select name="program"> */}            
            <select name="program" id="program" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
 
                <option key="0" value="">Seleccione especialidad</option>
                {
                    programs.map(
                        (program)=>(                            
                            <option key={program.code} value={program._links.program.href}>
                                {program.name}
                            </option>
                            ))                    
                }
            </select>   
            <br></br>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> ADD </button>
            <br></br>
            <a href="/doctor/list" className="font-medium text-blue-600 dark:text-blue-500 hover:underline"> List Doctors </a>

            {
                submitted && <div>
                    Se registro correctamente.
                </div>
            }
        </form>
    )
}

export default AdvisorForm;