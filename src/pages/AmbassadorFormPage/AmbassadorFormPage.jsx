import useSize from '@react-hook/size';
import axios from 'axios';
import {
  FormBtn,
  HiddenInput,
  Input,
  InputNote,
  Label,
} from 'components/LeadForm/LeadForm.styled';
import { HeaderWrapper, LogoNew, LogoRoute } from 'components/Menu/Menu.styled';
import { Loader } from 'components/SharedLayout/Loaders/Loader';
import { Formik } from 'formik';
import { FormSelect } from 'pages/Streams/TimeTableAdminPanel/TimeTableAdminPanel.styled';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import thankYouPersonPNG from '../../img/bg/thank-you-person.png';
import thankYouPersonWebp from '../../img/bg/thank-you-person.webp';
import {
  FacebookBtn,
  HeroTopStar,
  InstagramBtn,
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
  PageForm,
  PageFormBottomStar,
  PageFormHeading,
  PageFormImage,
  PageFormPicture,
  PageFormWrapper,
} from './AmbassadorFormPage.styled';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';

const AmbassadorFormPage = ({ utms }) => {
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line
  const [course, setCourse] = useState('');
  // eslint-disable-next-line
  const [lang, setLang] = useState('');
  // eslint-disable-next-line
  const [level, setLevel] = useState('');
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const query = useLocation().search;

  // eslint-disable-next-line
  const [width, _] = useSize(document.body);

  const replace = () =>
    location.includes('form-mova') && !query.includes('tg_only')
      ? window.location.replace('https://ap.education/form')
      : null;
  replace();

  const getTag = location => {
    switch (location) {
      case '/form':
        return '';
      default:
        break;
    }
  };

  const tag = getTag(location);

  console.log(tag);

  useEffect(() => {
    document.title = 'Форма амбасадора | AP Education';
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

  const langOptions = [
    {
      label: 'Англійська',
      value: 'en',
    },
    {
      label: 'Німецька',
      value: 'de',
    },
    {
      label: 'Польська',
      value: 'pl',
    },
  ];

  const courseOptions = [
    {
      label: '1',
      value: '1',
    },
    {
      label: '2',
      value: '2',
    },
    {
      label: '3',
      value: '3',
    },
    {
      label: '4',
      value: '4',
    },
  ];

  const levelOptions = [
    {
      label: 'A1',
      value: 'a1',
    },
    {
      label: 'A2',
      value: 'a2',
    },
    {
      label: 'B1',
      value: 'b1',
    },
    {
      label: 'B2',
      value: 'b2',
    },
    {
      label: 'C1',
      value: 'c1',
    },
    {
      label: 'C2',
      value: 'c2',
    },
  ];

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
      .max(15, 'Номер телефону має складатися не більше ніж з 15 символів!'),
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
            Залишіть заявку зараз та станьте амбасадором AP Education!
          </PageFormHeading>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={leadSchema}
          >
            <PageForm>
              <Label>
                <Input
                  type="text"
                  name="name"
                  placeholder="Ім'я та прізвище*"
                />
                <InputNote component="p" name="name" />
              </Label>
              <Label>
                <Input type="tel" name="phone" placeholder="Телефон*" />
                <InputNote component="p" name="phone" />
              </Label>
              <Label>
                <Input
                  type="text"
                  name="tg-username"
                  placeholder="Нікнейм у Телеграм"
                />
                <InputNote component="p" name="tg-username" />
              </Label>
              <FormSelect
                options={courseOptions}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    border: 'none',
                    borderColor: 'transparent',
                    boxShadow: 'none',
                  }),
                  container: (baseStyles, state) => ({
                    ...baseStyles,
                    borderRadius: '50px',
                    backgroundColor: 'white',
                    padding: '8px 32px',
                  }),
                }}
                placeholder="Курс навчання*"
                name="course"
                onChange={course => {
                  setCourse(course.value);
                }}
              />
              <Label>
                <Input
                  type="tel"
                  name="specialty"
                  placeholder="Спеціальність*"
                />
                <InputNote component="p" name="specialty" />
              </Label>
              <FormSelect
                options={langOptions}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    border: 'none',
                    borderColor: 'transparent',
                    backgroundColor: 'white',
                    boxShadow: 'none',
                  }),
                  container: (baseStyles, state) => ({
                    ...baseStyles,
                    borderRadius: '50px',
                    padding: '8px 32px',
                  }),
                }}
                placeholder="Яку мову знаєш?*"
                name="lang"
                onChange={lang => {
                  setLang(lang.value);
                }}
              />
              <FormSelect
                options={levelOptions}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    border: 'none',
                    borderColor: 'transparent',
                    backgroundColor: 'white',
                    boxShadow: 'none',
                  }),
                  container: (baseStyles, state) => ({
                    ...baseStyles,
                    borderRadius: '50px',
                    padding: '8px 32px',
                  }),
                }}
                placeholder="На який рівень?*"
                name="course"
                onChange={level => {
                  setLevel(level.value);
                }}
              />
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

export default AmbassadorFormPage;
