import { mockCourses } from "@/api/mockApi";
import { removeAccents } from "@/utils/remove-accent";
import { formatPrice } from "@/utils/format-price";

export const generateReply = (userText, messages) => {
  const normalizedUserText = removeAccents(userText.toLowerCase());
  const stopWords = [
    "tôi",
    "muon",
    "hoc",
    "tim",
    "kiem",
    "khoa",
    "ve",
    "cho",
    "mot",
    "lop",
    "xin",
    "chao",
    "hi",
    "hello",
    "ban",
    "co",
    "khong",
    "a",
    "goi",
    "y",
    "giup",
    "minh",
    "voi",
    "ve",
  ];

  const relevantKeywords = normalizedUserText
    .split(/[\s,.-]+/)
    .filter((word) => word && !stopWords.includes(word));

  if (relevantKeywords.length === 0 && messages.length > 1) {
    return `❓ Mình chưa hiểu rõ ý của bạn. Bạn có thể cho mình biết chủ đề bạn quan tâm được không? (Ví dụ: Python, Marketing, Tiếng Anh giao tiếp...)`;
  }

  const foundCourses = [];

  mockCourses.forEach((course) => {
    let matchScore = 0;
    const courseKeywords = course.keywords || [];

    courseKeywords.forEach((keyword) => {
      if (normalizedUserText.includes(keyword)) {
        matchScore += keyword.length;
      }
    });

    if (matchScore > 0) {
      foundCourses.push({ ...course, matchScore });
    }
  });

  if (foundCourses.length > 0) {
    foundCourses.sort((a, b) => {
      if (a.matchScore !== b.matchScore) {
        return b.matchScore - a.matchScore;
      }
      return b.aiScore - a.aiScore;
    });

    const topCourses = foundCourses.slice(0, 5);

    const categoryEmoji = {
      Programming: "👨‍💻",
      Marketing: "📈",
      Design: "🎨",
      Finance: "💰",
      English: "✨",
      "Office Skill": "📊",
      Technology: "🔌",
      "Soft Skill": "🗣️",
      Art: "🖼️",
    };
    const courseBlocks = topCourses
      .map((course) => {
        const emoji = categoryEmoji[course.category] || "📘";
        const formattedPrice = formatPrice(course.price);

        return `${emoji} **${course.title}**
  🧑‍🏫 Giảng viên: ${course.instructor}
  💸 Giá chỉ: ${formattedPrice}
  🎯 Trình độ: ${course.level}`;
      })
      .join("\n\n------------\n\n");

    const intro = `✅ Mình tìm thấy ${topCourses.length} khóa học phù hợp nhất với yêu cầu của bạn:\n\n`;
    const outro = `\n\nBạn quan tâm đến khóa học nào nhất ạ?`;

    return intro + courseBlocks + outro;
  }

  return `❓ Rất tiếc, mình chưa tìm thấy khóa học nào khớp với "${userText}".
  Bạn có thể thử các từ khóa phổ biến hơn như:
  • "Python", "React"
  • "Marketing", "SEO"
  • "Thiết kế", "Figma"
  • "Tiếng Anh", "IELTS"`;
};
