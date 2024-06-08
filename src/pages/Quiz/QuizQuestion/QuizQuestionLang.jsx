import de from '../../../img/quiz/de.png';
import gb from '../../../img/quiz/gb.png';
import pl from '../../../img/quiz/pl.png';
import {
  BackgroundFilterBottomLeft,
  BackgroundFilterTopRight,
  BackgroungStarSmall,
  CurrentPage,
  Emoji,
  Logo,
  NextPageBtn,
  PageCounter,
  Pagination,
  PreviousPageBtn,
  Question,
  QuizBox,
  QuizButton,
  QuizButtonBox,
  QuizButtonContent
} from '../Quiz.styled';

export const QuizQuestionLang = ({ continueQuiz, activeSlide, previousQuestion, nextQuestion }) => {
  return (
    <>
      <QuizBox>
        <Logo />
        <Question>Вивчення якої мови вас цікавить?</Question>
        <QuizButtonBox>
          <QuizButton onClick={continueQuiz}>
            <QuizButtonContent>
              <Emoji src={gb} alt="Great Britain flag emoji" width="21" />
              Англійська
            </QuizButtonContent>
          </QuizButton>
          <QuizButton onClick={continueQuiz}>
            <QuizButtonContent>
              <Emoji src={de} alt="Germany flag emoji" width="21" />
              Німецька
            </QuizButtonContent>
          </QuizButton>
          <QuizButton onClick={continueQuiz}>
            <QuizButtonContent>
              <Emoji src={pl} alt="Poland flag emoji" width="21" /> Польська
            </QuizButtonContent>
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
          ></PreviousPageBtn>
          <PageCounter>
            <CurrentPage>{activeSlide}</CurrentPage>/8
          </PageCounter>
          <NextPageBtn
            className={activeSlide + 1 < 1 && 'disabled'}
            disabled={activeSlide + 1 < 1 && true}
            onClick={nextQuestion}
          ></NextPageBtn>
        </Pagination>
      </QuizBox>
    </>
  );
};
