import {
  PlusCircleIcon,
  XMarkIcon,
  TrashIcon,
  CheckCircleIcon,
  ClockIcon,
  DocumentTextIcon,
  PencilIcon,
  CheckIcon,
  PlusIcon,
  MinusIcon,
} from "@heroicons/react/24/outline";

function QuestionCard({ question, index, onUpdate, onDelete }) {
  const handleOptionChange = (optionIndex, value) => {
    const newOptions = [...question.options];
    newOptions[optionIndex] = { ...newOptions[optionIndex], text: value };
    onUpdate({ ...question, options: newOptions });
  };

  const handleCorrectOptionToggle = (optionIndex) => {
    const newOptions = [...question.options];
    newOptions[optionIndex] = {
      ...newOptions[optionIndex],
      isCorrect: !newOptions[optionIndex].isCorrect,
    };
    onUpdate({ ...question, options: newOptions });
  };

  const addOption = () => {
    if (question.options.length < 4) {
      const newOptions = [...question.options, { text: "", isCorrect: false }];
      onUpdate({ ...question, options: newOptions });
    }
  };

  const removeOption = (optionIndex) => {
    if (question.options.length > 2) {
      const newOptions = question.options.filter(
        (_, index) => index !== optionIndex
      );
      onUpdate({ ...question, options: newOptions });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <DocumentTextIcon className="h-5 w-5 mr-2 text-blue-500" />
          Question {index + 1}
        </h3>
        <button
          onClick={() => onDelete(index)}
          className="text-red-500 hover:text-red-700 transition-colors"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="mb-4">
        <div className="flex items-center bg-gray-50 rounded-lg p-3">
          <PencilIcon className="h-5 w-5 text-gray-400 mr-2" />
          <input
            type="text"
            value={question.text}
            onChange={(e) => onUpdate({ ...question, text: e.target.value })}
            placeholder="Enter your question"
            className="bg-transparent w-full focus:outline-none"
          />
        </div>
      </div>

      <div className="space-y-3">
        {question.options.map((option, optionIndex) => (
          <div key={optionIndex} className="flex items-center gap-2">
            <button
              onClick={() => handleCorrectOptionToggle(optionIndex)}
              className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                option.isCorrect
                  ? "bg-green-500 border-green-500 text-white"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              {option.isCorrect && <CheckIcon className="h-4 w-4" />}
            </button>
            <input
              type="text"
              value={option.text}
              onChange={(e) => handleOptionChange(optionIndex, e.target.value)}
              placeholder={`Option ${optionIndex + 1}`}
              className="flex-grow bg-gray-50 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {question.options.length > 2 && (
              <button
                onClick={() => removeOption(optionIndex)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <MinusIcon className="h-5 w-5" />
              </button>
            )}
          </div>
        ))}
      </div>

      {question.options.length < 4 && (
        <button
          onClick={addOption}
          className="mt-4 flex items-center text-blue-600 hover:text-blue-800 font-medium"
        >
          <PlusIcon className="h-5 w-5 mr-1" />
          Add Option
        </button>
      )}
    </div>
  );
}

export default function CreateQuizSlider({ isOpen, onClose }) {
  const [title, setTitle] = useState("");
  const [timeLimit, setTimeLimit] = useState(10);
  const [questions, setQuestions] = useState([
    {
      text: "",
      options: [
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ],
    },
  ]);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        text: "",
        options: [
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
        ],
      },
    ]);
  };

  const handleUpdateQuestion = (index, updatedQuestion) => {
    const newQuestions = [...questions];
    newQuestions[index] = updatedQuestion;
    setQuestions(newQuestions);
  };

  const handleDeleteQuestion = (index) => {
    if (questions.length > 1) {
      const newQuestions = questions.filter((_, i) => i !== index);
      setQuestions(newQuestions);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, timeLimit, questions });
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`fixed inset-y-0 right-0 w-full md:w-[48rem] bg-gray-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <PlusCircleIcon className="h-7 w-7 text-blue-600 mr-2" />
              Create New Quiz
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quiz Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter quiz title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time Limit (minutes)
                  </label>
                  <div className="flex items-center bg-gray-50 rounded-lg p-3 w-32">
                    <ClockIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <input
                      type="number"
                      value={timeLimit}
                      onChange={(e) => setTimeLimit(parseInt(e.target.value))}
                      min="1"
                      className="w-full bg-transparent focus:outline-none"
                      required
                    />
                  </div>
                </div>
              </div>

              {questions.map((question, index) => (
                <QuestionCard
                  key={index}
                  question={question}
                  index={index}
                  onUpdate={(updatedQuestion) =>
                    handleUpdateQuestion(index, updatedQuestion)
                  }
                  onDelete={() => handleDeleteQuestion(index)}
                />
              ))}

              <button
                type="button"
                onClick={handleAddQuestion}
                className="w-full py-3 bg-white rounded-xl shadow-md hover:bg-gray-50 text-blue-600 font-semibold flex items-center justify-center"
              >
                <PlusCircleIcon className="h-5 w-5 mr-2" />
                Add New Question
              </button>
            </form>
          </div>

          <div className="px-6 py-4 bg-white shadow-sm mt-auto">
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <CheckCircleIcon className="h-5 w-5 mr-2" />
              Publish Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
