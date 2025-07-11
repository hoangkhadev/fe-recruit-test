import { CourseList } from "@/components/course/course-list";
import { CourseSearchFilter } from "@/components/course/course-search-filter";

export function FilteredCourse({
  loading,
  searchCourse,
  filter,
  setFilter,
  searchLoading,
  filteredCourses,
}) {
  return (
    <section className="mt-[110px] lg:mt-[50px] wrapper">
      {/* Filter */}
      <CourseSearchFilter
        filter={filter}
        searchCourse={searchCourse}
        setFilter={setFilter}
      />

      {/* List course */}
      <CourseList
        loading={loading}
        searchLoading={searchLoading}
        filteredCourses={filteredCourses}
      />
    </section>
  );
}
