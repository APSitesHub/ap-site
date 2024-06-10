import { useRef, useState } from 'react';
import { QuizQuestionLang } from './QuizQuestion/QuizQuestionLang';
import { QuizQuestionWho } from './QuizQuestion/QuizQuestionWho';
import { QuizTitle } from './QuizTitle/QuizTitle';
import { QuizQuestionAge } from './QuizQuestion/QuizQuestionAge';
import { QuizQuestionLevel } from './QuizQuestion/QuizQuestionLevel';
import { QuizQuestionQuantity } from './QuizQuestion/QuizQuestionQuantity';
import { QuizQuestionDifficulties } from './QuizQuestion/QuizQuestionDifficulties';
import { QuizQuestionInterests } from './QuizQuestion/QuizQuestionInterests';
import { QuizQuestionForm } from './QuizQuestion/QuizQuestionForm';
import { QuizRedirect } from './QuizRedirect/QuizRedirect';

export const Quiz = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isChild, setIsChild] = useState(false);

  const quizValues = useRef();

  const beginQuiz = () => {
    setActiveSlide(1);
  };
  const continueQuiz = e => {
    e.currentTarget.classList.add('chosen');
    quizValues.current.adult && setIsChild(false);
    setActiveSlide(slide => (slide += 1));
  };
  const continueQuizForChild = e => {
    setIsChild(true);
    continueQuiz(e);
  };
  const previousQuestion = () => {
    setActiveSlide(slide => slide - 1);
  };
  const nextQuestion = () => {
    setActiveSlide(slide => slide + 1);
  };

  return (
    <>
      {activeSlide === 0 && <QuizTitle beginQuiz={beginQuiz} />}
      {activeSlide === 1 && (
        <QuizQuestionLang
          continueQuiz={continueQuiz}
          activeSlide={activeSlide}
          previousQuestion={previousQuestion}
          nextQuestion={nextQuestion}
          quizValues={quizValues}
        />
      )}
      {activeSlide === 2 && (
        <QuizQuestionWho
          activeSlide={activeSlide}
          continueQuiz={continueQuiz}
          continueQuizForChild={continueQuizForChild}
          previousQuestion={previousQuestion}
          nextQuestion={nextQuestion}
          quizValues={quizValues}
        />
      )}
      {activeSlide === 3 && (
        <QuizQuestionAge
          activeSlide={activeSlide}
          isChild={isChild}
          continueQuiz={continueQuiz}
          previousQuestion={previousQuestion}
          nextQuestion={nextQuestion}
          quizValues={quizValues}
        />
      )}
      {activeSlide === 4 && (
        <QuizQuestionLevel
          activeSlide={activeSlide}
          isChild={isChild}
          continueQuiz={continueQuiz}
          previousQuestion={previousQuestion}
          nextQuestion={nextQuestion}
          quizValues={quizValues}
        />
      )}
      {activeSlide === 5 && (
        <QuizQuestionQuantity
          activeSlide={activeSlide}
          continueQuiz={continueQuiz}
          previousQuestion={previousQuestion}
          nextQuestion={nextQuestion}
          quizValues={quizValues}
        />
      )}
      {activeSlide === 6 && (
        <QuizQuestionDifficulties
          activeSlide={activeSlide}
          continueQuiz={continueQuiz}
          previousQuestion={previousQuestion}
          nextQuestion={nextQuestion}
          quizValues={quizValues}
        />
      )}
      {activeSlide === 7 && (
        <QuizQuestionInterests
          activeSlide={activeSlide}
          continueQuiz={continueQuiz}
          previousQuestion={previousQuestion}
          nextQuestion={nextQuestion}
          quizValues={quizValues}
        />
      )}
      {activeSlide === 8 && (
        <QuizQuestionForm
          nextQuestion={nextQuestion}
          quizValues={quizValues}
          activeSlide={activeSlide}
          previousQuestion={previousQuestion}
        />
      )}
      {activeSlide === 9 && <QuizRedirect />}
    </>
  );
};
