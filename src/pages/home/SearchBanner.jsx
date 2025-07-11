import { Search, Sparkles } from "@/assets/icons";
import { Button } from "@/components/ui/button";

export function SearchBanner({
  search,
  setSearch,
  handleSearch,
  handleAISuggestion,
}) {
  return (
    <section className="search-banner">
      <div className="pt-[50px] h-[250px] wrapper">
        <h3 className="text-4xl font-black text-white text-center uppercase mb-2">
          Tìm kiếm khóa học tốt nhất
        </h3>
        <p className="text-sm text-center text-white">
          Tìm kiếm khóa học tốt nhất trên toàn cầu
        </p>

        <div className="bg-white shadow lg:px-[40px] lg:py-[30px] p-[10px] relative top-[40px] rounded">
          <form onSubmit={handleSearch} className="grid lg:grid-cols-2 gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Tìm kiếm khóa học"
                className="pl-12 h-[50px] border border-[#d2dadc] w-full px-[12px] py-[6px] outline-none rounded focus:ring-1 focus:ring-primary transition-all duration-300 caret-primary text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button type="submit" className="h-[50px]">
                Tìm khóa học
              </Button>
              <Button
                onClick={handleAISuggestion}
                isPrimary={false}
                className="flex items-center justify-center gap-2 h-[50px] text-sm !px-[5px]"
              >
                <Sparkles className="!size-4 lg:!size-6" />{" "}
                <p className="whitespace-nowrap">Gợi ý khóa học</p>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
