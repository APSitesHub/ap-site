import { HeaderWrapper, LogoNew, LogoRoute } from 'components/Menu/Menu.styled';
import { useEffect } from 'react';
import thankYouPersonPNG from '../../img/bg/thank-you-person.png';
import thankYouPersonWebp from '../../img/bg/thank-you-person.webp';
import {
  ButtonBox,
  FacebookBtn,
  HeroBottomStar,
  HeroTopStar,
  InstagramBtn,
  LinkBtn,
  MainLinkBtn,
  SocialArrow,
  SocialLogoLink,
  SocialsBox,
  SocialsLinkWrapper,
  SocialsText,
  TextBubble,
  TextBubbleText,
  TextBubbleWrapper,
  ThankYouArrow,
  ThankYouDesc,
  ThankYouHeader,
  ThankYouHeading,
  ThankYouImage,
  ThankYouPicture,
  ThankYouSection,
  ThankYouTextWrapper,
  TikTokBtn,
  YouTubeBtn,
} from './ThankYouPage.styled';

export const ThankYouPage = () => {
  useEffect(() => {
    document.title = 'Дякуємо! | AP Education';
  }, []);

  return (
    <>
      <ThankYouHeader>
        <HeaderWrapper>
          <LogoRoute to="/">
            <LogoNew />
          </LogoRoute>
        </HeaderWrapper>
      </ThankYouHeader>
      <ThankYouSection>
        <ThankYouTextWrapper>
          <ThankYouArrow />
          <ThankYouHeading>Дякуємо, що заповнили форму!</ThankYouHeading>
          <ThankYouDesc>
            Ви можете повернутися на головну, щоб переглянути наші інші напрямки
            роботи!
          </ThankYouDesc>

          <ButtonBox>
            <MainLinkBtn to={'/'}>Головна</MainLinkBtn>
            <LinkBtn to={'/school'}>AP SCHOOL</LinkBtn>
            <LinkBtn to={'/university'}>AP UNIVERSITY</LinkBtn>
          </ButtonBox>
        </ThankYouTextWrapper>
        <HeroTopStar />
        <HeroBottomStar />
        <ThankYouPicture>
          <source
            media="(max-width:767px)"
            srcSet={`${thankYouPersonWebp}`}
            type="image/webp"
          />
          <source
            media="(max-width:767px)"
            srcSet={`${thankYouPersonPNG}`}
            type="image/png"
          />
          <ThankYouImage
            src={thankYouPersonPNG}
            alt="Thank you page person image"
          />
        </ThankYouPicture>
        <SocialsBox>
          <TextBubbleWrapper>
            <TextBubbleText>P.S. підписуйтесь на наші соцмережі</TextBubbleText>
            <TextBubble />
          </TextBubbleWrapper>
          <SocialArrow />
          <SocialsText>А також підписуйтеся на нас у соцмережах:</SocialsText>
          <SocialsLinkWrapper>
            <SocialLogoLink
              href="https://www.instagram.com/ap.education/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramBtn />
            </SocialLogoLink>
            <SocialLogoLink
              href="https://www.facebook.com/ap.edu.centre/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookBtn />
            </SocialLogoLink>
            <SocialLogoLink
              href="https://www.tiktok.com/@ap_education"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TikTokBtn />
            </SocialLogoLink>
            <SocialLogoLink
              href="https://www.youtube.com/channel/UC3XSGAVLhPXXlMN5-Gebtvw"
              target="_blank"
              rel="noopener noreferrer"
            >
              <YouTubeBtn />
            </SocialLogoLink>
          </SocialsLinkWrapper>
        </SocialsBox>
      </ThankYouSection>
    </>
  );
};
