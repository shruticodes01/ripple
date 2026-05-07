import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

export default function Header() {
  return (
    <>
      <MobileHeader className="header__mobile" />
      <DesktopHeader className="header__desktop" />
    </>
  );
}
