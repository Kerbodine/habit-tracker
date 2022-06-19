import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { BiDotsVerticalRounded, BiTrash } from "react-icons/bi";
import { useHabit } from "../contexts/HabitContext";

export default function HabitMenu({ id }) {
  const { deleteHabit } = useHabit();

  return (
    <Menu as="div" className="relative">
      <div>
        <Menu.Button className="grid h-8 w-8 place-items-center rounded-lg border-2 border-gray-300 bg-gray-100 text-2xl text-gray-600 transition-all hover:border-gray-400 hover:bg-gray-200">
          <BiDotsVerticalRounded />
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
        <Menu.Items className="absolute right-0 z-20 mt-1.5 w-28 origin-top-right divide-gray-200 rounded-lg border-2 border-gray-200 bg-white p-1.5 shadow-md focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <div
                className={`${
                  active && "bg-gray-100"
                } group flex w-full cursor-pointer items-center rounded-md px-1.5 py-1.5 text-sm font-medium text-gray-700`}
                onClick={() => deleteHabit(id)}
              >
                <>
                  <span className="mr-1 text-2xl">
                    <BiTrash />
                  </span>
                  Delete
                </>
              </div>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
