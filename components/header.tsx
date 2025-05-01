"use client";
import React from 'react'
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "./ui/sheet"
import { useEffect, useState } from "react";
import { Menu, Plane } from "lucide-react";

  
export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Plane className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">Voyage</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className="text-foreground/80 hover:text-foreground transition-colors"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-foreground/80 hover:text-foreground transition-colors"
          >
            About
          </Link>
          <Link
            href="/destinations"
            className="text-foreground/80 hover:text-foreground transition-colors"
          >
            Destinations
          </Link>
          <Link
            href="/contact"
            className="text-foreground/80 hover:text-foreground transition-colors"
          >
            Contact
          </Link>
          <ThemeToggle />
        </nav>

        {/* Mobile Navigation */}
        <div className="flex items-center space-x-4 md:hidden">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-4 mt-6">
                <Link
                  href="/"
                  className="text-foreground/80 hover:text-foreground transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="text-foreground/80 hover:text-foreground transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/destinations"
                  className="text-foreground/80 hover:text-foreground transition-colors"
                >
                  Destinations
                </Link>
                <Link
                  href="/contact"
                  className="text-foreground/80 hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}