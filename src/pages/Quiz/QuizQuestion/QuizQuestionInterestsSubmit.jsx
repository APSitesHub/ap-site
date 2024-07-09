import axios from 'axios';
import { LoaderVideo } from 'components/SharedLayout/Loaders/LoaderVideo';
import middle from '../../../img/quiz/middle.png';
import {
  BackgroundFilterBottomLeft,
  BackgroundFilterTopRight,
  BackgroungStarSmall,
  CurrentPage,
  InterestsEmoji,
  Logo,
  NextPageBtn,
  PageCounter,
  Pagination,
  PreviousPageBtn,
  Question,
  QuizArrowLeft,
  QuizArrowRight,
  QuizBox,
  QuizButton,
  QuizButtonBox,
  QuizButtonContent,
} from '../Quiz.styled';
import { useState } from 'react';

export const QuizQuestionInterestsSubmit = ({
  activeSlide,
  previousQuestion,
  nextQuestion,
  quizValues,
  lang,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  // const [shownError, setShownError] = useState('');
  const setQuizValue = async (e, value) => {
    quizValues.current.interests = value;
    await leadSubmit();
    setTimeout(() => {
      // setIsLoading(isLoading => (isLoading = false));
      window.location.replace(quizValues.current.leadPage);
    }, 1500);
  };

  const leadSubmit = async () => {
    setIsLoading(isLoading => (isLoading = true));
    try {
      setIsLoading(isLoading => (isLoading = true));
      console.log(quizValues.current);
      const response = await axios.post('/leads/quiz-code', quizValues.current);
      console.log(response.data);
      quizValues.current.leadPage = response.data.engPage;
      quizValues.current.crmId = response.data.crmId;
      quizValues.current.contactId = response.data.contactId;
      console.log(quizValues.current);

      const userSubmit = async (crmId, contactId) => {
        const userValues = {
          name: `Quiz Lead ${quizValues.current.authCode}`,
          mail: quizValues.current.mail,
          authCode: quizValues.current.authCode,
          password: quizValues.current.password,
          pupilId: '0000000',
          crmId: quizValues.current.crmId,
          contactId: quizValues.current.contactId,
          age: quizValues.current.age,
          lang:
            quizValues.current.lang === 'en' && !quizValues.current.adult
              ? 'enkids'
              : quizValues.current.lang,
          course: '0',
          package: 'Марафон',
          knowledge: quizValues.current.knowledge,
          manager: '-',
        };

        try {
          const response = await axios.post('/users/new', userValues);
          console.log(response);
        } catch (error) {
          console.error(error);
        }
      };

      userSubmit(quizValues.current.crmId, quizValues.current.contactId);
    } catch (error) {
      console.error(error);
      // setShownError(shownError => (shownError = error));
    }
  };

  return (
    <>
      <QuizBox>
        <Logo />
        <Question>
          Що вас зараз цікавить у вивченні{' '}
          {quizValues.current.lang === 'en'
            ? 'англійської'
            : quizValues.current.lang === 'de'
            ? 'німецької'
            : quizValues.current.lang === 'pl'
            ? 'польської'
            : 'іноземної'}{' '}
          мови?
          <InterestsEmoji src={middle} alt="Alumni hat emoji" />
        </Question>
        <QuizButtonBox>
          <QuizButton
            onClick={e => setQuizValue(e, 'Розширити словниковий запас')}
            className={
              quizValues.current?.interests === 'Розширити словниковий запас' &&
              'chosen'
            }
          >
            <QuizButtonContent>Вивчити слова</QuizButtonContent>
          </QuizButton>
          <QuizButton
            onClick={e => setQuizValue(e, 'Вивчити граматику')}
            className={
              quizValues.current?.interests === 'Вивчити граматику' && 'chosen'
            }
          >
            <QuizButtonContent>Вивчити граматику</QuizButtonContent>
          </QuizButton>
          <QuizButton
            onClick={e => setQuizValue(e, 'Вільно розмовляти')}
            className={
              quizValues.current?.interests === 'Вільно розмовляти' && 'chosen'
            }
          >
            <QuizButtonContent>Вільно розмовляти</QuizButtonContent>
          </QuizButton>
          <QuizButton
            onClick={e => setQuizValue(e, 'Все разом')}
            className={
              quizValues.current?.interests === 'Все разом' && 'chosen'
            }
          >
            <QuizButtonContent>Все разом</QuizButtonContent>
          </QuizButton>
        </QuizButtonBox>
        <BackgroundFilterTopRight />
        <BackgroundFilterBottomLeft />
        <BackgroungStarSmall />
        <Pagination>
          <PreviousPageBtn
            className={activeSlide - 1 < 1 && 'disabled'}
            disabled={activeSlide - 1 < 1 && true}
            onClick={previousQuestion}
          >
            <QuizArrowLeft />
          </PreviousPageBtn>
          <PageCounter>
            <CurrentPage>{activeSlide}</CurrentPage>/{lang ? 7 : 8}
          </PageCounter>
          <NextPageBtn
            className={
              activeSlide + 1 > 1 &&
              !quizValues.current?.interests &&
              'disabled'
            }
            disabled={
              activeSlide + 1 > 1 && !quizValues.current?.interests && true
            }
            onClick={nextQuestion}
          >
            <QuizArrowRight />
          </NextPageBtn>
        </Pagination>
      </QuizBox>
      {isLoading && <LoaderVideo />}
    </>
  );
};
