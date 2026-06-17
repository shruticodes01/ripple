import Link from "next/link";
import ToggleThemeBtn from "../ui/ToggleThemeBtn";
import SignOutButton from "../ui/SignoutButton";
import {
  Bookmark,
  CirclePower,
  Home,
  Mail,
  UserCircleIcon,
} from "lucide-react";
import { useTheme } from "@/store/themeContext/useTheme";

export default function SidebarNav() {
  const { theme } = useTheme();
  return (
    <aside
      className={`h-full sidebar__nav row-span-full pt-20 overflow-y-scroll ${theme === "light" ? "" : ""}`}
    >
      <nav className="h-full">
        <ul className="h-full flex flex-col gap-20 py-4">
          <li>
            <Link className={`flex gap-2`} href="/">
              <Home /> Home
            </Link>
          </li>
          <li>
            <Link className={`flex gap-2`} href="/profile">
              <UserCircleIcon />
              Profile
            </Link>
          </li>
          <li>
            <Link className={`flex gap-2`} href="/messages">
              <Mail /> Messages
            </Link>
          </li>
          <li>
            <Link className={`flex gap-2`} href="/bookmarks">
              <Bookmark /> Bookmarks
            </Link>
          </li>

          <li>
            <ToggleThemeBtn />
          </li>
          <ul>
            <li className="flex gap-2">
              <CirclePower />
              <SignOutButton />
            </li>
          </ul>
        </ul>
      </nav>
    </aside>
  );
}
