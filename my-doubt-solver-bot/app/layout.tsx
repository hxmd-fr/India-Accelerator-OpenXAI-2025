"use client";

import "./globals.css";
import { ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

export default function RootLayout({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-50">
        {/* Navbar */}
        <header className="p-4 bg-blue-600 text-white flex justify-between items-center">
          <Link href="/">
            <h1 className="text-xl font-bold">Doubt Solver Bot</h1>
          </Link>
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-blue-500 transition-colors">
            {theme === "dark" ? (
              <SunIcon className="h-5 w-5 text-yellow-300" />
            ) : (
              <MoonIcon className="h-5 w-5 text-white" />
            )}
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-grow container mx-auto p-6">
          {children}
        </main>

        {/* Footer */}
        <footer className="p-4 text-center text-sm text-gray-500 border-t dark:border-gray-700">
          © {new Date().getFullYear()} Doubt Solver Bot
        </footer>
      </body>
    </html>
  );
}