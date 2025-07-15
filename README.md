# 🎓 Udemi - Frontend Intern Project

Một giao diện web mô phỏng sàn giáo dục thương mại điện tử tích hợp AI, nơi người dùng có thể tìm kiếm, khám phá và yêu thích các khóa học.

> 🔨 Bài test Frontend Intern | React + Vite | UI hiện đại, tối ưu UX, responsive đầy đủ thiết bị

---

## 🚀 Công nghệ sử dụng

- ⚛️ **React** + **Vite**
- 🎨 **Tailwind CSS**
- 🔧 Tối ưu UI/UX, component hóa rõ ràng

---

## ✨ Chức năng chính

### 1. 📚 Danh sách sản phẩm

- Hiển thị danh sách sản phẩm
- Mỗi sản phẩm gồm: tên, ảnh, giá, mô tả ngắn, nút **"Xem chi tiết"**

### 2. 🔍 Tìm kiếm & lọc

- Tìm theo tên sản phẩm
- Lọc theo mức giá:
  - `< 500K`
  - `500K – 1 triệu`
  - `> 1 triệu`

### 3. 🧠 Gợi ý thông minh (AI)

- Nút **"Gợi ý sản phẩm phù hợp"**
- FE gọi API giả `/api/suggestions?userId=...`
- Trả về danh sách sản phẩm dựa trên "hành vi người dùng": đã xem, đã thích

### 4. 🔎 Modal chi tiết

- Khi bấm "Xem chi tiết" → mở modal hiển thị ảnh lớn, mô tả dài, đánh giá,...

### 5. ❤️ Danh sách yêu thích

- Người dùng có thể đánh dấu sản phẩm yêu thích
- Có trang riêng hiển thị các sản phẩm đã thích

---

## 🔧 Cài đặt và chạy project

```bash
# 1. Clone về máy
git clone https://github.com/hoangkhadev/fe-recruit-test.git
cd fe-recruit-test

# 2. Cài đặt package
npm install --legacy-peer-deeps

# 3. Tạo file .env
cp .env

# 4. Thêm biến VITE_API_KEY (key gemini api)
VITE_API_KEY=

# 5. Chạy project
npm run dev
```

## ✅ Các tính năng nâng cao đã tích hợp

- Responsive đầy đủ trên mobile, tablet, desktop

- Loading skeleton khi gọi API gợi ý
- Toast khi thêm hoặc bỏ yêu thích
- Gợi ý sản phẩm theo hành vi đã xem, đã thích
- Modal xem chi tiết sản phẩm
- Lịch sử sản phẩm đã xem
- Xử lý lỗi khi API gợi ý thất bại
- Tích hợp chatbot AI thật với Gemini API

## 🔗 Demo

👉 Link demo: https://fe-recruit-test.vercel.app/
