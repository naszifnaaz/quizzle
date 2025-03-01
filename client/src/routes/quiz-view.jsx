import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getQuizById } from "../features/app.slice";
import StartScreen from "../components/quiz-view/start-screen";
import QuizContent from "../components/quiz-view/quiz-content";
import { quizData } from "../data/quiz-data";

export default function QuizView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((store) => store.isLoggedIn);
  const isLoading = useSelector((store) => store.isLoading);
  const user = useSelector((store) => store.user);
  const token = useSelector((store) => store.token);
  const currentQuiz = useSelector((store) => store.currentQuiz);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(
    currentQuiz ? currentQuiz.timeLimit * 60 : 60
  );
  const [quizStarted, setQuizStarted] = useState(false);
  const [showFeedback, setShowFeedback] = useState({});
  const [quizStartTime, setQuizStartTime] = useState(null);

  useEffect(() => {
    dispatch(getQuizById(id));
  }, [dispatch, id]);

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

  if (!user || !currentQuiz || isLoading) return <h1>Loading..</h1>;

  if (showResults) {
    navigate("/quiz-results");
  }

  return (
    <>
      {!quizStarted ? (
        <StartScreen
          quizData={currentQuiz}
          isLoggedIn={isLoggedIn}
          handleStartQuiz={handleStartQuiz}
        />
      ) : (
        <QuizContent
          quizData={quizData}
          currentQuestion={currentQuestion}
          userAnswers={userAnswers}
          username={user.name}
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
