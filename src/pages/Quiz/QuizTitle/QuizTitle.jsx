import {
  BackgroundFilterBottom,
  BackgroundFilterTop,
  BackgroungStarLarge,
  BackgroungStarSmall,
  Description,
  Logo,
  QuizBox,
  QuizStart,
  Title
} from '../Quiz.styled';

export const QuizTitle = ({ beginQuiz, lang }) => {
  return (
    <>
      <QuizBox>
        <Logo />
        <Title>{`Пройдіть тест і 
        отримайте подарунки вже зараз!`}</Title>
        <Description>
          Лише <b>7 кроків</b> і ми автоматично <br />
          відправимо вам доступ до матеріалів
          <br />
          <b>на цілий рівень</b>.
          <br />
          <br />
          Ваші відповіді формують <b>подарунок!</b> 🎁
        </Description>
        <QuizStart onClick={beginQuiz}>Розпочати</QuizStart>
        {/* <HiEmoji src={hiPng} alt="Hi emoji" width="80" /> */}
        <video
          src="https://ap.education/static/video/quiz/presents.mp4"
          loop
          controls={false}
          autoPlay={true}
          playsInline
          muted={true}
        ></video>
        <BackgroundFilterTop /> <BackgroundFilterBottom />
        <BackgroungStarSmall /> <BackgroungStarLarge />
      </QuizBox>
    </>
  );
};
