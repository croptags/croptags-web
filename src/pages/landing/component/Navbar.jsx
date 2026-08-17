// import React, { useState } from "react";
import logo from "@/assets/logo.svg";

export const Navbar = () => {
  // const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-16 left-9 right-9 bg-white/80 backdrop-blur-xl rounded-full p-6 flex items-center justify-between">
      {/* Logo */}
      <a href="#" className="flex items-center">
        <img
          src={logo}
          alt="CropTags Logo"
          className="h-6 w-auto object-contain"
        />
      </a>

      {/* Nav Links (Centered - Desktop) */}
      <ul className="hidden md:flex items-center gap-8 font-medium text-gray-700">
        <li>
          <a
            href="#how-it-works"
            className="hover:text-black transition-colors"
          >
            How it works
          </a>
        </li>
        <li>
          <a href="#feature" className="hover:text-black transition-colors">
            Feature
          </a>
        </li>
        <li>
          <a href="#for-farmer" className="hover:text-black transition-colors">
            For Farmer
          </a>
        </li>
        <li>
          <a href="#for-buyer" className="hover:text-black transition-colors">
            For Buyer
          </a>
        </li>
      </ul>

      {/* Action Button (Desktop) */}
      <div className="hidden md:block">
        <button className="bg-black text-white px-6 py-2.5 rounded-full font-medium hover:bg-gray-800 transition-colors">
          Contact Us
        </button>
      </div>

      {/* Mobile Menu Toggle Button */}
      {/* <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-gray-700 focus:outline-none"
        aria-label="Toggle Menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button> */}

      {/* Mobile Menu Dropdown */}
      {/* {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-3 bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-xl md:hidden flex flex-col gap-4 text-gray-800 font-medium text-center border border-gray-100">
          <a
            href="#how-it-works"
            onClick={() => setIsOpen(false)}
            className="hover:text-black py-1"
          >
            How it works
          </a>
          <a
            href="#feature"
            onClick={() => setIsOpen(false)}
            className="hover:text-black py-1"
          >
            Feature
          </a>
          <a
            href="#for-farmer"
            onClick={() => setIsOpen(false)}
            className="hover:text-black py-1"
          >
            For Farmer
          </a>
          <a
            href="#for-buyer"
            onClick={() => setIsOpen(false)}
            className="hover:text-black py-1"
          >
            For Buyer
          </a>
          <button className="w-full bg-black text-white py-3 rounded-full font-medium hover:bg-gray-800 transition-colors mt-2">
            Get Started
          </button>
        </div>
      )} */}
    </nav>
  );
};
