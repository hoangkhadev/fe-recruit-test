import { createContext, useContext } from "react";

import { useWishlist } from "@/hooks/useWishlist";
import { useCourses } from "@/hooks/useCourses";
import { useHistory } from "@/hooks/useHistory";

export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const { courses, loading } = useCourses();
  const { wishlist, wishListCourses, isFavorite, toggleWishlist } =
    useWishlist(courses);
  const { historyCourses, addToHistory } = useHistory(courses);

  return (
    <CourseContext.Provider
      value={{
        courses,
        loading,
        wishlist,
        wishListCourses,
        historyCourses,
        toggleWishlist,
        isFavorite,
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
