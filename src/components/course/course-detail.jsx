import { useEffect } from "react";
import { formatPrice } from "@/utils/format-price";
import {
  BookOpen,
  Clock,
  RocketFill,
  StarFill,
  Users,
  XIcon,
} from "@/assets/icons";
import avatar from "@/assets/images/avatar.png";

export function CourseDetail({ course, onClose }) {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  });

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 course-detail"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-64">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full cursor-pointer"
            onClick={onClose}
          >
            <XIcon />
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {course.category}
            </span>
            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
              {course.level}
            </span>
          </div>

          <h2 className="text-lg lg:text-2xl font-bold mb-4 text-gray-800">
            {course.title}
          </h2>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-5 h-5" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Users className="w-5 h-5" />
              <span>{course.students.toLocaleString()} học viên</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <StarFill className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span>{course.rating} đánh giá</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <BookOpen className="w-5 h-5" />
              <span>Giảng viên: {course.instructor}</span>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Mô tả khóa học:</h3>
            <p className="text-gray-600 leading-relaxed">
              {course.detailedDescription}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Kỹ năng học được:</h3>
            <div className="flex flex-wrap gap-2">
              {course.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 pt-4 border-t border-t-neutral-300 gap-3">
            <div className="flex items-center gap-3 lg:col-span-2">
              <span className="text-3xl font-bold text-primary">
                {formatPrice(course.price)}
              </span>
              <span className="text-gray-400 line-through">
                {formatPrice(course.originalPrice)}
              </span>
            </div>

            <button className="bg-gradient-to-r from-primary to-green-400 text-white font-semibold px-6 py-4 rounded-lg hover:from-primary hover:to-green-500 transition-all duration-200 flex items-center justify-center gap-2">
              <RocketFill className="w-5 h-5" />
              Đăng ký ngay
            </button>
          </div>
          <div className="mt-4 border-t border-t-neutral-300 pt-4">
            <h3 className="text-lg font-medium border-l-4 border-l-primary pl-2">
              Review
            </h3>
            <div className="py-4 pl-2 grid gap-4">
              {course.userReviews?.map((review) => (
                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <img
                      src={avatar}
                      alt={review.name}
                      className="rounded-full h-6 w-6"
                    />
                    <p className="font-semibold">{review.name}</p>
                    <div className="flex items-center">
                      {Array(5)
                        .fill(null)
                        .map((_, index) => {
                          const isFillYellow = index + 1 <= review.rating;

                          return (
                            <StarFill
                              key={`review-star-${index}`}
                              className={`w-4 h-4 ${
                                isFillYellow
                                  ? "fill-yellow-400"
                                  : "fill-neutral-400"
                              }`}
                            />
                          );
                        })}
                    </div>
                  </div>
                  <p>{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
