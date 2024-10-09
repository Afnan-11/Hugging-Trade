"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  ChevronUp,
  Menu as MenuIcon,
  XCircle,
} from "lucide-react";

export default function NavBar() {
  const [navBar, setNavBar] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const pathname = usePathname();

  const Menu = () => {
    setNavBar(!navBar);
  };

  useEffect(() => {
    const handleResize = () => {
      setNavBar(false);
    };

    window.addEventListener("resize", handleResize);

    // cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleDropdown = (dropdownName: string) => {
    setOpenDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  };

  const handleDropdownItemClick = () => {
    setOpenDropdown(null);
    setNavBar(false);
  };

  return (
    <nav className="sticky z-[55] top-0 w-full bg-white bg-opacity-30 backdrop-blur-md px-4 lg:px-20 py-2   lg:flex lg:justify-between  lg:items-center">
      <div className="lg:flex lg:justify-start lg:items-center">
        <div className="flex items-center justify-between gap-20 md:gap-96 lg:gap-0">
          <Link
            href={`/`}
            onClick={() => {
              setNavBar(false);
            }}
          >
            <Image
              src={"/HuggingPrimaryWEBSITETextAndIcon (1).svg"}
              alt="img"
              width={283}
              height={23}
              loading="eager"
              priority
              className=" xl:w-60"
            />
          </Link>

          {!navBar ? (
            <span className="cursor-pointer lg:hidden text-black" onClick={Menu}>
              <MenuIcon />
            </span>
          ) : (
            <span className="cursor-pointer lg:hidden text-black" onClick={Menu}>
              <XCircle />
            </span>
          )}
        </div>

        <ul
          className={`h-[80vh] lg:h-0   font-semibold items-center justify-center lg:justify-center lg:items-center text-center flex flex-col lg:flex lg:flex-row gap-6 lg:gap-10 text-xl lg:text-[16px] bg-opacity-50 lg:w-auto lg:pb-0 lg:pt-1 text-[#111827] ${navBar ? "block" : " hidden"
            }`}
        >
          <li>
            <div className="relative inline-block text-left z-50">
              <div
                className="flex justify-start items-center hover:bg-blue-50 px-3 cursor-pointer rounded-xl py-2"
                onClick={() => toggleDropdown("company")}
              >
                <button className="flex justify-center text-black font-medium focus:outline-none">
                  Company
                </button>
                {openDropdown === "company" ? <ChevronUp /> : <ChevronDown />}
              </div>

              {/* Dropdown Menu */}
              {openDropdown === "company" && (
                <div
                  className="absolute -translate-x-5 mt-2 w-56 rounded-xl shadow-lg bg-white"
                  role="menu"
                >
                  <div className="py-1" role="none">
                    <Link
                      href={`/affiliate`}
                      className="block px-4 m-2 py-2 text-[16px] text-black font-light hover:bg-blue-50 rounded-xl"
                      role="menuitem"
                      onClick={handleDropdownItemClick}
                    >
                      Affiliate program
                    </Link>

                    <Link
                      href={`/contact-us`}
                      className="block px-4 m-2 py-2 text-[16px] text-black font-light hover:bg-blue-50 rounded-xl"
                      role="menuitem"
                      onClick={handleDropdownItemClick}
                    >
                      Contact info
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </li>

          <li>
            <div className="relative inline-block text-left">
              <div
                className="flex justify-start items-center hover:bg-blue-50 px-3 cursor-pointer rounded-xl py-2"
                onClick={() => toggleDropdown("resources")}
              >
                <button className="flex justify-center text-black font-medium focus:outline-none">
                  Resources
                </button>
                {openDropdown === "resources" ? <ChevronUp /> : <ChevronDown />}
              </div>

              {/* Dropdown Menu */}
              {openDropdown === "resources" && (
                <div
                  className="absolute -translate-x-5 mt-2 w-56 rounded-xl shadow-lg bg-white"
                  role="menu"
                >
                  <div className="py-1" role="none">
                    <Link
                      href={"/investment-calculator"}
                      className="block px-4 m-2 py-2 text-[16px] text-black font-light hover:bg-blue-50 rounded-xl"
                      role="menuitem"
                      onClick={handleDropdownItemClick}
                    >
                      Investment Calculator
                    </Link>
                    <Link
                      href="#"
                      className="block px-4 m-2 py-2 text-[16px] text-black font-light hover:bg-blue-50 rounded-xl"
                      role="menuitem"
                      onClick={handleDropdownItemClick}
                    >
                      Blog
                    </Link>
                    <Link
                      href="#"
                      className="block px-4 m-2 py-2 text-[16px] text-black font-light hover:bg-blue-50 rounded-xl"
                      role="menuitem"
                      onClick={handleDropdownItemClick}
                    >
                      Knowledge base
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </li>

          <li
            onClick={() => {
              setNavBar(false);
            }}
            className="hover:bg-blue-50 px-3 cursor-pointer rounded-xl py-2"
          >
            <Link
              href={`/pricing`}
              className={
                pathname === `/pricing` ? "text-black" : "text-black font-medium"
              }
            >
              Pricing
            </Link>
          </li>

          <li
            onClick={() => {
              setNavBar(false);
            }}
            className="text-black hover:bg-blue-50 px-3 cursor-pointer rounded-xl py-2  lg:hidden"
          >
            <Link
              href={`/pricing`}
              className={
                pathname === `/pricing` ? "text-black" : "text-black font-medium"
              }
            >
              Log in
            </Link>
          </li>

          <li
            onClick={() => {
              setNavBar(false);
            }}
            className="text-[#2563EB] border-[1px] border-[#2563EB] hover:border-blue-400 hover:text-blue-400 px-3 cursor-pointer rounded-xl py-2 lg:hidden"
          >
            <Link
              href={`/pricing`}

            >
              Start 30 day free trial
            </Link>
          </li>


        </ul>
      </div>

      <div className="flex justify-center items-center gap-5">
        <div className="text-black hover:bg-blue-50 px-3 cursor-pointer rounded-xl py-2 hidden lg:block">
          <button>Log in</button>
        </div>
        <div className="text-[#2563EB] border-[1px] border-[#2563EB] hover:border-blue-400 hover:text-blue-400 px-3 cursor-pointer rounded-xl py-2 hidden lg:block">
          <button>Start 30 day free trial</button>
        </div>
      </div>
    </nav>
  );
}
