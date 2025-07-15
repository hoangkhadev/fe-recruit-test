import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

import { AppConfig } from "@/config/app";
import { CourseList } from "@/components/course/course-list";
import { useCourse } from "@/context/course-context";

export default function ViewHistoryPage() {
  const { historyCourses } = useCourse();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pb-5">
      <Helmet>
        <title>{AppConfig.appName} | Lịch sử các khóa học đã xem</title>
      </Helmet>
      <div className="wrapper mt-5">
        <h2 className="text-xl font-medium pl-2 border-l-4 border-l-primary">
          Lịch sử khóa học đã xem
        </h2>
        {historyCourses.length > 0 ? (
          <CourseList filteredCourses={historyCourses} loading={loading} />
        ) : (
          <div className="mt-10">Chưa xem khóa học nào</div>
        )}
      </div>
    </div>
  );
}
