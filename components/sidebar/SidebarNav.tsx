import Link from "next/link";
import ToggleThemeBtn from "../ui/ToggleThemeBtn";
import SignOutButton from "../ui/SignoutButton";
import { Bookmark, Home, Mail, UserCircleIcon } from "lucide-react";
import { useTheme } from "@/store/themeContext/useTheme";

export default function SidebarNav() {
  const { theme } = useTheme();
  return (
    <aside
      className={`h-full sidebar__nav row-span-full pt-20 overflow-y-scroll ${theme === "light" ? "" : ""}`}
    >
      <nav className="h-full">
        <ul className="h-full flex flex-col gap-20 py-4 px-2">
          <li
            className={` ${theme === "light" ? "hover:text-blue " : "hover:text-powdered-blue-100"}`}
          >
            <Link
              className={`w-full max-w-fit flex gap-2 hover:scale-110 focus-visible:outline-offset-3 ${theme === "light" ? "focus-visible:outline-2 focus-visible:outline-navy-blue focus-visible:text-blue active:text-blue" : "focus-visible:outline-2 focus-visible:outline-blue focus-visible:text-powdered-blue-100 active:text-powdered-blue-100"}`}
              href="/"
            >
              <Home /> Home
            </Link>
          </li>
          <li
            className={` ${theme === "light" ? "hover:text-blue " : "hover:text-powdered-blue-100"}`}
          >
            <Link
              className={`w-full max-w-fit flex gap-2 hover:scale-110 focus-visible:outline-offset-3 ${theme === "light" ? "focus-visible:outline-2 focus-visible:outline-navy-blue focus-visible:text-blue active:text-blue" : "focus-visible:outline-2 focus-visible:outline-blue focus-visible:text-powdered-blue-100 active:text-powdered-blue-100"}`}
              href="/profile"
            >
              <UserCircleIcon />
              Profile
            </Link>
          </li>
          <li
            className={` ${theme === "light" ? "hover:text-blue " : "hover:text-powdered-blue-100"}`}
          >
            <Link
              className={`w-full max-w-fit flex gap-2 hover:scale-110 focus-visible:outline-offset-3 ${theme === "light" ? "focus-visible:outline-2 focus-visible:outline-navy-blue focus-visible:text-blue active:text-blue" : "focus-visible:outline-2 focus-visible:outline-blue focus-visible:text-powdered-blue-100 active:text-powdered-blue-100"}`}
              href="/messages"
            >
              <Mail /> Messages
            </Link>
          </li>
          <li
            className={` ${theme === "light" ? "hover:text-blue " : "hover:text-powdered-blue-100"}`}
          >
            <Link
              className={`w-full max-w-fit flex gap-2 hover:scale-110 focus-visible:outline-offset-3 ${theme === "light" ? "focus-visible:outline-2 focus-visible:outline-navy-blue focus-visible:text-blue active:text-blue" : "focus-visible:outline-2 focus-visible:outline-blue focus-visible:text-powdered-blue-100 active:text-powdered-blue-100"}`}
              href="/bookmarks"
            >
              <Bookmark /> Bookmarks
            </Link>
          </li>

          <li
            className={` ${theme === "light" ? "hover:text-blue " : "hover:text-powdered-blue-100"}`}
          >
            <ToggleThemeBtn
              className={`w-full max-w-fit hover:scale-110 focus-visible:outline-offset-3 ${theme === "light" ? "focus-visible:outline-2 focus-visible:outline-navy-blue focus-visible:text-blue" : "focus-visible:outline-2 focus-visible:outline-blue focus-visible:text-powdered-blue-100"}`}
            />
          </li>
          <ul>
            <li
              className={` ${theme === "light" ? "hover:text-blue " : "hover:text-powdered-blue-100"}`}
            >
              <SignOutButton
                className={`w-full max-w-fit hover:scale-110 focus-visible:outline-offset-3 ${theme === "light" ? "focus-visible:outline-2 focus-visible:outline-navy-blue focus-visible:text-blue" : "focus-visible:outline-2 focus-visible:outline-blue focus-visible:text-powdered-blue-100 "}`}
              />
            </li>
          </ul>
        </ul>
      </nav>
    </aside>
  );
}
