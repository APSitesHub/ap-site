import { useRef, useState } from 'react';
import { QuizQuestionAge } from './QuizQuestion/QuizQuestionAge';
import { QuizQuestionDifficulties } from './QuizQuestion/QuizQuestionDifficulties';
import { QuizQuestionForm } from './QuizQuestion/QuizQuestionForm';
import { QuizQuestionInterests } from './QuizQuestion/QuizQuestionInterests';
import { QuizQuestionLang } from './QuizQuestion/QuizQuestionLang';
import { QuizQuestionLevel } from './QuizQuestion/QuizQuestionLevel';
import { QuizQuestionQuantity } from './QuizQuestion/QuizQuestionQuantity';
import { QuizQuestionWho } from './QuizQuestion/QuizQuestionWho';
import { QuizRedirect } from './QuizRedirect/QuizRedirect';
import { QuizTitle } from './QuizTitle/QuizTitle';

export const Quiz = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isChild, setIsChild] = useState(false);
  // const [coordinate, setCoordinate] = useState(0);

  // useEffect(() => {
  //   const onTouchStartSetCoordinate = event => {
  //     console.log('fired touchstart');

  //     event.target.nodeName === 'DIV' &&
  //       setCoordinate(event.changedTouches[0].screenX);
  //   };

  //   const onTouchEndSwipe = event => {
  //     console.log('fired touchend');
  //     console.log(coordinate - event.changedTouches[0].screenX);

  //     return coordinate - event.changedTouches[0].screenX > 150 &&
  //       activeSlide - 1 > 1
  //       ? previousQuestion()
  //       : coordinate - event.changedTouches[0].screenX < -150 &&
  //         activeSlide + 1 < 8
  //       ? nextQuestion()
  //       : null;
  //   };

  //   window.addEventListener('touchstart', onTouchStartSetCoordinate);
  //   window.addEventListener('touchend', onTouchEndSwipe);

  //   return () => {
  //     window.removeEventListener('touchstart', onTouchStartSetCoordinate);
  //     window.addEventListener('touchend', onTouchEndSwipe);
  //   };
  // }, [activeSlide, coordinate]);

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
