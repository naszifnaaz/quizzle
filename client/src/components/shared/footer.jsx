export function Footer() {
  return (
    <footer className="py-6 px-4 border-t border-gray-800">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center">
        <p className="text-sm text-gray-400 mb-4 sm:mb-0">
          © 2024 Quizzle. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a
            href="#"
            className="text-sm text-gray-400 hover:text-white transition duration-300"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="text-sm text-gray-400 hover:text-white transition duration-300"
          >
            Privacy
          </a>
        </div>
      </div>
    </footer>
  );
}
