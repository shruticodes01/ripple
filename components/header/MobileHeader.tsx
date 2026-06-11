"use client";
import { useState } from "react";
import { ArrowLeft, Bookmark, Ellipsis, UserIcon, X } from "lucide-react";
import Button from "../ui/Button";
import Image from "next/image";
import Link from "next/link";
import ToggleThemeBtn from "../ui/ToggleThemeBtn";
import SignOutButton from "../ui/SignoutButton";
import { useTheme } from "@/store/themeContext/useTheme";

export default function MobileHeader({ className }: { className: string }) {
  const [navMenuVisible, setNavMenuVisible] = useState(false);

  const { theme } = useTheme();

  const navVisibleClass =
    "flex-col items-start justify-around fixed z-1000 inset-[0_0_0_30%] p-[min(30vh,10rem)_1.5rem] translate-x-0";

  return (
    <header
      className={`w-full h-14 flex-col items-center fixed top z-1 p-4 ${className}`}
    >
      <div className="w-full h-full flex items-center justify-between relative">
        {/* <Link className="w-full max-w-fit" href="/">
          <ArrowLeft />
        </Link> */}

        <Link className="" href="/">
          <Image
            src="/ripple-logo-dark.svg"
            alt="Ripple"
            width={40}
            height={40}
            priority
          />
        </Link>

        <Button
          className={`w-fit h-fit inline-flex absolute right-0 aspect-square z-9999 cursor-pointer ${theme === "light" ? "text-blueish-black" : "text-white"}`}
          onClick={() => setNavMenuVisible((menuVisible) => !menuVisible)}
        >
          {navMenuVisible ? <X /> : <Ellipsis />}
        </Button>
      </div>
      <nav className={``}>
        <ul
          className={`w-full h-full flex uppercase **:cursor-pointer ${!navMenuVisible ? "translate-x-full transition-transform duration-350ms ease-out" : theme === "light" && navMenuVisible ? `${navVisibleClass} bg-white/50 backdrop-blur-[6rem] text-blueish-black` : theme === "dark" && navMenuVisible ? `${navVisibleClass} bg-blueish-black/50 text-white backdrop-blur-[6rem]` : ""}`}
        >
          <li className="p-2">
            <Link className="flex gap-2" href="/profile">
              <UserIcon /> Profile
            </Link>
          </li>

          <li className="p-2">
            <Link className="flex gap-2" href="/bookmarks">
              <Bookmark /> Bookmarks
            </Link>
          </li>

          <li className="p-2">
            <ToggleThemeBtn
              role="menuitem"
              onToggle={() => setNavMenuVisible((menuVisible) => !menuVisible)}
            />
          </li>

          <ul className="flex flex-col gap-4">
            <li className="p-2">
              <SignOutButton />
            </li>
          </ul>
        </ul>
      </nav>
    </header>
  );
}
