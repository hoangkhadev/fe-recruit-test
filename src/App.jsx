import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router";

import { Toaster } from "sonner";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ScrollToTop } from "@/components/ui/scroll-to-top";

import { CourseProvider } from "@/context/course-context";
import { Chatbot } from "@/components/chatbot";

const HomePage = lazy(() => import("@/pages/home"));
const WishlistPage = lazy(() => import("@/pages/wishlist"));
const NotFoundPage = lazy(() => import("@/pages/not-found"));
const ViewHistoryPage = lazy(() => import("@/pages/view-history"));
const ChatbotPage = lazy(() => import("@/pages/chatbot"));

export default function App() {
  const { pathname } = useLocation();
  const isChatbotPage = pathname === "/chatbot";
  return (
    <>
      <ScrollToTop />
      <CourseProvider>
        {/* Header */}
        <Header />

        {/* Content */}
        <div className="pt-[70px] h-screen flex flex-col">
          <div className={`flex-1 ${isChatbotPage ? "overflow-hidden" : ""}`}>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" Component={HomePage} />
                <Route path="/wishlist" Component={WishlistPage} />
                <Route path="/view-history" Component={ViewHistoryPage} />
                <Route path="/chatbot" Component={ChatbotPage} />
                <Route path="*" Component={NotFoundPage} />
              </Routes>
            </Suspense>
          </div>
          {!isChatbotPage && <Footer />}
        </div>

        {/* Footer */}
        {/* </div> */}
        {!isChatbotPage && <Chatbot />}
      </CourseProvider>
      <Toaster />
    </>
  );
}
