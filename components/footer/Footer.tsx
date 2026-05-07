import { Bell, Home, Mail, Search } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="h-12">
      <nav className="h-full">
        <ul className="h-full flex justify-evenly items-center">
          <li>
            <Link className="" href="">
              <Home />
            </Link>
          </li>
          <li>
            <Link className="" href="">
              <Bell />
            </Link>
          </li>
          <li>
            <Link className="" href="">
              <Search />
            </Link>
          </li>
          <li>
            <Link className="" href="">
              <Mail />
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
