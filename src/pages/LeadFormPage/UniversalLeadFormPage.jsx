import axios from 'axios';
import {
  FormInputBox,
  HiddenInput,
  InputNote,
  Label,
} from 'components/LeadForm/LeadForm.styled';
import { LogoRoute } from 'components/Menu/Menu.styled';
import { Loader } from 'components/SharedLayout/Loaders/Loader';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import {
  BackgroundFilterBottom,
  BackgroundFilterTopLeft,
  BackgroundFilterTopRight,
  ContactPhone,
  ContactPhoneNumber,
  FacebookBtn,
  FormBackground,
  FormBtn,
  FormBtnText,
  HeaderWrapper,
  Input,
  InstagramBtn,
  LeadFormAddTextNew,
  LinkedInBtn,
  Logo,
  LogoMobile,
  PageForm,
  PageFormHeading,
  PageFormWrapper,
  PhoneNumber,
  SocialLogoLink,
  SocialsBoxNew,
  SocialsBoxNewMobile,
  SocialsLinkWrapper,
  SocialsTextNew,
  ThankYouHeaderNew,
  ThankYouSectionNew,
  TikTokBtn,
  UnFormTextContent,
  YouTubeBtn,
} from './UniversalLeadFormPage.styled';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';

const UniversalLeadFormPage = ({ utms }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Форма консультації | AP Education';

    window.addEventListener('scroll', scrollHandler);
  }, []);

  const scrollHandler = () => {
    setScrollPosition(1);
  };

  const initialValues = {
    name: '',
    phone: '',
    tag: '',
    utm_content: '',
    utm_medium: '',
    utm_campaign: '',
    utm_source: '',
    utm_term: '',
    utm_referrer: '',
    referrer: '',
    gclientid: '',
    gclid: '',
    fbclid: '',
  };

  const leadSchema = yup.object().shape({
    name: yup
      .string()
      .required("Будь ласка, вкажіть своє ім'я та прізвище!")
      .matches(
        /^[A-Za-zА-Яа-яіІїЇєЄ]+(?:[-'\s][A-Za-zА-Яа-яіІїЇєЄ]+)+$/,
        "Будь ласка, введіть ім'я та прізвище, не менше двох слів, без цифр та спецсимволів!"
      )
      .min(2, 'Необхідно ввести не менше ніж 2 символи!')
      .max(50, 'Необхідно ввести не більше ніж 50 символів!'),
    phone: yup
      .string()
      .required('Будь ласка, вкажіть свій номер телефону!')
      .matches(
        /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
        'Будь ласка, введіть валідний номер телефону!'
      )
      .min(10, 'Номер телефону має складатися не менше ніж з 10 символів!')
      .max(18, 'Номер телефону має складатися не більше ніж з 18 символів!'),
    time: yup
      .string()
      .required(
        'Будь ласка, вкажіть бажаний день та час, коли ми можемо вам зателефонувати!'
      ),
    tag: yup.string().optional(),
    utm_content: yup.string().optional(),
    utm_medium: yup.string().optional(),
    utm_campaign: yup.string().optional(),
    utm_source: yup.string().optional(),
    utm_term: yup.string().optional(),
    utm_referrer: yup.string().optional(),
    referrer: yup.string().optional(),
    gclientid: yup.string().optional(),
    gclid: yup.string().optional(),
    fbclid: yup.string().optional(),
  });

  const handleSubmit = async (values, { resetForm }) => {
    values.tag = utms.utm_source;
    values.utm_content = utms.utm_content;
    values.utm_medium = utms.utm_medium;
    values.utm_campaign = utms.utm_campaign;
    values.utm_source = utms.utm_source;
    values.utm_term = utms.utm_term;
    values.utm_referrer = utms.utm_referrer;
    values.referrer = utms.referrer;
    values.gclientid = utms.gclientid;
    values.gclid = utms.gclid;
    values.fbclid = utms.fbclid;
    setIsLoading(isLoading => (isLoading = true));

    try {
      const response = await axios.post('/leads', values);
      console.log(response);
      resetForm();
      navigate('/thankyou');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(isLoading => (isLoading = false));
    }
  };

  return (
    <FormBackground>
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
      <ThankYouSectionNew>
        <PageFormWrapper>
          <UnFormTextContent>
            <PageFormHeading>
              {utms.utm_source === 'apstarshak'
                ? 'Залишіть заявку та отримайте -15% знижки за промокодом «APStarshak»!'
                : 'Залишіть заявку і наш менеджер зв’яжеться з вами найближчим часом!'}
            </PageFormHeading>
            <LeadFormAddTextNew>
              P. S. Побачимось на пробному занятті 😉
            </LeadFormAddTextNew>
            <SocialsBoxNew>
              <SocialsTextNew>
                А також підписуйтеся на нас у соцмережах:
              </SocialsTextNew>
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
            </SocialsBoxNew>
          </UnFormTextContent>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={leadSchema}
          >
            <PageForm>
              <FormInputBox>
                <Label>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Ім'я та прізвище*"
                    autocomplete="off"
                  />
                  <InputNote component="p" name="name" />
                </Label>
                <Label>
                  <Input
                    type="tel"
                    name="phone"
                    placeholder="Телефон*"
                    autocomplete="off"
                  />
                  <InputNote component="p" name="phone" />
                </Label>
                <Label>
                  <Input
                    type="text"
                    name="time"
                    placeholder="Коли вам зателефонувати?*"
                    autocomplete="off"
                  />
                  <InputNote component="p" name="time" />
                </Label>
              </FormInputBox>
              <HiddenInput type="text" name="tag" />
              <HiddenInput type="text" name="utm_content" />
              <HiddenInput type="text" name="utm_medium" />
              <HiddenInput type="text" name="utm_campaign" />
              <HiddenInput type="text" name="utm_source" />
              <HiddenInput type="text" name="utm_term" />
              <HiddenInput type="text" name="utm_referrer" />
              <HiddenInput type="text" name="referrer" />
              <HiddenInput type="text" name="gclientid" />
              <HiddenInput type="text" name="gclid" />
              <HiddenInput type="text" name="fbclid" />
              <FormBtn type="submit">
                <FormBtnText> Надіслати </FormBtnText>
              </FormBtn>
              {isLoading && <Loader />}
            </PageForm>
          </Formik>
          <SocialsBoxNewMobile>
            <SocialsTextNew>
              А також підписуйтеся на нас у соцмережах:
            </SocialsTextNew>
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
          </SocialsBoxNewMobile>
        </PageFormWrapper>
        <BackgroundFilterTopLeft />
        <BackgroundFilterTopRight />
        <BackgroundFilterBottom />
      </ThankYouSectionNew>
    </FormBackground>
  );
};

export default UniversalLeadFormPage;
