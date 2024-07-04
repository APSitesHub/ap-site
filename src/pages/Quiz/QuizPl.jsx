import { useRef, useState } from 'react';
import { QuizQuestionAge } from './QuizQuestion/QuizQuestionAge';
import { QuizQuestionDifficulties } from './QuizQuestion/QuizQuestionDifficulties';
import { QuizQuestionForm } from './QuizQuestion/QuizQuestionForm';
import { QuizQuestionInterests } from './QuizQuestion/QuizQuestionInterests';
import { QuizQuestionLevel } from './QuizQuestion/QuizQuestionLevel';
import { QuizQuestionQuantity } from './QuizQuestion/QuizQuestionQuantity';
import { QuizQuestionWho } from './QuizQuestion/QuizQuestionWho';
import { QuizRedirect } from './QuizRedirect/QuizRedirect';
import { QuizTitle } from './QuizTitle/QuizTitle';

const QuizPl = ({ utms }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isChild, setIsChild] = useState(false);

  const quizValues = useRef();

  const beginQuiz = () => {
    setActiveSlide(1);
    quizValues.current = { pipeline_id: 6453287 };
    quizValues.current.lang = 'pl';
    quizValues.current.utm_content = utms.utm_content;
    quizValues.current.utm_medium = utms.utm_medium;
    quizValues.current.utm_campaign = utms.utm_campaign;
    quizValues.current.utm_source = utms.utm_source;
    quizValues.current.utm_term = utms.utm_term;
    quizValues.current.utm_referrer = utms.utm_referrer;
    quizValues.current.referrer = utms.referrer;
    quizValues.current.gclientid = utms.gclientid;
    quizValues.current.gclid = utms.gclid;
    quizValues.current.fbclid = utms.fbclid;
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
      {activeSlide === 0 && <QuizTitle beginQuiz={beginQuiz} lang={'pl'} />}
      {activeSlide === 1 && (
        <QuizQuestionWho
          activeSlide={activeSlide}
          continueQuiz={continueQuiz}
          continueQuizForChild={continueQuizForChild}
          previousQuestion={previousQuestion}
          nextQuestion={nextQuestion}
          quizValues={quizValues}
          lang={'pl'}
        />
      )}
      {activeSlide === 2 && (
        <QuizQuestionAge
          activeSlide={activeSlide}
          isChild={isChild}
          continueQuiz={continueQuiz}
          previousQuestion={previousQuestion}
          nextQuestion={nextQuestion}
          quizValues={quizValues}
          lang={'pl'}
        />
      )}
      {activeSlide === 3 && (
        <QuizQuestionLevel
          activeSlide={activeSlide}
          isChild={isChild}
          continueQuiz={continueQuiz}
          previousQuestion={previousQuestion}
          nextQuestion={nextQuestion}
          quizValues={quizValues}
          lang={'pl'}
        />
      )}
      {activeSlide === 4 && (
        <QuizQuestionQuantity
          activeSlide={activeSlide}
          continueQuiz={continueQuiz}
          previousQuestion={previousQuestion}
          nextQuestion={nextQuestion}
          quizValues={quizValues}
          lang={'pl'}
        />
      )}
      {activeSlide === 5 && (
        <QuizQuestionDifficulties
          activeSlide={activeSlide}
          continueQuiz={continueQuiz}
          previousQuestion={previousQuestion}
          nextQuestion={nextQuestion}
          quizValues={quizValues}
          lang={'pl'}
        />
      )}
      {activeSlide === 6 && (
        <QuizQuestionInterests
          activeSlide={activeSlide}
          continueQuiz={continueQuiz}
          previousQuestion={previousQuestion}
          nextQuestion={nextQuestion}
          quizValues={quizValues}
          lang={'pl'}
        />
      )}
      {activeSlide === 7 && (
        <QuizQuestionForm
          nextQuestion={nextQuestion}
          quizValues={quizValues}
          activeSlide={activeSlide}
          previousQuestion={previousQuestion}
          lang={'pl'}
        />
      )}
      {activeSlide === 8 && <QuizRedirect />}
    </>
  );
};

export default QuizPl;