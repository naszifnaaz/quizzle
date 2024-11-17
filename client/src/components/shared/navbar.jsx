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
