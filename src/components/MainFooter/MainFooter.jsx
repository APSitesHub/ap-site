import { Box } from 'components/Box/Box.styled';
import {
  FacebookBtn,
  Footer,
  FooterBottomContainer,
  FooterBox,
  FooterCopyright,
  FooterFileLink,
  FooterLeadBtn,
  FooterLeftBox,
  FooterLink,
  FooterLinksContainer,
  FooterList,
  FooterListItem,
  FooterLogo,
  FooterLogoLink,
  FooterNavLink,
  FooterSocials,
  FooterTopContainer,
  IconBox,
  InstagramBtn,
  LeadDesc,
  LeadWrapper,
  LinkList,
  LinkListItem,
  LinkListTitle,
  MonoPawIcon,
  SocialLogoLink,
  TikTokBtn,
  YouTubeBtn,
} from './MainFooter.styled';
import { Map } from './Map/Map';

export const MainFooter = ({ toggleModal }) => {
  // const footerServicesItems = [
  //   { to: '/education', service: 'Навчальний центр' },
  //   { to: '/examination', service: 'Екзаменаційний центр' },
  //   { to: '/translation', service: 'Перекладацьке бюро' },
  //   // { to: 'admission', service: 'Вступ до ВНЗ' },
  // ];
  const footerCoursesItems = [
    { to: '/', course: 'Англійська мова' },
    { to: '/polski', course: 'Польська мова' },
    { to: '/deutsch', course: 'Німецька мова' },
  ];
  const footerContactsItems = [
    { href: 'mailto:info@ap.education', contact: 'info@ap.education' },
    { href: 'tel:+380936707129', contact: '+380936707129' },
    {
      href: 'https://maps.app.goo.gl/mj3W28hhdfHekf8dA',
      contact: 'м.Львів, вул. Городницька, 47 Б',
    },
  ];

  return (
    <Footer>
      <Box>
        <FooterBox>
          <FooterTopContainer>
            <FooterLeftBox>
              <IconBox>
                <FooterLogoLink to="/">
                  <FooterLogo />
                </FooterLogoLink>
                <FooterSocials>
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
                </FooterSocials>
              </IconBox>
              <LeadWrapper>
                <LeadDesc>... якщо залишились запитання </LeadDesc>
                <FooterLeadBtn onClick={toggleModal}>
                  {' '}
                  ЗАЛИШИТИ ЗАЯВКУ{' '}
                </FooterLeadBtn>
              </LeadWrapper>
            </FooterLeftBox>

            <FooterList>
              {/* <FooterListItem>
              <LinkListTitle>Наші послуги</LinkListTitle>
              <LinkList>
                {footerServicesItems.map((item, i) => (
                  <LinkListItem key={i}>
                    <FooterNavLink to={item.to}>
                      {item.service}
                    </FooterNavLink>
                  </LinkListItem>
                ))}
              </LinkList>
            </FooterListItem> */}
              <FooterListItem>
                <LinkListTitle>Курси</LinkListTitle>
                <LinkList>
                  {footerCoursesItems.map((item, i) => (
                    <LinkListItem key={i}>
                      <FooterNavLink to={item.to}>{item.course}</FooterNavLink>
                    </LinkListItem>
                  ))}
                </LinkList>
              </FooterListItem>
              <FooterListItem>
                <LinkListTitle id="contacts">Контакти</LinkListTitle>
                <LinkList>
                  {footerContactsItems.map((item, i) => (
                    <LinkListItem key={i}>
                      <FooterLink href={item.href} target="_blank">
                        {item.contact}
                      </FooterLink>
                    </LinkListItem>
                  ))}
                </LinkList>
              </FooterListItem>
            </FooterList>
          </FooterTopContainer>
          <FooterBottomContainer>
            <FooterCopyright>
              ©2024 AP Education Center. All rights reserved
            </FooterCopyright>
            <FooterLinksContainer>
              <FooterFileLink
                to={'https://ap.education/static/docs/privacy_policy.docx'}
              >
                Політика конфіденційності
              </FooterFileLink>
              <FooterFileLink
                to={'https://ap.education/static/docs/public_offer.docx'}
              >
                Публічна оферта
              </FooterFileLink>
              <MonoPawIcon />
            </FooterLinksContainer>
          </FooterBottomContainer>
        </FooterBox>
      </Box>
      <Map />
    </Footer>
  );
};
