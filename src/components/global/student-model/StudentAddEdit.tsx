"use client";
import { useStudent } from "@/app/(dashboard)/_context/StudentContext";
import { AddStudentForm } from "@/components/add-student-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle, Edit } from "lucide-react";
import React from "react";

interface StudentAddEditProps {
  Title: string;
  Description?: string;
  Usefor: "Add" | "Edit";
  studentData?: {
    rollNo: string;
    name: string;
    grade: string;
    score: number;
  };
}

const StudentAddEdit = (params: StudentAddEditProps) => {
  const { Title, Description, Usefor, studentData } = params;

  const { students, setStudents } = useStudent();

  const handleSubmit = (updatedStudent: {
    rollNo: string;
    name: string;
    grade: string;
    score: number;
  }) => {
    if (Usefor === "Add") {
      setStudents([...students, updatedStudent]); // ✅ Append for new student
    } else if (Usefor === "Edit" && studentData) {
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.rollNo === updatedStudent.rollNo
            ? { ...student, ...updatedStudent }
            : student
        )
      ); // ✅ Replace the edited student
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            {Usefor === "Add" ? (
              <PlusCircle className="mr-2 h-4 w-4" />
            ) : (
              <Edit className="mr-2 h-4 w-4" />
            )}
            {Title}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{Title}</DialogTitle>
            <DialogDescription>{Description}</DialogDescription>
          </DialogHeader>
          <AddStudentForm onSubmit={handleSubmit} initialData={studentData} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentAddEdit;
