import { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";
import { fetchPublishedCourses, AdminCourse } from "../services/api";

export default function Courses() {
  const [courses, setCourses] = useState<AdminCourse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetchPublishedCourses().then((data) => {
      if (isMounted) {
        setCourses(data);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="section-container py-20">
      <div className="mb-14 text-center">
        <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-brand-700">
          AI Skills / Modules
        </span>
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">Our AI Courses & Master Modules</h1>
        <p className="mx-auto max-w-2xl text-ink/70">
          From a first taste of AI to building autonomous AI agents, n8n/Make automation, and launching your AI agency — pick the path that fits you.
        </p>
      </div>

      {loading ? (
        <div className="py-12 text-center text-ink/60">Loading available courses...</div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, i) => (
            <CourseCard key={course.slug} course={course} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
