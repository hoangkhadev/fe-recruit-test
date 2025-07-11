import { Sparkles, XIcon } from "@/assets/icons";
import { CourseSuggestionSkeleton } from "@/components/course/course-suggestion-skeleton";
import { BoxIcon } from "@/components/ui/box-icon";
import { formatPrice } from "@/utils/format-price";

export function SuggestionList({
  suggestionCourses,
  suggestionLoading,
  onClose,
}) {
  return (
    <section className="relative bg-gradient-to-r from-primary to-green-400 text-white py-10 mt-[100px] lg:mt-[50px] wrapper rounded">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-6 h-6" />
          <h2 className="text-2xl font-bold">Gợi ý AI dành cho bạn</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {suggestionLoading ? (
            Array(3)
              .fill(null)
              .map((_, index) => (
                <CourseSuggestionSkeleton key={`course-skeleton-${index}`} />
              ))
          ) : suggestionCourses.length > 0 ? (
            suggestionCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-300"
              >
                <h3 className="font-semibold mb-2">{course.title}</h3>
                <p className="text-sm text-white/80 mb-3">
                  {course.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold">
                    {formatPrice(course.price)}
                  </span>
                  <button
                    //   onClick={() => setSelectedCourse(course)}
                    className="bg-white text-primary font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Xem ngay
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-xl font-medium col-span-3">
              Không thể lấy gợi ý lúc này
            </div>
          )}
        </div>
      </div>
      <div className="absolute right-4 top-4">
        <BoxIcon className="text-white hover:bg-primary/40" onClick={onClose}>
          <XIcon />
        </BoxIcon>
      </div>
    </section>
  );
}
