"use client";

import { useState, type ChangeEvent } from "react";
import CourseCard from "./CourseCard";
import CourseForm, { type CourseDraft } from "./CourseForm";
import type { Course } from "../types/course";

type CourseExplorerProps = {
  initialCourses: Course[];
};

export default function CourseExplorer({
  initialCourses,
}: CourseExplorerProps) {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [keyword, setKeyword] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  function handleCreate(draft: CourseDraft) {
    const newCourse: Course = {
      id: crypto.randomUUID(),
      code: draft.code.trim(),
      name: draft.name.trim(),
      credit: Number(draft.credit),
      instructor: draft.instructor.trim(),
    };

    setCourses((prev) => [...prev, newCourse]);
  }

  function handleDelete(id: string) {
    setCourses((prev) => prev.filter((course) => course.id !== id));
  }

  function handleUpdate(id: string, draft: CourseDraft) {
    setCourses((prev) =>
      prev.map((course) =>
        course.id === id
          ? {
              ...course,
              code: draft.code.trim(),
              name: draft.name.trim(),
              credit: Number(draft.credit),
              instructor: draft.instructor.trim(),
            }
          : course
      )
    );

    setEditingId(null);
  }

  function handleSave(draft: CourseDraft) {
    if (editingId === null) {
      handleCreate(draft);
      return;
    }

    handleUpdate(editingId, draft);
  }

  function handleKeywordChange(event: ChangeEvent<HTMLInputElement>) {
    setKeyword(event.target.value);
  }

  const editingCourse = courses.find(
    (course) => course.id === editingId
  );

  const searchText = keyword.trim().toLowerCase();

  const visibleCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchText) ||
      course.code.toLowerCase().includes(searchText)
  );

  return (
    <div>
      <div className="courseTools">
        <label htmlFor="keyword">ค้นหารายวิชา</label>

        <input
          id="keyword"
          type="search"
          placeholder="ค้นหาชื่อวิชาหรือรหัสวิชา"
          value={keyword}
          onChange={handleKeywordChange}
        />
      </div>

      <CourseForm
        key={editingId ?? "new"}
        initialCourse={editingCourse}
        onSave={handleSave}
        onCancel={() => setEditingId(null)}
      />

      {visibleCourses.length === 0 ? (
        <p>ไม่พบรายวิชาที่ตรงกับคำค้น</p>
      ) : (
        <section className="courseGrid">
          {visibleCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onEdit={() => setEditingId(course.id)}
              onDelete={() => handleDelete(course.id)}
            />
          ))}
        </section>
      )}
    </div>
  );
}
