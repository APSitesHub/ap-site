import { LogoRoute } from 'components/Menu/Menu.styled';
import {
  ContactPhone,
  ContactPhoneNumber,
  FacebookBtn,
  FormBtnText,
  HeaderWrapper,
  InstagramBtn,
  LeadFormAddTextNew,
  LinkedInBtn,
  Logo,
  LogoMobile,
  PageFormHeading,
  PhoneNumber,
  SocialLogoLink,
  SocialsLinkWrapper,
  SocialsTextNew,
  ThankYouHeaderNew,
  ThankYouSectionNew,
  TikTokBtn,
  YouTubeBtn,
} from 'pages/LeadFormPage/UniversalLeadFormPage.styled';
import { useEffect, useState } from 'react';
import {
  ButtonBox,
  MainLinkBtn,
  SchoolLinkBtn,
  SocialsBox,
  ThankYouBackground,
  ThankYouBackgroundVideo,
  ThankYouTextWrapper,
  UniversityLinkBtn,
} from './ThankYouPage.styled';

export const ThankYouPage = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    document.title = 'Дякуємо! | AP Education';

    window.addEventListener('scroll', scrollHandler);
  }, []);

  const scrollHandler = () => {
    setScrollPosition(1);
  };

  return (
    <ThankYouBackground>
      <ThankYouHeaderNew className={scrollPosition > 0 && 'scrolled'}>
        <HeaderWrapper>
          <LogoRoute to="/">
            <LogoMobile />
            <Logo />
          </LogoRoute>
          <PhoneNumber href="tel:+380936707129">
            <ContactPhone />
            <ContactPhoneNumber>+38 (093) 670 71 29</ContactPhoneNumber>
          </PhoneNumber>
        </HeaderWrapper>
      </ThankYouHeaderNew>
      <ThankYouBackgroundVideo
        playsInline
        loop
        autoPlay
        muted
        src="https://ap.education/static/video/trailers/LogoEducationSolo.mp4"
        title="AP Education"
        poster="https://ap.education/static/video/trailers/poster.jpg"
      ></ThankYouBackgroundVideo>
      <ThankYouSectionNew>
        <ThankYouTextWrapper>
          <PageFormHeading data-gtm="thankyou">
            Дякуємо, що заповнили форму!
          </PageFormHeading>
          <LeadFormAddTextNew>
            Ви можете повернутися на головну, а також переглянути наші інші
            напрямки роботи!
          </LeadFormAddTextNew>

          <ButtonBox>
            <MainLinkBtn href="https://ap.education/" target="_blank">
              <FormBtnText>Головна</FormBtnText>
            </MainLinkBtn>
            <SchoolLinkBtn href="https://ap.education/school/" target="_blank">
              <FormBtnText>AP SCHOOL</FormBtnText>
            </SchoolLinkBtn>
            <UniversityLinkBtn
              href="https://ap.education/university/"
              target="_blank"
            >
              <FormBtnText>AP UNIVERSITY</FormBtnText>
            </UniversityLinkBtn>
          </ButtonBox>
        </ThankYouTextWrapper>

        <SocialsBox>
          <SocialsTextNew>Підписуйтеся на нас у соцмережах:</SocialsTextNew>
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
              href="https://www.tiktok.com/@ap.education.center"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TikTokBtn />
            </SocialLogoLink>
            <SocialLogoLink
              href="https://www.linkedin.com/company/ap-education-center/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInBtn />
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
      </ThankYouSectionNew>
    </ThankYouBackground>
  );
};
