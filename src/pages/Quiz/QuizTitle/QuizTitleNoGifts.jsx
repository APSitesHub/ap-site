import {
  BackgroundFilterBottom,
  BackgroundFilterTop,
  BackgroungStarLargeNoEngage,
  BackgroungStarSmallNoEngage,
  DescriptionTitleLower,
  DescriptionTitleUpper,
  Logo,
  QuizBox,
  QuizStart,
  TitleNoEngage
} from '../Quiz.styled';

export const QuizTitleNoGifts = ({ beginQuiz }) => {
  return (
    <>
      <QuizBox>
        <Logo />
        <TitleNoEngage>{`Пройдіть тест і зареєструйтесь
        на перший пробний урок вже зараз!`}</TitleNoEngage>
        <DescriptionTitleUpper>
          <b>Унікальний</b> формат навчання!
        </DescriptionTitleUpper>
        <video
          src="https://ap.education/static/video/quiz/title.mp4"
          loop
          controls={false}
          autoPlay={true}
          playsInline
          muted={true}
        ></video>
        <DescriptionTitleLower>
          Отримайте пробне заняття за <b>7 кроків</b>!
        </DescriptionTitleLower>
        <QuizStart onClick={beginQuiz}>Розпочати</QuizStart>
        <BackgroundFilterTop /> <BackgroundFilterBottom />
        <BackgroungStarSmallNoEngage /> <BackgroungStarLargeNoEngage />
      </QuizBox>
    </>
  );
};
