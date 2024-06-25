import rocket from '../../../img/quiz/rocket.png';
import {
  BackgroundFilterBottom,
  BackgroundFilterTop,
  BackgroungStarLarge,
  BackgroungStarSmall,
  ChatBotLink,
  ChatBotRedirectItem,
  ChatBotRedirectList,
  Description,
  HiEmoji,
  Logo,
  QuizBox,
  TelegramBotLink,
  Title,
  ViberBotLink,
  WhatsAppBotLink,
} from '../Quiz.styled';

export const QuizRedirect = () => {
  return (
    <>
      <QuizBox>
        <Logo />
        <Title>{`Обов'язково перейдіть в месенджер!`}</Title>
        <Description>
          Оберіть месенджер, в якому вам буде зручно продовжити
          реєстрацію на марафон!
        </Description>
        <ChatBotRedirectList>
          <ChatBotRedirectItem>
            <ChatBotLink to={'/marathon/wa'}>
              <WhatsAppBotLink />
            </ChatBotLink>
          </ChatBotRedirectItem>
          <ChatBotRedirectItem>
            <ChatBotLink to={'/marathon/tg'}>
              <TelegramBotLink />
            </ChatBotLink>
          </ChatBotRedirectItem>
          <ChatBotRedirectItem>
            <ChatBotLink to={'/marathon/viber'}>
              <ViberBotLink />
            </ChatBotLink>
          </ChatBotRedirectItem>
        </ChatBotRedirectList>
        <HiEmoji src={rocket} alt="Rocket emoji" width="80" />
        <BackgroundFilterTop /> <BackgroundFilterBottom />
        <BackgroungStarSmall /> <BackgroungStarLarge />
      </QuizBox>
    </>
  );
};
