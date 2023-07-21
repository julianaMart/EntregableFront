"use client"

import AdvisorForm from "../components/AdvisorForm"


export default function AddAdvisorPage(){
    return(
        <div>                       
            <p className="text-gray-500 dark:text-gray-400">''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''</p>
            <h1 className="text-5xl font-extrabold dark:text-white">CREATE <small className="ml-2 font-semibold text-gray-500 dark:text-gray-400">Doctores</small></h1>
            <p className="text-gray-500 dark:text-gray-400">''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''</p>

            <AdvisorForm></AdvisorForm>
        </div>
    )
}