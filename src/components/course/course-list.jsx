import { useCourse } from "@/context/course-context";

import { CourseCard } from "@/components/course/course-card";
import { CourseDetail } from "@/components/course/course-detail";
import { CourseSkeletonCard } from "@/components/course/course-skeleton-card";

export function CourseList({ loading, searchLoading, filteredCourses }) {
  const { toggleWishlist, wishlist, seletedCourse, handleSelectedCourse } =
    useCourse();

  if (loading || searchLoading) {
    return (
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-10">
        {Array(8)
          .fill(null)
          .map((_, index) => (
            <CourseSkeletonCard key={`skeleton-${index}`} />
          ))}
      </div>
    );
  }

  if (filteredCourses.length === 0) {
    return <div className="text-center mt-3">Không tìm thấy khóa học</div>;
  }

  return (
    <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-10">
      {filteredCourses.map((course) => (
        <div key={`course-${course.id}`}>
          <CourseCard
            course={course}
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
            handleSelectedCourse={handleSelectedCourse}
          />
        </div>
      ))}
      {seletedCourse !== null && (
        <CourseDetail
          course={seletedCourse}
          onClose={() => handleSelectedCourse(null)}
        />
      )}
    </div>
  );
}
