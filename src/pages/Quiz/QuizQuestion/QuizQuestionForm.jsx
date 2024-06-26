import axios from 'axios';
import {
  FormInputBox,
  HiddenInput,
  InputNote,
  Label,
} from 'components/LeadForm/LeadForm.styled';
import { Loader } from 'components/SharedLayout/Loaders/Loader';
import { Formik } from 'formik';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import {
  FormBottomStar,
  PageForm,
} from '../../LeadFormPage/LeadFormPage.styled';
import {
  BackgroundFilterBottom,
  BackgroundFilterTop,
  BackgroungStarLarge,
  BackgroungStarSmall,
  CurrentPage,
  Description,
  Logo,
  NextPageBtn,
  PageCounter,
  Pagination,
  PreviousPageBtn,
  QuizArrowLeft,
  QuizArrowRight,
  QuizBox,
  QuizFormBtn,
  QuizInput,
  Title
} from '../Quiz.styled';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';

export const QuizQuestionForm = ({
  nextQuestion,
  quizValues,
  activeSlide,
  previousQuestion,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line
  const [route, setRoute] = useState('/thankyou');
  const location = useLocation().pathname;
  // const navigate = useNavigate();
  // const [wrong, setWrong] = useState('');

  const getTag = location => {
    switch (location) {
      case '/quiz':
        return 'quiz';
      default:
        break;
    }
  };

  const tag = getTag(location);
  const mailRandomId = Math.floor(Math.random() * 10000).toString();
  const passwordRandom = Math.floor(Math.random() * 10000).toString();

  const initialValues = {
    name: '',
    phone: '',
    mail:
      mailRandomId.length < 4
        ? `marathon-ap0${mailRandomId}@ap.edu`
        : `marathon-ap${mailRandomId}@ap.edu`,
    password: passwordRandom.length < 4 ? '0' + passwordRandom : passwordRandom,
    tag: tag,
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
      .max(15, 'Номер телефону має складатися не більше ніж з 15 символів!'),
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
        lang: quizValues.current.lang,
        course: '0',
        package: 'Марафон',
        knowledge: quizValues.current.knowledge,
        manager: 'суліган',
      };

      try {
        const response = await axios.post('/users/new', userValues);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };

    try {
      const response = await axios.post(
        '/leads/quiz',
        values
      );
      console.log(response);
      userSubmit(response.data.crmId, response.data.contactId);
      resetForm();
      console.log(route);
      // navigate(route, { replace: true });
    } catch (error) {
      console.error(error);
      // setWrong(wrong => (wrong = error));
    } finally {
      setIsLoading(isLoading => (isLoading = false));
    }
  };

  return (
    <>
      <QuizBox>
        <Logo />
        <Title>Майже готово!</Title>
        <Description>
          Щоб якомога швидше отримати доступ до марафону, введіть своє ім'я та
          номер. Увага! Вводьте актуальні дані, щоб ми змогли з вами зв'язатися
          і надіслати вам логін і пароль!
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
                  placeholder="Ім'я та прізвище*"
                />
                <InputNote component="p" name="name" />
              </Label>
              <Label>
                <QuizInput type="tel" name="phone" placeholder="Телефон*" />
                <InputNote component="p" name="phone" />
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
            {/* <button type="submit">Надіслати</button> */}
            {/* {wrong && `щось не цейво, а саме: ${wrong}`} */}
            {/* <ChatBotRedirectList>
              <ChatBotRedirectItem>
                <ChatBotBtn
                  type="submit"
                  onClick={() => {
                    setRoute('/marathon/wa');
                  }}
                >
                  <WhatsAppBotLink />
                </ChatBotBtn>
              </ChatBotRedirectItem>
              <ChatBotRedirectItem>
                <ChatBotBtn
                  type="submit"
                  onClick={() => {
                    setRoute('/marathon/tg');
                  }}
                >
                  <TelegramBotLink />
                </ChatBotBtn>
              </ChatBotRedirectItem>
              <ChatBotRedirectItem>
                <ChatBotBtn
                  type="submit"
                  onClick={() => {
                    setRoute('/marathon/viber');
                  }}
                >
                  <ViberBotLink />
                </ChatBotBtn>
              </ChatBotRedirectItem>
            </ChatBotRedirectList> */}
            {/* <QuizFormBtn>
              <TelegramBotLink />
            </QuizFormBtn>
            <QuizFormBtn>
              <ViberBotLink />
            </QuizFormBtn> */}
            <QuizFormBtn type="submit">НАДІСЛАТИ</QuizFormBtn>
            {isLoading && <Loader />}
          </PageForm>
        </Formik>
        {quizValues.current.leadPage ? (
          <iframe
            src={quizValues.current.leadPage}
            title="engagement page"
            height="50%"
            width="100%"
            // onClick={handleSubmit}
          ></iframe>
        ) : "NO LEADPAGE"}
        <BackgroundFilterTop /> <BackgroundFilterBottom />
        <BackgroungStarSmall /> <BackgroungStarLarge />
        <Pagination>
          <PreviousPageBtn
            className={activeSlide - 1 < 1 && 'disabled'}
            disabled={activeSlide - 1 < 1 && true}
            onClick={previousQuestion}
          >
            <QuizArrowLeft />
          </PreviousPageBtn>
          <PageCounter>
            <CurrentPage>{activeSlide}</CurrentPage>/8
          </PageCounter>
          <NextPageBtn className="hidden" onClick={nextQuestion}>
            <QuizArrowRight />
          </NextPageBtn>
        </Pagination>
      </QuizBox>
    </>
  );
};
