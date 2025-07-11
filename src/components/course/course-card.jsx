import {
  Clock,
  HeartOutLine,
  Play,
  ShoppingBag,
  StarFill,
  Users,
} from "@/assets/icons";

import { BoxIcon } from "@/components/ui/box-icon";
import { Button } from "@/components/ui/button";

import { formatPrice } from "@/utils/format-price";

export function CourseCard({
  course,
  wishlist,
  toggleWishlist,
  handleSelectedCourse,
}) {
  return (
    <div
      className="border border-neutral-200 bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 p-2 cursor-pointer"
      onClick={() => handleSelectedCourse(course)}
    >
      <img
        src={course.image}
        alt={course.title}
        className="w-full h-full object-cover rounded-t-xl"
      />

      <div className="flex-1 mt-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-medium">
            {course.category}
          </span>
          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
            {course.level}
          </span>
        </div>

        <h3 className="font-bold mb-2 text-gray-800 line-clamp-2">
          {course.title}
        </h3>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {course.shortDescription}
        </p>

        <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {course.duration}
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {course.students.toLocaleString()}
          </div>
          <div className="flex items-center gap-1">
            <StarFill className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            {course.rating}
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-3">
          Giảng viên: <span className="font-semibold">{course.instructor}</span>
        </p>

        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">
              {formatPrice(course.price)}
            </span>
            <span className="text-gray-400 line-through text-sm">
              {formatPrice(course.originalPrice)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <Button
              onClick={() => handleSelectedCourse(course)}
              className=" flex items-center gap-2"
            >
              <Play className="w-4 h-4" />
              Xem chi tiết
            </Button>

            <div className="flex items-center gap-1">
              <BoxIcon
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(course.id);
                }}
                className={`rounded-full transition-all duration-200 ${
                  wishlist.includes(course.id) ? "text-red-500" : ""
                }`}
              >
                <HeartOutLine
                  className={` ${
                    wishlist.includes(course.id) ? "fill-current" : ""
                  }`}
                />
              </BoxIcon>

              <BoxIcon
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <ShoppingBag />
              </BoxIcon>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
