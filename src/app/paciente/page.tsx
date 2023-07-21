"use client"

import PacienteForm from "../components/PacienteForm"


export default function AddPacientePage(){
    return(
        <div>                       
            <p className="text-gray-500 dark:text-gray-400">''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''</p>
            <h1 className="text-5xl font-extrabold dark:text-white">CREATE <small className="ml-2 font-semibold text-gray-500 dark:text-gray-400">Pacientes</small></h1>
            <p className="text-gray-500 dark:text-gray-400">''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''</p>

            <PacienteForm></PacienteForm>
        </div>
    )
}