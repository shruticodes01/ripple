import { Bell, Home, Mail, Search } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full h-12 fixed bottom-0 right-0">
      <nav className="mx-auto">
        <ul className="h-full flex justify-between items-center px-4">
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
