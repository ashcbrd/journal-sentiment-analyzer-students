"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { RiLogoutCircleRFill } from "react-icons/ri";

import navbar from "../data/navlinks.json";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUser } from "@/context/user-context";

const Navbar = () => {
  const navbarData = navbar.data;
  const pathname = usePathname();
  const { logout } = useUser();

  const [isAtTop, setIsAtTop] = useState<boolean>(window.scrollY === 0);

  useEffect(() => {
    const handleScroll = (): void => {
      setIsAtTop(window.scrollY === 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="flex justify-center">
      <ul
        className={`transition-all fixed flex items-center mt-6 text-primary text-lg p-2 justify-between overflow-hidden ${
          isAtTop
            ? "w-[600px]"
            : "w-[400px] text-sm border rounded-full bg-secondary border-zinc-200 shadow-md mt-[40px]"
        }`}
      >
        {navbarData.map((item, index) => {
          const isActive = pathname === item.url;
          return (
            <li key={index} className="relative w-max py-2">
              <Link
                className={`relative px-8 z-50 ${
                  isActive ? "text-secondary" : "text-primary"
                }`}
                href={item.url}
              >
                {item.label}
              </Link>
              {isActive && (
                <motion.div
                  layout
                  layoutId="nav-active"
                  className={`absolute bg-primary w-full h-full top-0 rounded-full z-10 ${
                    isAtTop ? "" : ""
                  }`}
                />
              )}
            </li>
          );
        })}
      </ul>
      <Button variant="ghost" className="absolute right-8 top-8 m-auto">
        <Dialog>
          <DialogTrigger>
            <RiLogoutCircleRFill size={30} />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure you want to log out?</DialogTitle>
            </DialogHeader>
            <Button onClick={logout} className="ml-auto">
              Log Out
            </Button>
          </DialogContent>
        </Dialog>
      </Button>
    </nav>
  );
};

export default Navbar;
