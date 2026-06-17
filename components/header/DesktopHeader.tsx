"use client";
import { useAuth } from "@/store/authContext/useAuth";
import { useTheme } from "@/store/themeContext/useTheme";

import Image from "next/image";
import Link from "next/link";

export default function DesktopHeader({ className }: { className: string }) {
  const { theme } = useTheme();
  const { user } = useAuth();

  const capitalizedName = user?.fullName
    .split(" ")
    .map((str) => str.charAt(0).toUpperCase() + str.substring(1))
    .join(" ");

  return (
    <header
      className={`w-full h-14 px-4 fixed top z-1 ${theme === "light" ? "bg-white" : "bg-blueish-black"} ${className}`}
    >
      <nav className="w-full h-full">
        <ul className="w-full h-full flex items-center justify-between">
          <li>
            <Link href="/">
              <Image
                src="/ripple-logo-dark.svg"
                alt="Ripple"
                width={40}
                height={40}
                priority
              />
            </Link>
          </li>
          <ul className="flex gap-4">
            {user ? (
              <li>
                <p>{`Hi! ${capitalizedName}`}</p>
              </li>
            ) : (
              <>
                <li
                  className={`px-3 py-1 rounded-md ${theme === "light" ? "bg-blueish-black text-light-gray hover:bg-navy-blue " : "bg-light-gray text-blueish-black hover:bg-powdered-blue hover:shadow-light-gray hover:shadow-[0_0_0.15rem_0.01rem]"}`}
                >
                  <Link href="/signin">Sign In</Link>
                </li>
                <li className={`px-3 py-1 ${theme === "light" ? "" : ""}`}>
                  <Link href="/signup">Sign Up</Link>
                </li>
              </>
            )}
          </ul>
        </ul>
      </nav>
    </header>
  );
}
