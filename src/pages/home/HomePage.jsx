import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet";

import { AppConfig } from "@/config/app";
import { useToast } from "@/hooks/useToast";
import { useCourses } from "@/hooks/useCourses";
import { fetchSuggestions } from "@/api/mockApi";

import { FilteredCourse, SearchBanner, SuggestionList } from "@/pages/home";

export default function HomePage() {
  const { courses, loading } = useCourses();
  const { showSucess, showError } = useToast();

  // Search
  const [search, setSearch] = useState("");
  const [searchCourse, setSearchCourse] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  // Filter
  const [filter, setFilter] = useState("all");

  // Suggestion
  const [suggestionCourses, setSuggestionCourses] = useState([]);
  const [openSuggestionList, setOpenSuggestionList] = useState(false);
  const [suggestionLoading, setSuggestionLoading] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchLoading(true);
    setTimeout(() => {
      setSearchCourse(
        courses.filter((c) =>
          c.title?.toLowerCase().includes(search.trim().toLowerCase() || "")
        )
      );
      setSearchLoading(false);
    }, 300);
  };

  const handleAISuggestion = async () => {
    setOpenSuggestionList(true);
    setSuggestionLoading(true);

    try {
      const res = await fetchSuggestions("xxx");
      setSuggestionCourses(res.data);

      showSucess("AI đã gợi ý khóa học thành công!");
    } catch (error) {
      console.log(error);
      setOpenSuggestionList([]);
      showError("Đã xảy ra lỗi khi gợi ý khóa học từ AI!");
    } finally {
      setSuggestionLoading(false);
    }
  };

  const filteredCourses = useMemo(() => {
    return filter !== "all"
      ? searchCourse.filter((p) => {
          if (filter === "lt500") return p.price < 500000;
          if (filter === "500-1000")
            return p.price >= 500000 && p.price <= 1000000;
          if (filter === "gt1000") return p.price > 1000000;
          return true;
        })
      : searchCourse;
  }, [filter, searchCourse]);

  useEffect(() => {
    setSearchCourse(courses);
  }, [courses]);

  return (
    <div className="pb-5">
      <Helmet>
        <title>{AppConfig.appName} | Trang chủ</title>
      </Helmet>
      <SearchBanner
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
        handleAISuggestion={handleAISuggestion}
      />

      {openSuggestionList && (
        <SuggestionList
          suggestionCourses={suggestionCourses}
          suggestionLoading={suggestionLoading}
          onClose={() => setOpenSuggestionList(false)}
        />
      )}

      <FilteredCourse
        filter={filter}
        filteredCourses={filteredCourses}
        loading={loading}
        searchLoading={searchLoading}
        searchCourse={searchCourse}
        setFilter={setFilter}
      />
    </div>
  );
}
