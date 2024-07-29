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
import { Avatar } from "@/components/ui/avatar";

const Navbar = () => {
  const navbarData = navbar.data;
  const pathname = usePathname();
  const { logout } = useUser();

  return (
    <nav className="fixed h-20 w-full  border-b shadow-md shadow-gray-300/70 backdrop-blur-md top-0 flex items-center justify-center">
      <div className="max-w-7xl mx-auto flex justify-between items-center w-full">
        <Link href="/journal">
          <h2 className="font-bold text-lg">LOGO HERE</h2>
        </Link>
        <ul className="relative flex items-center text-primary text-lg p-2 justify-center overflow-hidden">
          {navbarData.map((item, index) => {
            const isActive = pathname === item.url;
            return (
              <li key={index}>
                <Link
                  className={`relative px-8 z-50 ${
                    isActive ? "font-bold" : ""
                  }`}
                  href={item.url}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <Dialog>
          <DialogTrigger>
            <Button variant="secondary" className="flex gap-x-2">
              <p>Logout</p>
              <RiLogoutCircleRFill />
            </Button>
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
      </div>
    </nav>
  );
};

export default Navbar;
