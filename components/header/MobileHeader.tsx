import {
  Bookmark,
  Sparkles,
  TextAlignStart,
  User,
  User2,
  Zap,
} from "lucide-react";
import Button from "../ui/Button";
import Image from "next/image";
import Link from "next/link";

export default function MobileHeader({ className }: { className: string }) {
  return (
    <header className={`w-full h-14 px-4 ${className}`}>
      <div className="w-full h-full flex items-center justify-between">
        <Button className="p-2 rounded-full border-2 border-black">
          <User2 />
        </Button>

        <Button>
          <Image
            src="/ripple-logo-dark.svg"
            alt="Ripple"
            width={40}
            height={40}
            priority
          />
        </Button>

        <Button>
          <Sparkles />
        </Button>
      </div>
      <nav className="hidden">
        <ul className="flex flex-col gap-4">
          <li>
            <Link className="" href="/profile">
              <User /> Profile
            </Link>
          </li>
          <li>
            <Link className="" href="/lists">
              <TextAlignStart /> Lists
            </Link>
          </li>
          <li>
            <Link className="" href="/bookmarks">
              <Bookmark /> Bookmarks
            </Link>
          </li>
          <li>
            <Link className="" href="">
              <Zap /> Moments{" "}
            </Link>
          </li>
          <li>
            <Link className="" href=""></Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link className="" href="">
              Settings and Privacy
            </Link>
          </li>
          <li>
            <Link className="" href="">
              Help Center
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
