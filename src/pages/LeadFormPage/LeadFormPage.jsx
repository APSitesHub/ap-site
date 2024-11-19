import axios from 'axios';
import {
  FormBtn,
  FormInputBox,
  HiddenInput,
  Input,
  InputNote,
  Label,
} from 'components/LeadForm/LeadForm.styled';
import { HeaderWrapper, LogoNew, LogoRoute } from 'components/Menu/Menu.styled';
import { Loader } from 'components/SharedLayout/Loaders/Loader';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import thankYouPersonPNG from '../../img/bg/thank-you-person.png';
import thankYouPersonWebp from '../../img/bg/thank-you-person.webp';
import {
  FacebookBtn,
  HeroTopStar,
  InstagramBtn,
  LeadFormAddText,
  SocialArrow,
  SocialLogoLink,
  SocialsBox,
  SocialsLinkWrapper,
  SocialsText,
  TextBubble,
  TextBubbleText,
  TextBubbleWrapper,
  ThankYouHeader,
  ThankYouSection,
  TikTokBtn,
  YouTubeBtn,
} from '../ThankYouPage/ThankYouPage.styled';
import {
  FormBottomStar,
  PageForm,
  PageFormBottomStar,
  PageFormHeading,
  PageFormImage,
  PageFormPicture,
  PageFormWrapper,
} from './LeadFormPage.styled';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';

const LeadFormPage = ({ utms }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const query = useLocation().search;

  const replace = () =>
    location.includes('form-mova') && !query.includes('tg_only')
      ? window.location.replace('https://ap.education/form')
      : null;
  replace();

  const getTag = location => {
    switch (location) {
      case '/form':
        return '';
      case '/form-a':
      case '/form-a/':
        return 'deutschland';
      case '/form-b':
      case '/form-b/':
        return 'polskakawa';
      case '/form-c':
      case '/form-c/':
        return 'ukrdiaspora';
      case '/form-d':
      case '/form-d/':
        return 'dostupna';
      case '/form-e':
      case '/form-e/':
        return 'ukrnim';
      case '/form-f':
      case '/form-f/':
        return 'b2b';
      case '/form-g':
      case '/form-g/':
        return 'polanddiaspora';
      case '/form-h':
      case '/form-h/':
        return '5sliv';
      case '/form-i':
      case '/form-i/':
        return 'antisurzhyk';
      case '/form-j':
      case '/form-j/':
        return 'englishforukr';
      case '/form-k':
      case '/form-k/':
        return '5eng';
      case '/form-l':
      case '/form-l/':
        return 'expert';
      case '/form-m':
      case '/form-m/':
        return '5de';
      case '/form-n':
      case '/form-n/':
        return 'englishgalya';
      case '/form-o':
      case '/form-o/':
        return 'deleh';
      case '/form-tg1':
      case '/form-tg1/':
        return 'tg1';
      case '/form-tg2':
      case '/form-tg2/':
        return 'tg2';
      case '/form-tg3':
      case '/form-tg3/':
        return 'tg3';
      case '/form-tg4':
      case '/form-tg4/':
        return 'tg4';
      case '/form-tg5':
      case '/form-tg5/':
        return 'tg5';
      case '/form-tg6':
      case '/form-tg6/':
        return 'tg6';
      case '/form-tg7':
      case '/form-tg7/':
        return 'tg7';
      case '/form-tg8':
      case '/form-tg8/':
        return 'tg8';
      case '/form-tg9':
      case '/form-tg9/':
        return 'tg9';
      case '/form-tg10':
      case '/form-tg10/':
        return 'tg10';
      case '/form-mova1':
      case '/form-mova1/':
        return 'mova1';
      case '/form-mova2':
      case '/form-mova2/':
        return 'mova2';
      case '/form-mova3':
      case '/form-mova3/':
        return 'mova3';
      case '/form-mova4':
      case '/form-mova4/':
        return 'mova4';
      case '/form-mova5':
      case '/form-mova5/':
        return 'mova5';
      case '/form-mova6':
      case '/form-mova6/':
        return 'mova6';
      case '/form-mova7':
      case '/form-mova7/':
        return 'mova7';
      case '/form-mova8':
      case '/form-mova8/':
        return 'mova8';
      case '/form-ov':
      case '/form-ov/':
        return 'oz.vyshnia';
      case '/form-mix1':
      case '/form-mix1/':
        return 'mix1';
      case '/form-mix2':
      case '/form-mix2/':
        return 'mix2';
      case '/form-mix3':
      case '/form-mix3/':
        return 'mix3';
      case '/form-mix4':
      case '/form-mix4/':
        return 'mix4';
      case '/form-nuts':
      case '/form-nuts/':
        return 'nuts';
      case '/form-friend':
      case '/form-friend/':
        return 'friend';
      case '/form-apbot':
      case '/form-apbot/':
        return 'apbot';
      case '/form-uni':
      case '/form-uni/':
        return 'Університетські ходіння';
      case '/form-engpls':
      case '/form-engpls/':
        return 'engpls';
      case '/form-qeng':
      case '/form-qeng/':
        return 'qeng';
      case '/form-london':
      case '/form-london/':
        return 'london';
      case '/form-adm1':
      case '/form-adm1/':
        return 'adm1';
      case '/form-adm2':
      case '/form-adm2/':
        return 'adm2';
      case '/form-adm3':
      case '/form-adm3/':
        return 'adm3';
      case '/form-adm4':
      case '/form-adm4/':
        return 'adm4';
      case '/form-speak':
      case '/form-speak/':
        return 'speak';
      case '/form-trrudtg':
      case '/form-trrudtg/':
        return 'trrudtg';
      default:
        break;
    }
  };

  const tag = getTag(location);

  console.log(tag);

  useEffect(() => {
    document.title = 'Форма консультації | AP Education';
  }, []);

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
    values.tag = tag;
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
    <>
      <ThankYouHeader>
        <HeaderWrapper>
          <LogoRoute to="/">
            <LogoNew />
          </LogoRoute>
        </HeaderWrapper>
      </ThankYouHeader>
      <ThankYouSection>
        <PageFormWrapper>
          <PageFormHeading>
            Залишіть заявку і ми з вами сконтактуємо!
          </PageFormHeading>
          <LeadFormAddText>
            P.S.: Зустрінемось на пробному занятті 😉
          </LeadFormAddText>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={leadSchema}
          >
            <PageForm>
              <FormBottomStar />
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
              <FormBtn type="submit">Надіслати</FormBtn>
              {isLoading && <Loader />}
            </PageForm>
          </Formik>
        </PageFormWrapper>

        <HeroTopStar />
        <PageFormBottomStar />

        <PageFormPicture>
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
          <PageFormImage
            src={thankYouPersonPNG}
            alt="Thank you page person image"
          />
        </PageFormPicture>

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
              href="https://www.tiktok.com/@ap.education.center"
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

export default LeadFormPage;
