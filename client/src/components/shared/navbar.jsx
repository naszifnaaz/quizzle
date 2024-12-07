import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

import { PlusCircleIcon } from "@heroicons/react/24/outline";

export const NavBar = () => {
  return (
    <header className="py-4 px-8 border-b border-gray-200">
      <div className="flex justify-between items-center">
        <a href="/" className="text-2xl font-bold flex items-center">
          <PlusCircleIcon className="h-8 w-8 mr-2" />
          Quizzle
          <div className="relative group">
            <button
              type="button"
              className="ml-4 text-white bg-pink-500 hover:bg-pink-600 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-md text-xs px-4 py-2 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
            >
              Test Mode
            </button>
            <div
              id="tooltip-default"
              role="tooltip"
              className="absolute z-10 hidden text-sm font-medium text-gray-800 bg-gray-200 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 dark:bg-gray-700 dark:text-white px-3 py-2 group-hover:block group-hover:opacity-100 top-full mt-1 whitespace-nowrap"
            >
              API's may be slow due to server wake-up time.
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
          </div>
        </a>
        <div className="flex gap-6">
          <header>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
        </div>
      </div>
    </header>
  );
};
