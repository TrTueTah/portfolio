import { useState } from "react";

import { navLinks } from "../constants";
import { cn } from "../lib/utils";

interface NavItemsProps {
  onNavigate: () => void;
}

const NavItems = ({ onNavigate }: NavItemsProps) => (
  <ul className="nav-ul">
    {navLinks.map(({ id, href, name }) => (
      <li key={id} className="nav-li">
        <a href={href} className="nav-li_a" onClick={onNavigate}>
          {name}
        </a>
      </li>
    ))}

    {/* <li className="nav-li">
      <a
        href={links.sourceCode}
        target="_blank"
        rel="noreferrer noopener"
        className="nav-li_a"
        onClick={onNavigate}
      >
        Source Code
      </a>
    </li> */}
  </ul>
);

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prevOpen) => !prevOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-black/90">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto flex items-center justify-between c-space py-5">
          <a
            href="#"
            className="text-xl font-bold text-neutral-400 transition-colors hover:text-white"
          >
            Tanh Tran
          </a>

          <button
            onClick={toggleMenu}
            className="flex text-neutral-400 hover:text-white sm:hidden"
            aria-label="Toggle Menu"
          >
            <img
              src={isOpen ? "/assets/close.svg" : "/assets/menu.svg"}
              alt="Toggle"
              className="size-6"
            />
          </button>

          <nav className="hidden sm:flex">
            <NavItems onNavigate={closeMenu} />
          </nav>
        </div>
      </div>

      <div className={cn("nav-sidebar", isOpen ? "max-h-screen" : "max-h-0")}>
        <nav className="p-5">
          <NavItems onNavigate={closeMenu} />
        </nav>
      </div>
    </header>
  );
};
