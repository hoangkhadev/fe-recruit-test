import { CourseList } from "@/components/course/course-list";
import { CourseSearchFilter } from "@/components/course/course-search-filter";

export function FilteredCourse({
  loading,
  searchCourse,
  filter,
  setFilter,
  searchLoading,
  filteredCourses,
  openSuggestionList,
}) {
  return (
    <section
      className={`lg:mt-[50px] ${
        openSuggestionList ? "" : "mt-[90px]"
      } wrapper`}
    >
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
