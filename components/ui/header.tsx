"use client";
import React from "react";
import { Button } from "./button";
import { PenBox, LayoutDashboard, IndianRupee } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Header = () => {
  const router = useRouter();

  const handleNavigation = (section: string) => {
    if (typeof window === "undefined") return;

    if (window.location.pathname === "/") {
      // On homepage, scroll to section
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Navigate to home first then scroll
      router.push(`/#${section}`);
      setTimeout(() => {
        const element = document.getElementById(section);
        element?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <Image
            src="https://res.cloudinary.com/dugygdmtz/image/upload/v1751709885/Screenshot_2025-07-05_153429_f1idjd.png"
            alt="Logo"
            width={60}
            height={60}
            className="h-12 object-contain rounded-full"
          />
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => handleNavigation("features")}
            className="text-gray-600 hover:text-blue-600"
          >
            Features
          </button>
          <button
            onClick={() => handleNavigation("testimonials")}
            className="text-gray-600 hover:text-blue-600"
          >
            Testimonials
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <Link href="/budget">
            <Button variant="outline">
              <IndianRupee size={18} />
              <span className="hidden md:inline">Budget</span>
            </Button>
          </Link>

          <Link href="/dashboard">
            <Button variant="outline">
              <LayoutDashboard size={18} />
              <span className="hidden md:inline">Dashboard</span>
            </Button>
          </Link>

          <Link href="/transaction">
            <Button className="flex items-center gap-2">
              <PenBox size={18} />
              <span className="hidden md:inline">Add Transaction</span>
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
