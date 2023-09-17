import { Dropdown, Navbar } from "flowbite-react";
import { FaRegUserCircle } from "react-icons/fa";
import styles from "./Header.module.css";

export default function Header({ variant }) {
  return (
    <>
      <Navbar
        fluid
        className={`bg-[${
          variant === "dark" ? "#1B1B1B" : "#FFFFFF"
        }] md:px-12 [font-family:'Montserrat-Medium',Helvetica]`}
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
            <Dropdown.Item>Earnings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Sign out</Dropdown.Item>
          </Dropdown>
        </div>
        <Navbar.Collapse className={`${styles.navbar__links}`}>
          <Navbar.Link
            href="#"
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
