import Link from "next/link";
import type { Course } from "../types/course";

type CourseCardProps = {
  course: Course;
  onEdit: () => void;
  onDelete: () => void;
};

export default function CourseCard({
  course,
  onEdit,
  onDelete,
}: CourseCardProps) {
  return (
    <article className="courseCard">
      <h2>
        <Link href={`/courses/${course.id}`}>{course.name}</Link>
      </h2>
      <p>รหัสวิชา: {course.code}</p>
      <p>{course.credit} หน่วยกิต</p>
      <p>ผู้สอน: {course.instructor}</p>
      <button type="button" onClick={onEdit}>แก้ไข</button>
      <button type="button" onClick={onDelete}>ลบ</button>
    </article>
  );
}
