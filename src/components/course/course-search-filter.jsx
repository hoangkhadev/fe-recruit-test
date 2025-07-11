export function CourseSearchFilter({ searchCourse, filter, setFilter }) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm">
        Kết quả tìm kiếm:{" "}
        <span className="font-semibold">
          {searchCourse.length} kết quả tìm được
        </span>
      </p>
      <div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="text-sm font-medium border p-1 rounded border-neutral-400"
        >
          <option value="all">Tất cả</option>
          <option value="lt500">Giá: &lt; 500K</option>
          <option value="500-1000">Giá: 500K - 1 triệu</option>
          <option value="gt1000">Giá: &gt; 1 triệu</option>
        </select>
      </div>
    </div>
  );
}
