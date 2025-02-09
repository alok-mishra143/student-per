"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Define Student Type
interface Student {
  rollNo: string;
  name: string;
  grade: string;
  score: number;
}

// Define Context Type
interface StudentContextType {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
}

// Create Student Context
const StudentContext = createContext<StudentContextType | undefined>(undefined);

// Provider Component
export const StudentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Load from localStorage or set empty array
  const getStoredStudents = (): Student[] => {
    const storedStudents = localStorage.getItem("students");
    return storedStudents ? JSON.parse(storedStudents) : [];
  };

  const [students, setStudents] = useState<Student[]>(getStoredStudents);

  // Update localStorage whenever students change
  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  return (
    <StudentContext.Provider value={{ students, setStudents }}>
      {children}
    </StudentContext.Provider>
  );
};

// Custom Hook to use Student Context
export const useStudent = (): StudentContextType => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error("useStudent must be used within a StudentProvider");
  }
  return context;
};
