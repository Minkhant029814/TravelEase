import React from "react";

import {
  GlobeIcon,
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
} from "lucide-react";
import Link from "next/link";
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <div className="flex justify-center items-center mb-8">
          <GlobeIcon className="h-8 w-8 text-blue-400" />
          <span className="ml-2 text-xl font-bold">TravelEase</span>
        </div>
        <nav
          className="flex flex-wrap justify-center -mx-5 -my-2"
          aria-label="Footer"
        >
          <div className="px-5 py-2">
            <Link href="/" className="text-base text-gray-300 hover:text-white">
              Home
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link
              href="/destinations"
              className="text-base text-gray-300 hover:text-white"
            >
              Destinations
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link
              href="/travel-tips"
              className="text-base text-gray-300 hover:text-white"
            >
              Travel Tips
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link
              href="/support"
              className="text-base text-gray-300 hover:text-white"
            >
              Cushrefmer Support
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link href="#" className="text-base text-gray-300 hover:text-white">
              About Us
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link href="#" className="text-base text-gray-300 hover:text-white">
              Privacy Policy
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link href="#" className="text-base text-gray-300 hover:text-white">
              Terms of Service
            </Link>
          </div>
        </nav>
        <div className="mt-8 flex justify-center space-x-6">
          <a href="#" className="text-gray-400 hover:text-gray-300">
            <FacebookIcon className="h-6 w-6" />
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-300">
            <InstagramIcon className="h-6 w-6" />
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-300">
            <TwitterIcon className="h-6 w-6" />
          </a>
        </div>
        <p className="mt-8 text-center text-base text-gray-400">
          &copy; 2023 TravelEase, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
export default Footer;
