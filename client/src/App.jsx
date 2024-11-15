import { Route, Routes } from "react-router-dom";
import QuizBuilderLandingPage from "./routes/home";
import Dashboard from "./routes/console";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<QuizBuilderLandingPage />} />
      <Route path="/console" element={<Dashboard />} />
    </Routes>
  );
}
