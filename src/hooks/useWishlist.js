import { useEffect, useState } from "react";

import { useToast } from "@/hooks/useToast";

export const useWishlist = (courses) => {
  const { showSucess } = useToast();
  const [wishlist, setWishlist] = useState(() => {
    const wishlistStorage = localStorage.getItem("wishlist");
    return wishlistStorage ? JSON.parse(wishlistStorage) : [];
  });

  const toggleWishlist = (courseId) => {
    const isInWishlist = wishlist.includes(courseId);
    const updatedWishlist = isInWishlist
      ? wishlist.filter((id) => id !== courseId)
      : [...wishlist, courseId];
    setWishlist(updatedWishlist);
    showSucess(
      isInWishlist
        ? "Đã xóa khóa học khỏi danh sách yêu thích"
        : "Đã thêm khóa học vào danh sách yêu thích"
    );
  };

  const isFavorite = (courseId) => wishlist.includes(courseId);

  const wishListCourses = courses.filter((c) => wishlist.includes(c.id)) || [];

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  return { wishlist, toggleWishlist, isFavorite, wishListCourses };
};
