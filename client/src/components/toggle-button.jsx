import {
  ClipboardDocumentListIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";

const ToggleButton = ({
  leftOption,
  rightOption,
  isLeftSelected,
  onToggle,
}) => {
  return (
    <div className="flex justify-center">
      <div className="bg-gray-200 rounded-lg p-1 flex">
        <button
          className={`px-4 py-2 rounded-md transition-colors duration-200 flex items-center ${
            isLeftSelected
              ? "bg-white text-blue-600 shadow-md"
              : "text-gray-600 hover:bg-gray-300"
          }`}
          onClick={() => isLeftSelected || onToggle()}
        >
          <ClipboardDocumentListIcon className="h-5 w-5 mr-2" />
          {leftOption}
        </button>
        <button
          className={`px-4 py-2 rounded-md transition-colors duration-200 flex items-center ${
            !isLeftSelected
              ? "bg-white text-blue-600 shadow-md"
              : "text-gray-600 hover:bg-gray-300"
          }`}
          onClick={() => !isLeftSelected || onToggle()}
        >
          <ClipboardDocumentCheckIcon className="h-5 w-5 mr-2" />
          {rightOption}
        </button>
      </div>
    </div>
  );
};

export default ToggleButton;
