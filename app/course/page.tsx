import CourseExplorer from "../components/CourseExplorer";
import { courses } from "../data/courses";

export default function CoursesPage() {
  return (
    <main>
      <h1>รายวิชาทั้งหมด</h1>
      <CourseExplorer initialCourses={courses} />
    </main>
  );
}
