import { useState } from "react";
import { Link, NavLink } from "react-router";

import logo from "@/assets/images/logo.png";
import { HeartOutLine, MenuBar, ShoppingBag } from "@/assets/icons";
// import avatar from "@/assets/images/avatar.png";

import { useCourse } from "@/context/course-context";
import { Button } from "@/components/ui/button";
import { BoxIcon } from "@/components/ui/box-icon";
import MenuMobile from "@/components/layout/menu-mobile";
import { navList } from "@/constants";

export function Header() {
  const { wishlist } = useCourse();
  const wishlistCount = wishlist.length ?? 0;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      id="header"
      className="fixed left-0 w-full top-0 border-b border-neutral-200 bg-white h-[70px]"
    >
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
            {navList.map((item, index) => (
              <li className="menu-item" key={`menu-${index}`}>
                {item.href ? (
                  <NavLink
                    to={item.href}
                    className={({ isActive }) => `${isActive ? "active" : ""}`}
                  >
                    {item.title}
                  </NavLink>
                ) : (
                  item.title
                )}
              </li>
            ))}
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

            <BoxIcon>
              <ShoppingBag />
              <p className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 flex items-center justify-center text-[11px] font-semibold text-white">
                0
              </p>
            </BoxIcon>

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

            <BoxIcon className="lg:hidden" onClick={() => setIsOpen(true)}>
              <MenuBar />
            </BoxIcon>

            <MenuMobile isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
        </nav>
      </div>
    </header>
  );
}
