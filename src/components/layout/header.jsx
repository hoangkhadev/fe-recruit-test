import { HeartOutLine, MenuBar, ShoppingBag } from "@/assets/icons";

import { BoxIcon } from "@/components/ui/box-icon";

import logo from "@/assets/images/logo.png";
// import avatar from "@/assets/images/avatar.png";
import { Button } from "@/components/ui/button";
import { useCourse } from "@/context/course-context";
import { Link, NavLink } from "react-router";

export function Header() {
  const { wishlist } = useCourse();
  const wishlistCount = wishlist.length ?? 0;

  return (
    <header className="sticky top-0 z-10 border-b border-neutral-200 bg-white">
      <div className="wrapper">
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2">
            <div className="lg:w-[40px] w-[35px]">
              <img
                src={logo}
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </div>

            <h1 className="lg:text-lg text-base font-bold text-gray-900">
              Udemi
            </h1>
          </NavLink>

          {/* Menu */}
          <ul className="hidden lg:flex items-center gap-6">
            <li className="menu-item">
              <NavLink
                to="/"
                className={({ isActive }) => `${isActive ? "active" : ""}`}
              >
                Trang chủ
              </NavLink>
            </li>
            <li className="menu-item">Cộng đồng</li>
            <li className="menu-item">Về chúng tôi</li>
            <li className="menu-item">Hỗ trợ</li>
            <li className="menu-item">
              <NavLink
                to="/view-history"
                className={({ isActive }) => `${isActive ? "active" : ""}`}
              >
                Lịch sử xem
              </NavLink>
            </li>
          </ul>

          {/* Rigth side */}
          <div className="flex items-center gap-2">
            <Link to="/wishlist">
              <BoxIcon>
                <HeartOutLine />
                <p className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 flex items-center justify-center text-[11px] font-semibold text-white">
                  {wishlistCount}
                </p>
              </BoxIcon>
            </Link>

            <Link to="/cart">
              <BoxIcon>
                <ShoppingBag />
                <p className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 flex items-center justify-center text-[11px] font-semibold text-white">
                  0
                </p>
              </BoxIcon>
            </Link>

            <div className="hidden lg:grid grid-cols-2 gap-2">
              <Button isPrimary={false}>Đăng ký</Button>
              <Button>Đăng nhập</Button>
            </div>

            {/* <div className="flex items-center gap-2">
              <img
                src={avatar}
                alt="Avatar"
                className="h-[40px] w-[40px] rounded-full border-2 border-neutral-300"
              />
              <p className="text-sm font-medium">
                <span className="text-xs">Xin chào,</span> <br />{" "}
                <span>Kha</span>
              </p>
            </div> */}
            <BoxIcon className="lg:hidden">
              <MenuBar />
            </BoxIcon>
          </div>
        </nav>
      </div>
    </header>
  );
}
