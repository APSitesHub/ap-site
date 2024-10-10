import { SocialLogoLink } from 'components/MainFooter/MainFooter.styled';
import {
  BackgroundFilterBottom,
  BackgroundFilterTop,
} from 'pages/Quiz/Quiz.styled';
import {
  FacebookBtnNew,
  InstagramBtnNew,
  SocialsLinkWrapperRecord,
  TikTokBtnNew,
  YouTubeBtnNew,
} from 'pages/RecordLinkTree/RecordLinkTree.styled';
import {
  FormLinkTreeBackgroundWrapper,
  LinkBtn,
  LinkBtnsContainer,
  LinkBtnText,
  Subtitle,
  Title,
} from './FormsLinkTree.styled';

const FormsLinkTree = () => {
  return (
    <>
      <FormLinkTreeBackgroundWrapper>
        <BackgroundFilterTop />
        <BackgroundFilterBottom />
        <Title>
          Раді вітати в <br />
          AP Education!
        </Title>
        <Subtitle>Обирай напрям та залишай свою заявку!</Subtitle>

        <LinkBtnsContainer>
          <LinkBtn to={'/form-uni'}>
            <LinkBtnText> Розпочати навчання </LinkBtnText>
          </LinkBtn>
          <LinkBtn to={'/amb-form'}>
            <LinkBtnText>Стати амбасадором</LinkBtnText>
          </LinkBtn>
          <LinkBtn to={'/teacher-form'}>
            <LinkBtnText>Стати викладачем</LinkBtnText>
          </LinkBtn>
          <LinkBtn to={'https://youtu.be/IAQGab-Fsvc?si=ibGN4-MeD2woLHT9'}>
            <LinkBtnText>Подивитись промо-відео</LinkBtnText>
          </LinkBtn>
        </LinkBtnsContainer>
        <SocialsLinkWrapperRecord>
          <SocialLogoLink
            href="https://www.youtube.com/@ap.education.center"
            target="_blank"
            rel="noopener noreferrer"
          >
            <YouTubeBtnNew />
          </SocialLogoLink>
          <SocialLogoLink
            href="https://www.facebook.com/ap.edu.centre/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookBtnNew />
          </SocialLogoLink>
          <SocialLogoLink
            href="https://www.instagram.com/ap.education/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramBtnNew />
          </SocialLogoLink>
          <SocialLogoLink
            href="https://www.tiktok.com/@ap.education.center"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TikTokBtnNew />
          </SocialLogoLink>
        </SocialsLinkWrapperRecord>
      </FormLinkTreeBackgroundWrapper>
    </>
  );
};

export default FormsLinkTree;
