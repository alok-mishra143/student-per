"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type AddStudentFormProps = {
  onAddStudent: (student: {
    rollNo: string;
    name: string;
    grade: string;
    score: number;
  }) => void;
};

export function AddStudentForm({ onAddStudent }: AddStudentFormProps) {
  const [formData, setFormData] = useState({
    rollNo: "",
    name: "",
    grade: "",
    score: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddStudent({
      ...formData,
      score: Number(formData.score),
    });
    setFormData({ rollNo: "", name: "", grade: "", score: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="rollNo">Roll No</Label>
        <Input
          id="rollNo"
          name="rollNo"
          value={formData.rollNo}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="grade">Grade</Label>
        <Input
          id="grade"
          name="grade"
          value={formData.grade}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="score">Score</Label>
        <Input
          id="score"
          name="score"
          type="number"
          value={formData.score}
          onChange={handleChange}
          required
        />
      </div>
      <Button type="submit">Add Student</Button>
    </form>
  );
}
