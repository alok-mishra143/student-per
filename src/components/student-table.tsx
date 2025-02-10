"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useState } from "react";
import StudentAddEdit from "./global/student-model/StudentAddEdit";
import { Trash } from "lucide-react";

type Student = {
  rollNo: string;
  name: string;
  grade: string;
  score: number;
};

type SortKey = "rollNo" | "name" | "grade" | "score";

type StudentTableProps = {
  students: Student[];
  onEdit: (rollNo: string, updatedStudent: Partial<Student>) => void;
  onDelete: (rollNo: string) => void;
  onSort: (key: SortKey) => void;
  sortKey: SortKey;
  sortOrder: "asc" | "desc";
};

export function StudentTable({
  students,

  onDelete,
  onSort,
  sortKey,
  sortOrder,
}: StudentTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search by name or roll number"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">
              <Button variant="ghost" onClick={() => onSort("rollNo")}>
                Roll No{" "}
                {sortKey === "rollNo" && (sortOrder === "asc" ? "↑" : "↓")}
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => onSort("name")}>
                Name {sortKey === "name" && (sortOrder === "asc" ? "↑" : "↓")}
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => onSort("grade")}>
                Grade {sortKey === "grade" && (sortOrder === "asc" ? "↑" : "↓")}
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => onSort("score")}>
                Score {sortKey === "score" && (sortOrder === "asc" ? "↑" : "↓")}
              </Button>
            </TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedStudents.map((student) => (
            <TableRow key={student.rollNo}>
              <TableCell>{student.rollNo}</TableCell>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.grade}</TableCell>
              <TableCell>{student.score}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <StudentAddEdit
                    Title="Edit Student"
                    Usefor="Edit"
                    studentData={student}
                  />

                  <Button onClick={() => onDelete(student.rollNo)}>
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center">
        <div>
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, filteredStudents.length)} of{" "}
          {filteredStudents.length} entries
        </div>
        <div className="space-x-2">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
