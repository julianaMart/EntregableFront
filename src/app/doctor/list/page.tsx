"use client"
import DoctorListForm from "@/app/components/DoctorListForm"

export default function DoctorListPage() {
  
    return (
        <div className="container">
            <p className="text-gray-500 dark:text-gray-400">''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''</p>
            <h1 className="text-5xl font-extrabold dark:text-white">LIST <small className="ml-2 font-semibold text-gray-500 dark:text-gray-400">Doctors</small></h1>
            <p className="text-gray-500 dark:text-gray-400">''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''</p>
            <DoctorListForm/>
        </div>
    )
}