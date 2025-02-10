"use client";

import { useStudent } from "../_context/StudentContext";
import { StudentChart } from "@/components/student-chart";
import StudentReport from "./_charts/StudentReport";

const Report = () => {
  const { students } = useStudent();

  return (
    <div className="p-4">
      <header className="flex justify-center items-center mb-10">
        <h1 className="text-2xl font-bold ">Student Report Dashboard</h1>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className=" p-4 rounded-xl shadow border border-gray-600 hover:bg-zinc-900">
          <h2 className="text-xl font-semibold">Total Students</h2>
          <p className="text-3xl font-bold">{students.length}</p>
        </div>
        <div className="p-4 rounded-xl shadow border border-gray-600 hover:bg-zinc-900">
          <h2 className="text-xl font-semibold">Average Grade</h2>
          <p className="text-3xl font-bold">B+</p>
        </div>
        <div className="p-4 rounded-xl shadow border border-gray-600 hover:bg-zinc-900">
          <h2 className="text-xl font-semibold">Attendance Rate</h2>
          <p className="text-3xl font-bold">95%</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4 h-[600px] ">
        <div className=" p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Student Report</h2>
          <StudentReport students={students} />
        </div>
        <div className=" p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Student Chart</h2>
          <StudentChart students={students} />
        </div>
      </div>
    </div>
  );
};

export default Report;
