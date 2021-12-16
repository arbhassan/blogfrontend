import Image from "next/image";
import Link from "next/link";
// import logo from "../public/Artboard-1@0.5x.png";

import imageUrlBuilder from "@sanity/image-url";

import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import client from "../client";

// const navigation = [
//   { key: 1, name: "Home", url: "/", current: false },
//   { key: 2, name: "Calendar", url: "/calendar", current: false },
//   { key: 3, name: "Contact", url: "/contact", current: false },
//   { key: 4, name: "Documents", url: "/documents", current: false },
//   { key: 5, name: "Gallery", url: "/gallery", current: false },
//   { key: 6, name: "News", url: "/news", current: false },
//   { key: 7, name: "101 Anniversary", url: "/101anniversary", current: false },
// ];

const builder = imageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source);
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar({ navbar }) {
  let navigation = navbar;
  // navigation.map((item) => console.log(item.Item.name));

  if (navbar == 0) {
    return (
      <div>
        <p>No items found in the Navigation Bar. Please add some items to it</p>
      </div>
    );
  }

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
                        // src={logo}
                        alt="Picture of the author"
                        width={120}
                        height={40}
                        className="block lg:hidden h-8 w-auto"
                        src={
                          "https://upload.wikimedia.org/wikipedia/commons/8/89/HD_transparent_picture.png"
                        }
                      />
                    </Link>
                  </div>
                  <div className="hidden sm:block sm:ml-6">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <div
                          key={item.Item.name}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "px-3 py-2 rounded-md text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          <Link key={item.Item.name} href={item.Item.url}>
                            {item.Item.name}
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <div
                    key={item.Item.name}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    <Link key={item.Item.url} href={item.Item.url}>
                      {item.Item.name}
                    </Link>
                  </div>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}
