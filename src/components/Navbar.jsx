import React, { useContext, useEffect, useState } from 'react'
import { Navbar as HeroNavbar, NavbarBrand, NavbarContent, NavbarItem, Button, User, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSection } from "@heroui/react";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../contexts/AuthContext';
import { script } from 'framer-motion/client';
import { PlusIcon } from 'lucide-react';
import UserDropdown from './UserDropdown';


export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(authContext);
  const [isScrolled, setIsScrolled] = useState(false);

  function logout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  }

  useEffect(() => {
    const throttledScrollHandler = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', throttledScrollHandler);
    return () => {
      window.removeEventListener('scroll', throttledScrollHandler);
    };
  }, []);

  return (
    <HeroNavbar className={`max-w-[calc(100vw-20px)] top-1 mx-auto transition-all duration-500 rounded-2xl  ${isScrolled ? " lg:rounded-4xl  lg:w-[1024px] top-2" : ""}`} >
      <NavbarBrand className='cursor-pointer' as={Link} to="/">
        <AcmeLogo />
        <p className="font-bold text-inherit">Borhom</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
      </NavbarContent>
      <NavbarContent justify="end">
        {isLoggedIn ?
          <NavbarItem>
            <UserDropdown logout={logout} />
          </NavbarItem>
          : <>
            <NavbarItem className="flex">
              <Button className="default" variant="flat">
                Login
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button color="primary" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </>
        }
      </NavbarContent>
    </HeroNavbar>
  )
}
