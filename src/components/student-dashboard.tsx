/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef, useState } from "react";
import { DashboardHeader } from "./dashboard-header";
import { StudentTable } from "./student-table";
import { StudentChart } from "./student-chart";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddStudentForm } from "./add-student-form";
import jsPDF from "jspdf";
import "jspdf-autotable";
import html2canvas from "html2canvas";
import { FileDown } from "lucide-react";
import { useStudent } from "@/app/(dashboard)/_context/StudentContext";

declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
    lastAutoTable: {
      finalY: number;
    };
  }
}

type SortKey = "rollNo" | "name" | "grade" | "score";

export function StudentDashboard() {
  const { students, setStudents } = useStudent();
  const [sortKey, setSortKey] = useState<SortKey>("rollNo");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const chartRef = useRef<HTMLDivElement>(null);

  const addStudent = (newStudent: Omit<(typeof students)[0], "id">) => {
    setStudents([...students, { ...newStudent }]);
  };

  const editStudent = (
    id: string,
    updatedStudent: Partial<(typeof students)[0]>
  ) => {
    setStudents(
      students.map((student) =>
        student.rollNo === id ? { ...student, ...updatedStudent } : student
      )
    );
  };

  const deleteStudent = (id: string) => {
    setStudents(students.filter((student) => student.rollNo !== id));
  };

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const sortedStudents = [...students].sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return sortOrder === "asc" ? -1 : 1;
    if (a[sortKey] > b[sortKey]) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const exportToPDF = async () => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.text("Student Performance Report", 14, 15);

    // Add sorting information
    doc.setFontSize(12);
    doc.text(`Sorted by: ${sortKey} (${sortOrder})`, 14, 25);

    // Add table
    doc.autoTable({
      head: [["Roll No", "Name", "Grade", "Score"]],
      body: sortedStudents.map((student) => [
        student.rollNo,
        student.name,
        student.grade,
        student.score,
      ]),
      startY: 30,
    });

    // Add chart
    if (chartRef.current) {
      const canvas = await html2canvas(chartRef.current);
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = 180;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      doc.addImage(
        imgData,
        "PNG",
        15,
        doc.lastAutoTable.finalY + 10,
        imgWidth,
        imgHeight
      );
    }

    doc.save("student-performance-report.pdf");
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <DashboardHeader />
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">All Students</h1>
        <div className="space-x-2">
          <Button onClick={exportToPDF}>
            <FileDown className="mr-2 h-4 w-4" /> Export to PDF
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Student
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Student</DialogTitle>
                <DialogDescription>
                  Enter the details of the new student below.
                </DialogDescription>
              </DialogHeader>
              <AddStudentForm onAddStudent={addStudent} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <StudentTable
        students={sortedStudents}
        onEdit={editStudent}
        onDelete={deleteStudent}
        onSort={handleSort}
        sortKey={sortKey}
        sortOrder={sortOrder}
      />
      <div ref={chartRef}>
        <StudentChart students={sortedStudents} />
      </div>
    </div>
  );
}
