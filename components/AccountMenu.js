import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { BiLogOut } from "react-icons/bi";
import { useAuth } from "../contexts/AuthContext";

export default function AccountMenu() {
  const { user, logout } = useAuth();

  return (
    <Menu as="div" className="group relative">
      <div>
        <Menu.Button className="grid h-10 w-10 place-items-center rounded-lg bg-gray-100 text-xl font-semibold text-gray-600 transition-colors group-hover:bg-accent group-hover:text-white">
          {user.displayName[0]}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-1.5 w-40 origin-top-right divide-gray-200 rounded-lg border-2 border-gray-200 bg-white p-1.5 shadow-md focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <div
                className={`${
                  active && "bg-gray-100"
                } group flex w-full cursor-pointer items-center rounded-md px-1.5 py-1.5 text-sm font-medium text-gray-700`}
                onClick={logout}
              >
                <>
                  <span className="mr-1 text-2xl">
                    <BiLogOut />
                  </span>
                  Logout
                </>
              </div>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
