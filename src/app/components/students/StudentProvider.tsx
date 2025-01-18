import { createContext, useCallback, useContext, useEffect, useState } from "react";
import React from 'react'
import { Student } from "../../interfaces/Student";
import { getStudent, saveStudent } from "../../utils/Storage";

export interface StudentAPI{
    student: Student | null,
    setStudent: (student: Student | null) => void,
}

const StudentContext = createContext<StudentAPI | null>(null);

/**
 * Responsible for reading, and overwriting student (user) details globally within the app.
 * 
 * Must be used within `StudentsProvider`
 * @author Teninlanimi Taiwo
 */
export const useStudent = ()=>{
    const context = useContext(StudentContext);

    if(!context){
        throw new Error("`useStudent` should be used within StudentProvider")
    }

    return context;
}

/**
 * Provider, responsible for exposing student (user) details globally within the app.
 * 
 * @author Teninlanimi Taiwo
 */
export function StudentProvider({children}: {children: JSX.Element}){
    const [student, setStudentRaw] = useState<Student | null>(null)

    // To initialize the students from local storage
    useEffect(()=>{
        getStudent().then((_student)=> setStudentRaw(_student));
    }, [])

    const setStudent = useCallback((_student: Student)=>{
        saveStudent(_student);
        setStudentRaw(_student)
    }, [])
    return <StudentContext.Provider value={{student, setStudent}} >
        {children}
    </StudentContext.Provider>
}