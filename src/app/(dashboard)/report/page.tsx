"use client";

import React from "react";
import { useStudent } from "../_context/StudentContext";
import { StudentChart } from "@/components/student-chart";

const Report = () => {
  const { students } = useStudent();

  return (
    <div>
      <StudentChart students={students} />
    </div>
  );
};

export default Report;
