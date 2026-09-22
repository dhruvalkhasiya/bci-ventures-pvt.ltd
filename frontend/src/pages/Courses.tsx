import CourseCard from "../components/CourseCard";
import { getPublishedCourses } from "../services/api";

export default function Courses() {
  const courses = getPublishedCourses();
  return (
    <div className="section-container py-20">
      <div className="mb-14 text-center">
        <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-brand-700">
          AI Skills / Modules
        </span>
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">Our AI Courses</h1>
        <p className="mx-auto max-w-2xl text-ink/70">
          From a first taste of AI to building and launching your own AI-powered business — pick the path that fits you.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {courses.map((course, i) => (
          <CourseCard key={course.slug} course={course} index={i} />
        ))}
      </div>
    </div>
  );
}
