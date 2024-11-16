import { Route, Routes } from "react-router-dom";
import QuizBuilderLandingPage from "./routes/home";
import Dashboard from "./routes/console";
import QuizDetails from "./routes/quiz-details";
import ParticipantReport from "./routes/participant-report";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<QuizBuilderLandingPage />} />
      <Route path="/console" element={<Dashboard />} />
      <Route path="/quiz/:id" element={<QuizDetails />} />
      <Route path="/report/:quizId/:username" element={<ParticipantReport />} />
    </Routes>
  );
}
