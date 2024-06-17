import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as TelegramIcon } from '../../img/quiz/telegram.svg';
import { ReactComponent as ViberIcon } from '../../img/quiz/viber.svg';
import { ReactComponent as WhatsAppIcon } from '../../img/quiz/whatsapp.svg';
import { ReactComponent as StarIcon } from '../../img/svg/heroStar.svg';
import { ReactComponent as LogoIcon } from '../../img/svg/logoNew.svg';
import { ReactComponent as ArrowLeft } from '../../img/svg/month-switch-left.svg';
import { ReactComponent as ArrowRight } from '../../img/svg/month-switch-right.svg';
import { FormBtn, Input } from 'components/LeadForm/LeadForm.styled';

export const QuizBox = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  font-family: var(--main-font-family);

  overflow: hidden;
  padding: 75px 20px;
  padding-top: 50px;

  @media screen and (min-width: 768px) {
    max-width: 768px;
    margin: 0 auto;
  }
`;

export const BackgroundFilterTop = styled.div`
  position: absolute;
  top: -625px;
  right: -385px;

  width: 602px;
  height: 602px;
  transform: rotate(-90deg);
  flex-shrink: 0;

  border-radius: 602px;
  background-color: #0f645b;
  filter: drop-shadow(10px 10px 150px #0f645b);

  @media screen and (min-width: 768px) {
    top: -25%;
    right: -100%;
  }
`;

export const BackgroundFilterTopRight = styled(BackgroundFilterTop)`
  top: -200px;
  right: -650px;

  @media screen and (min-width: 768px) {
    top: -25%;
    right: -100%;
  }
`;

export const BackgroundFilterBottom = styled(BackgroundFilterTop)`
  top: unset;
  right: unset;
  bottom: -500px;
  left: -655px;

  @media screen and (min-width: 768px) {
    bottom: -25%;
    left: -100%;
  }
`;

export const BackgroundFilterBottomLeft = styled(BackgroundFilterBottom)`
  bottom: -375px;
  left: -625px;

  @media screen and (min-width: 768px) {
    bottom: -25%;
    left: -100%;
  }
`;

export const Logo = styled(LogoIcon)`
  display: block;
  flex-shrink: 0;
  width: 173px;
  height: 34px;

  margin: 0 auto;
  margin-bottom: 52px;
`;

export const Title = styled.h1`
  text-align: center;
  font-size: 30px;
  line-height: 1.2;

  margin: 0 auto;
  margin-bottom: 8px;
  white-space: pre-line;
`;

export const Question = styled.h2`
  text-align: center;
  font-size: 30px;
  line-height: 1.2;
  height: 144px;

  display: flex;
  align-items: center;

  margin: 0 auto;
  margin-bottom: 40px;

  position: relative;
`;

export const Description = styled.p`
  text-align: center;
  font-size: 16px;
  line-height: 1.3;

  margin-bottom: 40px;
`;

export const QuizStart = styled.button`
  display: flex;
  padding: 20px 60px;
  justify-content: center;
  align-items: center;
  align-self: stretch;
  border: none;

  color: var(--secondary-color);

  font-size: 24px;
  font-weight: 700;
  line-height: 1;
  text-transform: uppercase;

  border-radius: 50px;
  background: linear-gradient(322deg, #0f645b 23.22%, #09c6cc 110.01%), #0f645b;
  margin-bottom: 76px;
`;

export const HiEmoji = styled.img`
  display: block;
  margin: 0 auto;
`;

export const BookEmoji = styled.img`
  display: block;
  margin: 0 auto;
`;

export const LaptopImg = styled.img`
  display: block;
  position: absolute;
  transform: rotate(-30.862deg);
  top: 255px;
  left: -20px;
`;

export const HatImg = styled.img`
  display: block;
  position: absolute;
  top: 567px;
  right: -47px;
`;

export const Emoji = styled.img`
  display: block;
`;

export const InterestsEmoji = styled.img`
  display: block;
  width: 35px;
  position: absolute;
  bottom: 24px;
  right: 25px;
  transform: rotate(-12deg);

  @media screen and (max-width: 339px) {
    bottom: -10px;
    right: 10px;
  }

  @media screen and (min-width: 380px) {
    bottom: 24px;
    right: 0px;
  }

  @media screen and (min-width: 410px) {
    bottom: 24px;
    right: 25px;
  }
`;

export const QuizButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const QuizButton = styled.button`
  display: flex;
  padding: 20px 60px;
  justify-content: center;
  gap: 6px;

  color: #000;
  background-color: var(--secondary-color);

  border-radius: 50px;
  border: 2px solid var(--main-color);

  font-size: 21px;
  font-weight: 700;

  position: relative;
  min-height: 61px;

  transition: background-color var(--animation-global),
    color var(--animation-global);

  &.chosen {
    background-color: var(--main-color);
  }
`;

export const QuizButtonContent = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 6px;

  color: #000;

  position: absolute;
  top: 50%;
  left: 50%;

  width: max-content;
  transform: translate(-50%, -50%);

  .chosen & {
    color: var(--secondary-color);
  }
`;

export const BackgroungStarSmall = styled(StarIcon)`
  position: absolute;
  left: 3px;
  top: 149px;

  flex-shrink: 0;
  width: 32px;
  height: 32px;
`;

export const BackgroungStarLarge = styled(StarIcon)`
  position: absolute;
  right: -15px;
  bottom: 36px;

  flex-shrink: 0;
  width: 72px;
  height: 72px;
`;

export const Pagination = styled.div`
  width: calc(100% - 40px);
  position: absolute;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const PreviousPageBtn = styled.button`
  display: flex;
  width: 30px;
  height: 30px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border: none;
  border-radius: 50%;
  background: linear-gradient(322deg, #0f645b 23.22%, #09c6cc 110.01%);

  position: relative;

  &.disabled {
    background: rgba(0, 0, 0, 0.1);
  }
`;

export const NextPageBtn = styled(PreviousPageBtn)`
  &.hidden {
    opacity: 0;
    pointer-events: none;
  }
`;

export const QuizArrowLeft = styled(ArrowLeft)`
  color: var(--secondary-color);

  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
  transition: color var(--animation-global);

  .disabled & {
    color: var(--main-color);
  }
`;

export const QuizArrowRight = styled(ArrowRight)`
  color: var(--secondary-color);

  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
  transition: color var(--animation-global);

  .disabled & {
    color: var(--main-color);
  }
`;

export const PageCounter = styled.span`
  font-size: 16px;
  line-height: 1;
`;

export const CurrentPage = styled(PageCounter)`
  font-weight: 700;
`;

export const ChatBotRedirectList = styled.ul`
  margin: 0 auto;
  display: flex;
  gap: 10px;
  margin-bottom: 110px;
`;

export const ChatBotRedirectItem = styled.li`
  width: max-content;
`;

export const ChatBotBtn = styled.button`
  display: block;

  cursor: pointer;

  transition: transform var(--animation-global), filter var(--animation-global);

  &:hover,
  &:focus {
    transform: scale(1.1);
    filter: drop-shadow(0px 0px 0.5px #00000054);
  }
`;

export const ChatBotLink = styled(Link)`
  display: block;

  cursor: pointer;

  transition: transform var(--animation-global), filter var(--animation-global);

  &:hover,
  &:focus {
    transform: scale(1.1);
    filter: drop-shadow(0px 0px 0.5px #00000054);
  }
`;

export const TelegramBotLink = styled(TelegramIcon)`
  width: 60px;
  height: 60px;
  flex-shrink: 0;
`;

export const ViberBotLink = styled(ViberIcon)`
  width: 60px;
  height: 60px;
  flex-shrink: 0;
`;

export const WhatsAppBotLink = styled(WhatsAppIcon)`
  width: 60px;
  height: 60px;
  flex-shrink: 0;
`;

export const QuizInput = styled(Input)`
  font-size: 16px;
  padding: 22.5px 20px;
`;

export const QuizFormBtn = styled(FormBtn)`
  font-size: 24px;
`;
