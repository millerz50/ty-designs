"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type NavLink = {
  label: string;
  href: string;
};

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  logoSrc?: string;
  links?: NavLink[];
};

const Sidebar = ({
  isOpen,
  onClose,
  logoSrc = "/tino-logo.png",
  links,
}: SidebarProps) => {
  const router = useRouter();
  const pathname: string = usePathname();
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    setActiveSection(pathname);
  }, [pathname]);

  const defaultLinks: NavLink[] = [
    { label: "HOME", href: "/home" },
    { label: "SERVICES", href: "/services" },
    { label: "EXPERIENCES", href: "/Experiences" },
    { label: "DESIGN", href: "/design" },
    { label: "CONTACT", href: "/contact" },
  ];

  const navLinks = links ?? defaultLinks;

  if (!isOpen) return null;

  return (
    <aside className="fixed inset-0 bg-black text-white p-8 z-40 flex flex-col w-full sm:w-64 h-screen">
      {/* Close button — now visible on all screen sizes */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-2xl z-50 hover:text-yellow-400 transition duration-300"
        aria-label="Close Sidebar">
        ×
      </button>

      {/* Logo */}
      <img
        src={logoSrc}
        alt="TY Designs Logo"
        className="w-32 h-auto mb-6 mt-10 mx-auto sm:mx-0"
      />

      {/* Branding */}
      <div className="text-2xl font-extrabold tracking-wide mb-10 text-center sm:text-left">
        TY DESIGNS
      </div>

      {/* Navigation links */}
      <nav className="space-y-6 text-sm font-semibold tracking-tight w-full">
        {navLinks.map(({ label, href }) => (
          <button
            key={`${label}-${href}`}
            onClick={() => {
              router.push(href);
              setActiveSection(href);
              onClose();
            }}
            className={`block text-left w-full px-4 py-2 rounded-md font-medium transition-colors duration-300 ${
              activeSection === href
                ? "bg-yellow-500 text-black shadow-md"
                : "text-white hover:bg-yellow-500 hover:text-black"
            }`}>
            {label}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
