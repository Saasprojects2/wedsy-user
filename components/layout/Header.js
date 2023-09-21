import { Dropdown, Navbar } from "flowbite-react";
import { FaRegUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import styles from "./Header.module.css";
import Link from "next/link";

export default function Header({}) {
  const [variant, setVariant] = useState("light");
  useEffect(() => {
    const myElement = document.getElementById("mainDiv");
    const isElementVisible = () => {
      if (!myElement) return false;
      const rect = myElement.getBoundingClientRect();
      return (
        rect.bottom >= 0 &&
        rect.right >= 0 &&
        rect.top <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.left <= (window.innerWidth || document.documentElement.clientWidth)
      );
    };
    const checkVisibility = () => {
      if (isElementVisible()) {
        setVariant("dark");
      } else {
        setVariant("light");
      }
    };
    checkVisibility();
    window.addEventListener("scroll", checkVisibility);
    return () => {
      window.removeEventListener("scroll", checkVisibility);
    };
  }, []);

  return (
    <>
      <Navbar
        fluid
        className={`${
          variant === "dark" ? "bg-[#1B1B1B]" : "bg-[#FFFFFF]"
        } md:px-12 [font-family:'Montserrat-Medium',Helvetica] sticky top-0 z-50 w-full`}
      >
        <Navbar.Toggle />
        <Navbar.Brand href="/">
          <img
            alt="Flowbite React Logo"
            className="mr-3 h-6 sm:h-9"
            src={variant === "dark" ? "/logo-white.png" : "/logo-black.png"}
          />
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Dropdown
            inline
            label={
              <FaRegUserCircle
                color={variant !== "dark" ? "#1B1B1B" : "#FFFFFF"}
                size={24}
              />
            }
            arrowIcon={false}
          >
            <Dropdown.Header>
              <span className="block text-sm">Bonnie Green</span>
              <span className="block truncate text-sm font-medium">
                name@flowbite.com
              </span>
            </Dropdown.Header>
            <Dropdown.Item>Dashboard</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="/login">Login</Dropdown.Item>
          </Dropdown>
        </div>
        <Navbar.Collapse className={`${styles.navbar__links}`}>
          <Navbar.Link
            href="/decor"
            className={`font-medium text-${
              variant === "dark" ? "white" : "black"
            }`}
          >
            DECOR
          </Navbar.Link>
          <Navbar.Link
            href="#"
            className={`font-medium text-${
              variant === "dark" ? "white" : "black"
            }`}
          >
            MY EVENT
          </Navbar.Link>
          <Navbar.Link
            href="#"
            className={`font-medium text-${
              variant === "dark" ? "white" : "black"
            }`}
          >
            VENUES
          </Navbar.Link>
          <Navbar.Link
            href="#"
            className={`font-medium text-${
              variant === "dark" ? "white" : "black"
            }`}
          >
            WISHLIST
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
