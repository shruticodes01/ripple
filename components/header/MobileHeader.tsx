"use client";
import { useState } from "react";
import { Bookmark, Ellipsis, Home, Mail, UserIcon, X } from "lucide-react";
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
      className={`w-full h-14 flex-col items-center fixed top z-1 p-4 ${theme === "light" ? "bg-white" : "bg-blueish-black"} ${className}`}
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
          className={`w-fit h-fit inline-flex absolute right-0 aspect-square z-9999 cursor-pointer`}
          onClick={() => setNavMenuVisible((menuVisible) => !menuVisible)}
        >
          {navMenuVisible ? <X /> : <Ellipsis />}
        </Button>
      </div>
      <nav className={``}>
        <ul
          className={`w-full h-full flex uppercase **:cursor-pointer ${!navMenuVisible ? "p-4 translate-x-full transition-transform duration-350ms ease-out" : theme === "light" && navMenuVisible ? `${navVisibleClass} bg-light-gray/50 backdrop-blur-[6rem] text-blueish-black` : theme === "dark" && navMenuVisible ? `${navVisibleClass} bg-blueish-black/60 text-light-gray backdrop-blur-[10rem]` : ""}`}
        >
          <li
            className={`p-2 ${theme === "light" ? "hover:text-blue " : "hover:text-powdered-blue-100"}`}
          >
            <Link
              className={`flex gap-2 focus-visible:p-2 not-hover:focus-visible:outline-2 focus-visible:outline-offset-3 ${theme === "light" ? "focus-visible:bg-blue/40 focus-visible:outline-blue" : theme === "dark" && navMenuVisible ? "focus-visible:bg-powdered-blue/40 focus-visible:outline-powdered-blue" : "p-3"}`}
              href="/"
              onClick={() => setNavMenuVisible((menuVisible) => !menuVisible)}
            >
              <Home /> Home
            </Link>
          </li>

          <li
            className={`p-2 hover:scale-110 hover:inset-ring-2 ${theme === "light" ? " hover:inset-ring-blue hover:shadow-[0_0_0.25rem_-0.05rem]" : "hover:inset-ring-powdered-blue hover:shadow-[0_0_0.25rem_-0.05rem]"}`}
          >
            <Link
              className={`flex gap-2 focus-visible:p-2 not-hover:focus-visible:outline-2 focus-visible:outline-offset-3 ${theme === "light" ? "focus-visible:bg-blue/40 focus-visible:outline-blue" : theme === "dark" && navMenuVisible ? "focus-visible:bg-powdered-blue/40 focus-visible:outline-powdered-blue" : "p-3"}`}
              href="/profile"
              onClick={() => setNavMenuVisible((menuVisible) => !menuVisible)}
            >
              <UserIcon /> Profile
            </Link>
          </li>

          <li
            className={`p-2 hover:scale-110 hover:inset-ring-2 ${theme === "light" ? " hover:inset-ring-blue hover:shadow-[0_0_0.25rem_-0.05rem]" : "hover:inset-ring-powdered-blue hover:shadow-[0_0_0.25rem_-0.05rem]"}`}
          >
            <Link
              className={`flex gap-2 focus-visible:p-2 not-hover:focus-visible:outline-2 focus-visible:outline-offset-3 ${theme === "light" ? "focus-visible:bg-blue/40 focus-visible:outline-blue" : "focus-visible:bg-powdered-blue/40 focus-visible:outline-powdered-blue"}`}
              href="/messages"
              onClick={() => setNavMenuVisible((menuVisible) => !menuVisible)}
            >
              <Mail /> Messages
            </Link>
          </li>

          <li
            className={`p-2 hover:scale-110 hover:inset-ring-2 ${theme === "light" ? " hover:inset-ring-blue hover:shadow-[0_0_0.25rem_-0.05rem]" : "hover:inset-ring-powdered-blue hover:shadow-[0_0_0.25rem_-0.05rem]"}`}
          >
            <Link
              className={`flex gap-2 focus-visible:p-2 not-hover:focus-visible:outline-2 focus-visible:outline-offset-3 ${theme === "light" ? "focus-visible:bg-blue/40 focus-visible:outline-blue" : "focus-visible:bg-powdered-blue/40 focus-visible:outline-powdered-blue"}`}
              href="/bookmarks"
              onToggle={() => setNavMenuVisible((menuVisible) => !menuVisible)}
            >
              <Bookmark /> Bookmarks
            </Link>
          </li>

          <li
            className={`p-2 hover:scale-110 hover:inset-ring-2 ${theme === "light" ? " hover:inset-ring-blue hover:shadow-[0_0_0.25rem_-0.05rem]" : "hover:inset-ring-powdered-blue hover:shadow-[0_0_0.25rem_-0.05rem]"}`}
          >
            <ToggleThemeBtn
              className={`uppercase focus-visible:p-2 not-hover:focus-visible:outline-2 focus-visible:outline-offset-3 ${theme === "light" ? "focus-visible:bg-blue/40 focus-visible:outline-blue" : "focus-visible:bg-powdered-blue/40 focus-visible:outline-powdered-blue"}`}
              role="menuitem"
              onToggle={() => setNavMenuVisible((menuVisible) => !menuVisible)}
            />
          </li>

          <ul className="flex flex-col gap-4">
            <li
              className={`p-2 hover:scale-110 hover:inset-ring-2 ${theme === "light" ? " hover:inset-ring-blue hover:shadow-[0_0_0.25rem_-0.05rem]" : "hover:inset-ring-powdered-blue hover:shadow-[0_0_0.25rem_-0.05rem]"}`}
            >
              <SignOutButton
                className={`uppercase focus-visible:p-2 not-hover:focus-visible:outline-2 focus-visible:outline-offset-3 ${theme === "light" ? "focus-visible:bg-blue/40 focus-visible:outline-blue" : "focus-visible:bg-powdered-blue/40 focus-visible:outline-powdered-blue"}`}
              />
            </li>
          </ul>
        </ul>
      </nav>
    </header>
  );
}
