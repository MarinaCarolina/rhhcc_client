'use client';
import React, { useEffect } from 'react';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Logo from './Logo';
import SearchInput from './SearchInput';
import NavLinks from './NavLinks';
import useNavbarStore from '@/app/utils/navbar/useNavbarStore';
import { usePathname } from 'next/navigation';
import Dropdown from '@/app/utils/dropdown/Dropdown';

const Navbar = () => {
  const { setActiveNav, profileDropdownItems } = useNavbarStore();
  const pathname = usePathname();

  useEffect(() => {
    setActiveNav(pathname);
  }, [pathname, setActiveNav]);

  return (
      <Disclosure as="nav" className="fixed top-0 left-0 w-full bg-gray-800 z-50 shadow-lg">
        {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">

                  {/* Mobile Menu Button */}
                  <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                      {open ? (
                          <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                          <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                      )}
                      <span className="sr-only">Open main menu</span>
                    </DisclosureButton>
                  </div>

                  {/* Logo and Nav Links */}
                  <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                    <Logo />
                    <div className="hidden sm:ml-6 sm:flex">
                      <NavLinks />
                    </div>
                  </div>

                  {/* Search Input and Profile Dropdown */}
                  <div className="absolute inset-y-0 right-0 flex items-center space-x-4 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <SearchInput />
                    {/* Profile Dropdown */}
                    <Dropdown items={profileDropdownItems} />
                  </div>
                </div>
              </div>

              {/* Mobile Menu */}
              <DisclosurePanel className="sm:hidden">
                <div className="flex flex-col items-start px-4 pt-4 pb-3 space-y-2 w-full bg-gray-800">
                  <NavLinks />
                </div>
              </DisclosurePanel>
            </>
        )}
      </Disclosure>
  );
};

export default Navbar;
