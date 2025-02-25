import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getQuizById } from "../features/app.slice";
import StartScreen from "../components/quiz-view/start-screen";
import QuizContent from "../components/quiz-view/quiz-content";
import { quizData } from "../data/quiz-data";

export default function QuizView() {
  const [username, setUsername] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(quizData.timeLimit * 60);
  const [quizStarted, setQuizStarted] = useState(false);
  const [showFeedback, setShowFeedback] = useState({});
  const [quizStartTime, setQuizStartTime] = useState(null);

  const isLoggedIn = useSelector((store) => store.isLoggedIn);
  const user = useSelector((store) => store.user);
  const token = useSelector((store) => store.token);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getQuizById({ id, token }));
  }, [dispatch, id, token]);

  useEffect(() => {
    if (quizStarted && !showResults && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleSubmitQuiz();
    }
  }, [timeLeft, quizStarted, showResults]);

  const handleStartQuiz = (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      setQuizStarted(true);
      setQuizStartTime(Date.now());
      setUsername(user.name || "User");
    }
  };

  const handleSubmitQuiz = () => {
    const allAnswers = { ...userAnswers };
    quizData.questions.forEach((question) => {
      if (!allAnswers[question.id]) {
        allAnswers[question.id] = [];
      }
    });
    setUserAnswers(allAnswers);
    setShowResults(true);
    const timeTaken = Math.floor((Date.now() - quizStartTime) / 1000);
    setTimeLeft(timeTaken);
    console.log(allAnswers);
  };

  const handleRetryQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers({});
    setShowResults(false);
    setTimeLeft(quizData.timeLimit * 60);
    setShowFeedback({});
    setQuizStartTime(Date.now());
  };

  if (showResults) {
    navigate("/quiz-results");
  }

  return (
    <>
      {!quizStarted ? (
        <StartScreen
          quizData={quizData}
          isLoggedIn={isLoggedIn}
          handleStartQuiz={handleStartQuiz}
        />
      ) : (
        <QuizContent
          quizData={quizData}
          currentQuestion={currentQuestion}
          userAnswers={userAnswers}
          username={username}
          timeLeft={timeLeft}
          showFeedback={showFeedback}
          setCurrentQuestion={setCurrentQuestion}
          setUserAnswers={setUserAnswers}
          setShowFeedback={setShowFeedback}
          handleSubmitQuiz={handleSubmitQuiz}
        />
      )}
    </>
  );
}
