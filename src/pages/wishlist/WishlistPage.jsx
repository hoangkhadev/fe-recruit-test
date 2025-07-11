import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

import { AppConfig } from "@/config/app";
import { CourseList } from "@/components/course/course-list";
import { useCourse } from "@/context/course-context";

export default function WishlistPage() {
  const { wishListCourses } = useCourse();
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
        <title>{AppConfig.appName} | Danh sách các khóa học yêu thích</title>
      </Helmet>
      <div className="wrapper mt-5">
        <h2 className="text-xl font-medium pl-2 border-l-4 border-l-primary">
          Danh sách khóa học yêu thích
        </h2>
        {wishListCourses.length > 0 ? (
          <CourseList filteredCourses={wishListCourses} loading={loading} />
        ) : (
          <div className="mt-10">Chưa có khóa học yêu thích nào</div>
        )}
      </div>
    </div>
  );
}
