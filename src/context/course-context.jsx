import { createContext, useContext, useState } from "react";

import { useWishlist } from "@/hooks/useWishlist";
import { useCourses } from "@/hooks/useCourses";
import { useHistory } from "@/hooks/useHistory";

export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const { courses, loading } = useCourses();
  const { wishlist, wishListCourses, isFavorite, toggleWishlist } =
    useWishlist(courses);
  const { historyCourses, addToHistory } = useHistory(courses);
  const [seletedCourse, setSelectedCourse] = useState(null);
  const handleSelectedCourse = (course) => {
    setSelectedCourse(course);
    if (course) {
      addToHistory(course.id);
    }
  };

  return (
    <CourseContext.Provider
      value={{
        courses,
        loading,
        wishlist,
        wishListCourses,
        historyCourses,
        seletedCourse,
        toggleWishlist,
        isFavorite,
        handleSelectedCourse,
        addToHistory,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error("useCourse must be within CourseProvider");
  }

  return context;
};
