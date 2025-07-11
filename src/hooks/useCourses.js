import { useEffect, useState } from "react";
import { getAllCourses } from "@/api/mockApi";

export const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fecthCourses = async () => {
      const res = await getAllCourses();
      setCourses(res.data);
      setLoading(false);
    };

    fecthCourses();
  }, []);

  return { courses, loading };
};
