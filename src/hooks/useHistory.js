import { useState, useEffect } from "react";

export const useHistory = (courses) => {
  const [history, setHistory] = useState(() => {
    const historyStorage = localStorage.getItem("history");
    return historyStorage ? JSON.parse(historyStorage) : [];
  });

  const historyCourses = courses.filter((c) => history.includes(c.id)) || [];
  const addToHistory = (courseId) => {
    const isExist = history.includes(courseId);
    const updatedHistory = isExist ? history : [...history, courseId];
    setHistory(updatedHistory);
  };

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  return { historyCourses, addToHistory };
};
