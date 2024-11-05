import axios from 'axios';
import {
  FormInputBox,
  HiddenInput,
  InputNote,
  Label,
} from 'components/LeadForm/LeadForm.styled';
import { Loader } from 'components/SharedLayout/Loaders/Loader';
import { Formik } from 'formik';
import {
  FacebookBtn,
  InstagramBtn,
  SocialLogoLink,
  SocialsLinkWrapper,
  SocialsText,
  TextBubble,
  TextBubbleText,
  TikTokBtn,
  YouTubeBtn,
} from 'pages/ThankYouPage/ThankYouPage.styled';
import { useState } from 'react';
import * as yup from 'yup';
import loveImg from '../../../img/quiz/love.png';
import {
  FormBottomStar,
  PageForm,
} from '../../LeadFormPage/LeadFormPage.styled';
import {
  BackgroundFilterBottom,
  BackgroundFilterTop,
  BackgroungStarLargeNoEngage,
  BackgroungStarSmallNoEngage,
  CurrentPage,
  Description,
  Logo,
  LoveEmoji,
  NextPageBtn,
  PageCounter,
  Pagination,
  PreviousPageBtn,
  QuizArrowLeft,
  QuizArrowRight,
  QuizBox,
  QuizEnd,
  QuizInput,
  QuizSocialArrow,
  QuizSocialsBox,
  QuizTextBubbleWrapper,
  Title,
} from '../Quiz.styled';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';

export const QuizQuestionFormNoEngage = ({
  nextQuestion,
  quizValues,
  activeSlide,
  previousQuestion,
  lang,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const initialValues = {
    name: '',
    phone: '',
    mail: quizValues.current.mail,
    password: quizValues.current.password,
    tag: quizValues.current.tag,
    lang: quizValues.current.lang,
    adult: quizValues.current.adult,
    age: quizValues.current.age,
    knowledge: quizValues.current.knowledge,
    quantity: quizValues.current.quantity,
    difficulties: quizValues.current.difficulties,
    interests: quizValues.current.interests,
  };

  const leadSchema = yup.object().shape({
    name: yup
      .string()
      .required("Будь ласка, вкажіть своє ім'я!")
      .matches(
        /^[A-Za-zА-Яа-яіІїЇєЄ]/,
        "Будь ласка, введіть ім'я, без цифр та спецсимволів!"
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
    mail: yup.string().required(),
    password: yup.string().required(),
    tag: yup.string().required(),
    lang: yup.string().required(),
    adult: yup.boolean().required(),
    age: yup.string().required(),
    knowledge: yup.string().required(),
    quantity: yup.string().required(),
    difficulties: yup.string().required(),
    interests: yup.string().required(),
  });

  const handleSubmit = async (values, { resetForm }) => {
    setIsLoading(isLoading => (isLoading = true));

    const userSubmit = async (crmId, contactId) => {
      const userValues = {
        name: values.name.trim().trimStart(),
        mail: values.mail,
        password: values.password,
        pupilId: '0000000',
        crmId: crmId,
        contactId: contactId,
        age: quizValues.current.age,
        lang:
          quizValues.current.lang === 'en' && !quizValues.current.adult
            ? 'enkids'
            : quizValues.current.lang,
        course: '0',
        package: 'Квіз',
        knowledge: quizValues.current.knowledge,
        manager: '-',
      };

      try {
        const response = await axios.post('/users/new', userValues);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };

    try {
      const response = await axios.post('/leads/quiz-one/', values);
      console.log(response);
      quizValues.current.leadPage = response.data.engPage;
      quizValues.current.crmId = response.data.crmId;
      quizValues.current.contactId = response.data.contactId;
      console.log(response.data.crmId, response.data.contactId);
      userSubmit(response.data.crmId, response.data.contactId);
      // alert('reseting')
      setTimeout(() => {
        resetForm();
        setIsLoading(isLoading => (isLoading = false));
        setIsSuccess(isSuccess => (isSuccess = true));
      }, 1500);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {!isSuccess && (
        <QuizBox>
          <Logo />
          <Title>Майже готово!</Title>
          <Description>
            Щоб зареєструватися на перший пробний урок, введіть своє імʼя і
            актуальний номер телефону.
          </Description>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={leadSchema}
          >
            <PageForm>
              <FormBottomStar />
              <FormInputBox>
                <Label>
                  <QuizInput
                    type="text"
                    name="name"
                    placeholder="Ім'я*"
                    autocomplete="off"
                  />
                  <InputNote component="p" name="name" />
                </Label>
                <Label>
                  <QuizInput
                    type="tel"
                    name="phone"
                    placeholder="Телефон*"
                    autocomplete="off"
                  />
                  <InputNote component="p" name="phone" />
                </Label>
                <Label>
                  <QuizInput
                    type="text"
                    name="time"
                    placeholder="Коли вам зателефонувати?*"
                    autocomplete="off"
                  />
                  <InputNote component="p" name="time" />
                </Label>
              </FormInputBox>
              <HiddenInput type="text" name="tag" />
              <HiddenInput type="text" name="lang" />
              <HiddenInput type="text" name="adult" />
              <HiddenInput type="text" name="age" />
              <HiddenInput type="text" name="knowledge" />
              <HiddenInput type="text" name="quantity" />
              <HiddenInput type="text" name="difficulties" />
              <HiddenInput type="text" name="interests" />
              <QuizEnd type="submit" data-gtm="quizformsubmit">
                ЗАРЕЄСТРУВАТИСЬ
              </QuizEnd>
              {isLoading && <Loader />}
            </PageForm>
          </Formik>
          <BackgroundFilterTop /> <BackgroundFilterBottom />
          <BackgroungStarSmallNoEngage /> <BackgroungStarLargeNoEngage />
          <Pagination>
            <PreviousPageBtn
              className={activeSlide - 1 < 1 && 'disabled'}
              disabled={activeSlide - 1 < 1 && true}
              onClick={previousQuestion}
            >
              <QuizArrowLeft />
            </PreviousPageBtn>
            <PageCounter>
              <CurrentPage>{activeSlide}</CurrentPage>/{lang ? 7 : 8}
            </PageCounter>
            <NextPageBtn className="hidden" onClick={nextQuestion}>
              <QuizArrowRight />
            </NextPageBtn>
          </Pagination>
        </QuizBox>
      )}
      {isSuccess && (
        <QuizBox>
          <Logo />
          <Title>Вітаємо!</Title>
          <Description data-gtm="quizformsubmit">
            Ви успішно зареєструвались на перший урок з{' '}
            {quizValues.current.lang === 'en'
              ? 'англійської'
              : quizValues.current.lang === 'de'
              ? 'німецької'
              : quizValues.current.lang === 'pl'
              ? 'польської'
              : 'іноземної'}{' '}
            мови.
            <br />
            <br />
            Скоро вам зателефонує менеджер для уточнення деталей.
          </Description>
          <LoveEmoji src={loveImg} alt="Love emoji" width="80" />
          <QuizSocialsBox>
            <QuizTextBubbleWrapper>
              <TextBubbleText>
                P.S.: підписуйтесь на наші соцмережі!
              </TextBubbleText>
              <TextBubble />
            </QuizTextBubbleWrapper>
            <QuizSocialArrow />
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
          </QuizSocialsBox>
          <BackgroundFilterTop /> <BackgroundFilterBottom />
          <BackgroungStarSmallNoEngage /> <BackgroungStarLargeNoEngage />
        </QuizBox>
      )}
    </>
  );
};
