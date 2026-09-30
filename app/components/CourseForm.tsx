"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import type { Course } from "../types/course";

export type CourseDraft = {
  code: string;
  name: string;
  credit: string;
  instructor: string;
};

type FormErrors = Partial<Record<keyof CourseDraft, string>>;

type CourseFormProps = {
  initialCourse?: Course;
  onSave: (draft: CourseDraft) => void;
  onCancel: () => void;
};

const emptyDraft: CourseDraft = {
  code: "",
  name: "",
  credit: "",
  instructor: "",
};

function toDraft(course?: Course): CourseDraft {
  if (!course) return emptyDraft;

  return {
    code: course.code,
    name: course.name,
    credit: String(course.credit),
    instructor: course.instructor,
  };
}

function validate(value: CourseDraft): FormErrors {
  const nextErrors: FormErrors = {};

  if (value.code.trim() === "") {
    nextErrors.code = "กรุณาระบุรหัสวิชา";
  }

  if (value.name.trim() === "") {
    nextErrors.name = "กรุณาระบุชื่อวิชา";
  }

  const credit = Number(value.credit);
  if (!Number.isInteger(credit) || credit < 1 || credit > 6) {
    nextErrors.credit = "หน่วยกิตต้องเป็นจำนวนเต็มตั้งแต่ 1 ถึง 6";
  }

  if (value.instructor.trim() === "") {
    nextErrors.instructor = "กรุณาระบุผู้สอน";
  }

  return nextErrors;
}

export default function CourseForm({
  initialCourse,
  onSave,
  onCancel,
}: CourseFormProps) {
  const [draft, setDraft] = useState<CourseDraft>(toDraft(initialCourse));
  const [errors, setErrors] = useState<FormErrors>({});

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setDraft((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(draft);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    onSave(draft);
    setDraft(emptyDraft);
    setErrors({});
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="courseForm">
      <h2>{initialCourse ? "แก้ไขรายวิชา" : "เพิ่มรายวิชาใหม่"}</h2>

      <label htmlFor="code">รหัสวิชา</label>
      <input
        id="code"
        name="code"
        type="text"
        value={draft.code}
        onChange={handleChange}
        aria-invalid={!!errors.code}
        aria-describedby={errors.code ? "code-error" : undefined}
      />
      {errors.code ? <p id="code-error" className="error">{errors.code}</p> : null}

      <label htmlFor="name">ชื่อวิชา</label>
      <input
        id="name"
        name="name"
        type="text"
        value={draft.name}
        onChange={handleChange}
        aria-invalid={!!errors.name}
        aria-describedby={errors.name ? "name-error" : undefined}
      />
      {errors.name ? <p id="name-error" className="error">{errors.name}</p> : null}

      <label htmlFor="credit">หน่วยกิต</label>
      <input
        id="credit"
        name="credit"
        type="number"
        inputMode="numeric"
        min="1"
        max="6"
        value={draft.credit}
        onChange={handleChange}
        aria-invalid={!!errors.credit}
        aria-describedby={errors.credit ? "credit-error" : undefined}
      />
      {errors.credit ? <p id="credit-error" className="error">{errors.credit}</p> : null}

      <label htmlFor="instructor">ผู้สอน</label>
      <input
        id="instructor"
        name="instructor"
        type="text"
        value={draft.instructor}
        onChange={handleChange}
        aria-invalid={!!errors.instructor}
        aria-describedby={errors.instructor ? "instructor-error" : undefined}
      />
      {errors.instructor ? <p id="instructor-error" className="error">{errors.instructor}</p> : null}

      <button type="submit">บันทึก</button>
      {initialCourse ? (
        <button type="button" onClick={onCancel}>ยกเลิก</button>
      ) : null}
    </form>
  );
}
