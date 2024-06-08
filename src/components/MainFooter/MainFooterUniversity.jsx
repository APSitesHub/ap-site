import useSize from '@react-hook/size';
import { Box } from 'components/Box/Box.styled';
import {
  FacebookBtnNew,
  FooterBottomContainerNew,
  FooterBoxNew,
  FooterCopyrightNew,
  FooterFileLinkNew,
  FooterLeadBtnNew,
  FooterLeftBox,
  FooterLinkNew,
  FooterLinksContainerNew,
  FooterListItemNew,
  FooterListNew,
  FooterLogoLink,
  FooterLogoUniversity,
  FooterNavLinkNew,
  FooterTopContainer,
  FooterUniversity,
  InstagramBtnNew,
  LeadDescNew,
  LeadSocialWrapper,
  LeadWrapperNew,
  LinkList,
  LinkListItemNew,
  LinkListTitleNew,
  MonoPawIconWhite,
  SocialLogoLink,
  SocialsLinkWrapperNew,
  TikTokBtnNew,
  YouTubeBtnNew,
} from './MainFooter.styled';
import { Map } from './Map/Map';

export const MainFooterUniversity = ({ toggleModal }) => {
  // eslint-disable-next-line
  const [width, _] = useSize(document.body);
  const footerProjectsItems = [
    { to: '/school', service: 'AP School' },
    { to: '/university', service: 'AP University' },
  ];
  const footerCoursesItems = [
    { to: '/english', course: 'Англійська мова' },
    { to: '/polski', course: 'Польська мова' },
    { to: '/deutsch', course: 'Німецька мова' },
  ];
  const footerContactsItems = [
    { href: 'mailto:info@ap.education', contact: 'info@ap.education' },
    { href: 'tel:+380936707129', contact: '+38 (093) 670 71 29' },
    {
      href: 'https://maps.app.goo.gl/mj3W28hhdfHekf8dA',
      contact: 'м. Львів, вул. Городницька, 47 Б',
    },
  ];

  return (
    <FooterUniversity>
      <Box>
        <FooterBoxNew>
          <FooterTopContainer>
            <FooterLeftBox>
              <FooterLogoLink to="/">
                <FooterLogoUniversity />
              </FooterLogoLink>
              <LeadWrapperNew>
                <LeadDescNew>... якщо залишились запитання </LeadDescNew>
                <FooterLeadBtnNew onClick={toggleModal}>
                  ЗАЛИШИТИ ЗАЯВКУ
                </FooterLeadBtnNew>
              </LeadWrapperNew>
            </FooterLeftBox>

            <LeadSocialWrapper>
              <FooterListNew>
                <FooterListItemNew>
                  <LinkListTitleNew>Проєкти</LinkListTitleNew>
                  <LinkList>
                    {footerProjectsItems.map((item, i) => (
                      <LinkListItemNew key={i}>
                        <FooterNavLinkNew to={item.to}>
                          {item.service}
                        </FooterNavLinkNew>
                      </LinkListItemNew>
                    ))}
                  </LinkList>
                </FooterListItemNew>
                <FooterListItemNew>
                  <LinkListTitleNew>Мовні Курси</LinkListTitleNew>
                  <LinkList>
                    {footerCoursesItems.map((item, i) => (
                      <LinkListItemNew key={i}>
                        <FooterNavLinkNew to={item.to}>
                          {item.course}
                        </FooterNavLinkNew>
                      </LinkListItemNew>
                    ))}
                  </LinkList>
                </FooterListItemNew>
                <FooterListItemNew>
                  <LinkListTitleNew id="contacts">Контакти</LinkListTitleNew>
                  <LinkList>
                    {footerContactsItems.map((item, i) => (
                      <LinkListItemNew key={i}>
                        <FooterLinkNew href={item.href} target="_blank">
                          {item.contact}
                        </FooterLinkNew>
                      </LinkListItemNew>
                    ))}
                  </LinkList>
                </FooterListItemNew>
              </FooterListNew>

              <SocialsLinkWrapperNew>
                <SocialLogoLink
                  href="https://www.youtube.com/channel/UC3XSGAVLhPXXlMN5-Gebtvw"
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
                  href="https://www.tiktok.com/@ap_education"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <TikTokBtnNew />
                </SocialLogoLink>
              </SocialsLinkWrapperNew>
            </LeadSocialWrapper>
          </FooterTopContainer>
          <FooterBottomContainerNew>
            <FooterCopyrightNew>
              ©2024 AP Education Center. All rights reserved
            </FooterCopyrightNew>
            <FooterLinksContainerNew>
              <FooterFileLinkNew
                to={'https://ap.education/static/docs/privacy_policy.docx'}
              >
                Політика конфіденційності
              </FooterFileLinkNew>
              <FooterFileLinkNew
                to={'https://ap.education/static/docs/public_offer.docx'}
              >
                Публічна оферта
              </FooterFileLinkNew>
              {width >= 768 && <MonoPawIconWhite />}
            </FooterLinksContainerNew>
          </FooterBottomContainerNew>
          {width < 768 && <MonoPawIconWhite />}
        </FooterBoxNew>
      </Box>
      <Map />
    </FooterUniversity>
  );
};
