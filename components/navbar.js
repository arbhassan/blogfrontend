import Image from "next/image";
import Link from "next/link";
import logo from "../public/Artboard-1@0.5x.png";

import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";

const navigation = [
  { key: 1, name: "Home", href: "/", current: false },
  { key: 2, name: "Calendar", href: "/calendar", current: false },
  { key: 3, name: "Contact", href: "/contact", current: false },
  { key: 4, name: "Documents", href: "/documents", current: false },
  { key: 5, name: "Gallery", href: "/gallery", current: false },
  { key: 6, name: "News", href: "/news", current: false },
  { key: 7, name: "101 Anniversary", href: "/101anniversary", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  return (
    <div>
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-between h-16">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex-shrink-0 flex items-center">
                    <Link href="/">
                      <Image
                        src={logo}
                        alt="Picture of the author"
                        width={120}
                        height={40}
                        className="block lg:hidden h-8 w-auto"
                      />
                    </Link>

                    {/* <img
                      className="block lg:hidden h-8 w-auto"
                      // src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                      src={logo}
                      alt="Workflow"
                    />
                    <img
                      className="hidden lg:block h-8 w-auto"
                      // src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"

                      src={logo}
                      alt="Workflow"
                    /> */}
                  </div>
                  <div className="hidden sm:block sm:ml-6">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "px-3 py-2 rounded-md text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          <Link key={item.name} href={item.href}>
                            {item.name}
                          </Link>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <a
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    <Link key={item.name} href={item.href}>
                      {item.name}
                    </Link>
                  </a>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}
