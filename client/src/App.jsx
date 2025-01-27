import { Route, Routes } from "react-router-dom";
import QuizBuilderLandingPage from "./routes/home";
import Dashboard from "./routes/dashboard";
import QuizDetails from "./routes/quiz-details";
import ParticipantReport from "./routes/participant-report";
import QuizView from "./routes/quiz-view";
import QuizResultPage from "./routes/quiz-results";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<QuizBuilderLandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/quiz/:id" element={<QuizDetails />} />
        <Route
          path="/report/:quizId/:username"
          element={<ParticipantReport />}
        />
        <Route path="/quiz" element={<QuizView />} />
        <Route path="/quiz-results" element={<QuizResultPage />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}
