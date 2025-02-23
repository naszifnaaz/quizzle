import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import QuizBuilderLandingPage from "./routes/home";
import Dashboard from "./routes/dashboard";
import QuizDetails from "./routes/quiz-details";
import ParticipantReport from "./routes/participant-report";
import QuizView from "./routes/quiz-view";
import QuizResultPage from "./routes/quiz-results";
import { Toaster } from "react-hot-toast";
import { Login } from "./routes/login";
import { Register } from "./routes/register";
import { ResetPassword } from "./routes/reset-password";
import { NavBar } from "./components/shared/navbar";
import { useDispatch } from "react-redux";
import { initializeUser } from "./features/app.slice";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUser());
  }, []);
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<QuizBuilderLandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
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
    </div>
  );
}
