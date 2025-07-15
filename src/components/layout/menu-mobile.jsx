import { XIcon } from "@/assets/icons";
import logo from "@/assets/images/logo.png";
import { Button } from "@/components/ui/button";
import { navList } from "@/constants";
import { NavLink } from "react-router";

export default function MenuMobile({ isOpen, setIsOpen }) {
  return (
    <aside
      className={`fixed inset-0 bg-black/30 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      } transition-all duration-300`}
      onClick={() => setIsOpen(false)}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`fixed right-0 top-0 h-full w-full max-w-xs bg-white ${
          isOpen ? "opacity-100 translate-x-0" : "translate-x-full opacity-0"
        } transition-all duration-300`}
      >
        <div className="flex flex-col h-full">
          <div className="flex-1">
            <div className=" flex items-center gap-2 justify-center border-b border-b-neutral-300 py-3">
              <img src={logo} alt="Logo" className="w-[45px] h-[45px]" />
              <p className="font-semibold text-2xl">Udemi</p>
            </div>
            <ul className="p-3 grid gap-2">
              {navList.map((item, index) => (
                <li
                  onClick={() => setIsOpen(false)}
                  className="menu-item text-[15px] hover:bg-neutral-100/30 rounded-lg"
                  key={`menu-mobile-${index}`}
                >
                  {item.href ? (
                    <NavLink
                      to={item.href}
                      className={({ isActive }) =>
                        `${
                          isActive ? "active bg-primary/10" : ""
                        }  w-full h-full block rounded-lg p-3`
                      }
                    >
                      {item.title}
                    </NavLink>
                  ) : (
                    <div className="p-3">{item.title}</div>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-2 p-3">
            <Button isPrimary={false}>Đăng ký</Button>
            <Button>Đăng nhập</Button>
          </div>
          <div
            onClick={() => setIsOpen(false)}
            className="absolute top-5 -left-10 w-6 h-6 bg-white rounded-full flex items-center justify-center hover:brightness-95 cursor-pointer transition-all duration-300"
          >
            <XIcon className="w-4 h-4" />
          </div>
        </div>
      </div>
    </aside>
  );
}
