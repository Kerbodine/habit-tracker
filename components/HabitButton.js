import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { BiPlus, BiX } from "react-icons/bi";
import { useHabit } from "../contexts/HabitContext";

export default function HabitButton() {
  const [modalOpen, setModalOpen] = useState(false);
  const [habitTitle, setHabitTitle] = useState("");
  const [habitDate, setHabitDate] = useState(null);

  const { newHabit } = useHabit();

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const createHabit = (e) => {
    e.preventDefault();
    closeModal();
    setHabitTitle("");
    setHabitDate(null);
    newHabit({ title: habitTitle, date: habitDate });
  };

  return (
    <>
      <button
        onClick={openModal}
        className="grid h-36 w-48 place-items-center rounded-lg border-2 border-dashed border-gray-200 text-2xl text-gray-600 transition-all hover:border-solid hover:bg-gray-100"
      >
        <BiPlus />
      </button>
      <Transition appear show={modalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black/25" />
            </Transition.Child>
            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <form className="relative inline-block w-full max-w-xs transform rounded-2xl bg-white p-6 text-left align-middle shadow-lg">
                <Dialog.Title
                  as="h3"
                  className="mt-1 text-xl font-medium leading-6"
                >
                  New Habit
                </Dialog.Title>
                <div className="my-4 divide-y-2 divide-gray-200 overflow-hidden rounded-lg border-2 border-gray-200">
                  <input
                    className="w-full px-2 py-1.5 outline-none"
                    placeholder="Title"
                    value={habitTitle}
                    onChange={(e) => setHabitTitle(e.target.value)}
                  />
                  <input
                    type="date"
                    value={habitDate}
                    onChange={(e) => setHabitDate(e.target.value)}
                    className="w-full px-2 py-1.5 font-mono tracking-tight text-gray-600 outline-none"
                  />
                </div>
                <button
                  type="submit"
                  onClick={createHabit}
                  {...(!habitTitle && { disabled: true })}
                  className="w-full rounded-lg border-2 border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:border-accent hover:bg-accent hover:text-white disabled:cursor-not-allowed"
                >
                  Add Habit
                </button>
                <button
                  type="button"
                  className="absolute right-6 top-6 rounded-full p-1 text-2xl transition-colors hover:bg-gray-100"
                  onClick={closeModal}
                >
                  <BiX />
                </button>
              </form>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
