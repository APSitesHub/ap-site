import { useState } from 'react';
import { QuizQuestionLang } from './QuizQuestion/QuizQuestionLang';
import { QuizQuestionWho } from './QuizQuestion/QuizQuestionWho';
import { QuizTitle } from './QuizTitle/QuizTitle';
import { QuizQuestionAge } from './QuizQuestion/QuizQuestionAge';
import { QuizQuestionLevel } from './QuizQuestion/QuizQuestionLevel';

export const Quiz = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isChild, setIsChild] = useState(false);

  const beginQuiz = () => {
    setActiveSlide(1);
  };
  const continueQuiz = e => {
    e.currentTarget.classList.add('chosen');
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
        />
      )}
      {activeSlide === 2 && (
        <QuizQuestionWho
          activeSlide={activeSlide}
          continueQuiz={continueQuiz}
          continueQuizForChild={continueQuizForChild}
          previousQuestion={previousQuestion}
          nextQuestion={nextQuestion}
        />
      )}
      {activeSlide === 3 && (
        <QuizQuestionAge
          activeSlide={activeSlide}
          isChild={isChild}
          continueQuiz={continueQuiz}
          previousQuestion={previousQuestion}
          nextQuestion={nextQuestion}
        />
      )}
      {activeSlide === 4 && (
        <QuizQuestionLevel
          activeSlide={activeSlide}
          isChild={isChild}
          continueQuiz={continueQuiz}
          previousQuestion={previousQuestion}
          nextQuestion={nextQuestion}
        />
      )}
    </>
  );
};
