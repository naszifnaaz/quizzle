import {
  PlusCircleIcon,
  ShareIcon,
  CheckCircleIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

export default function QuizBuilderLandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="py-4 px-8 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <a href="#" className="text-2xl font-bold flex items-center">
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

      <main className="flex-1">
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Create, Share, and Take Quizzes with Ease
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              QuizCraft is the ultimate platform for creating engaging quizzes,
              sharing them with the world, and testing knowledge on any topic.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
                Get Started
              </button>
              <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition duration-300">
                Learn More
              </button>
            </div>
          </div>
        </section>

        <section className="bg-gray-100 py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <PlusCircleIcon className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Create</h3>
                <p className="text-gray-600">
                  Design your quiz with our intuitive builder. Add questions,
                  set options, and customize the look.
                </p>
              </div>
              <div className="text-center">
                <ShareIcon className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Publish</h3>
                <p className="text-gray-600">
                  Share your quiz with a single click. Get a unique link to
                  distribute to your audience.
                </p>
              </div>
              <div className="text-center">
                <CheckCircleIcon className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Take</h3>
                <p className="text-gray-600">
                  Participants can easily access and complete the quiz. Get
                  instant results and feedback.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Create Engaging Quizzes in Minutes
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  Our user-friendly interface makes it simple to craft beautiful
                  and interactive quizzes on any topic. Add images, set time
                  limits, and choose from various question types.
                </p>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
                  Start Creating
                </button>
              </div>
              <div className="bg-gray-100 rounded-lg p-6">
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Enter your question here"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Option 1"
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                      type="text"
                      placeholder="Option 2"
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                      type="text"
                      placeholder="Option 3"
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                      type="text"
                      placeholder="Option 4"
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <button className="w-full bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 transition duration-300">
                    Add Question
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-100 py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-2xl font-bold mb-4">Your Quiz is Ready!</h3>
                <p className="text-gray-600 mb-4">
                  Share this link with your audience:
                </p>
                <div className="flex">
                  <input
                    type="text"
                    value="https://quizcraft.com/your-awesome-quiz"
                    readOnly
                    className="flex-grow p-2 border border-gray-300 rounded-l"
                  />
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-r font-semibold hover:bg-blue-700 transition duration-300">
                    Copy
                  </button>
                </div>
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Publish and Share with a Click
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  Once your quiz is ready, publish it instantly. Share the
                  unique link on social media, embed it on your website, or send
                  it directly to participants.
                </p>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
                  Learn About Sharing Options
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Take Quizzes Anytime, Anywhere
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {["Science Quiz", "History Trivia", "Pop Culture Mania"].map(
                (quiz, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-6 shadow-md"
                  >
                    <h3 className="text-xl font-bold mb-4">{quiz}</h3>
                    <p className="text-gray-600 mb-6">
                      {index === 0
                        ? "Test your knowledge of basic scientific concepts."
                        : index === 1
                        ? "Challenge yourself with questions about world history."
                        : "How well do you know movies, music, and celebrities?"}
                    </p>
                    <button className="w-full bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 transition duration-300">
                      Start Quiz
                    </button>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        <section className="bg-gray-100 py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Quizzing?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Join thousands of educators, trainers, and curious minds who are
              already using QuizCraft to create and share knowledge.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
                Sign Up Now
              </button>
              <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition duration-300 flex items-center justify-center">
                View Plans
                <ArrowRightIcon className="h-5 w-5 ml-2" />
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-6 px-4 border-t border-gray-200">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 mb-4 sm:mb-0">
            © 2024 QuizCraft. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-gray-500 hover:underline">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-gray-500 hover:underline">
              Privacy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
