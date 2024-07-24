import axios from 'axios';
import {
  FormInputBox,
  HiddenInput,
  InputNote,
  Label,
} from 'components/LeadForm/LeadForm.styled';
import { Loader } from 'components/SharedLayout/Loaders/Loader';
import { Formik, useFormikContext } from 'formik';
import { useState } from 'react';
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
  QuizFormLink,
  QuizInput,
  Title,
} from '../Quiz.styled';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';

export const QuizQuestionForm = ({
  nextQuestion,
  quizValues,
  activeSlide,
  previousQuestion,
  lang,
}) => {
  const [isLoading, setIsLoading] = useState(false);

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
    quantity: quizValues.current.quantity || '',
    difficulties: quizValues.current.difficulties || '',
    interests: quizValues.current.interests || '',
    crmId: quizValues.current.crmId,
    contactId: quizValues.current.contactId,
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
    quantity: yup.string(),
    difficulties: yup.string(),
    interests: yup.string(),
    crmId: yup.number().required(),
    contactId: yup.number().required(),
  });

  const QuizSubmitLink = () => {
    const { values, isValid, submitForm } = useFormikContext();
    return (
      <QuizFormLink
        data-gtm="quizformsubmit"
        href={quizValues.current.leadPage}
        onClick={async e => {
          e.preventDefault();
          console.log(isValid);
          if (values.name && values.phone && isValid) {
            console.log('valid');
            await submitForm();
            setTimeout(() => {
              setIsLoading(isLoading => (isLoading = false));
              window.location.replace(quizValues.current.leadPage);
              // window.location.replace('/ap-site/thankyou');
            }, 1500);
          }
        }}
      >
        Перейти в месенджер
      </QuizFormLink>
    );
  };

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
        package: 'Марафон',
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
      const response = await axios.patch(
        `/leads/quiz/${quizValues.current.crmId}`,
        values
      );
      console.log(response);
      console.log(response.data.crmId, response.data.contactId);
      userSubmit(response.data.crmId, response.data.contactId);
      // alert('reseting')
      setTimeout(() => {
        resetForm();
      }, 1500);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <QuizBox>
        <Logo />
        <Title>Майже готово!</Title>
        <Description>
          Щоб отримати доступ до {lang ? 'пробних занять' : 'марафону'}, введіть
          своє ім’я і актуальний номер телефону та перейдіть у зручний для вас
          месенджер.
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
                <QuizInput type="text" name="name" placeholder="Ім'я*" />
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
            <QuizSubmitLink />
            {isLoading && <Loader />}
          </PageForm>
        </Formik>
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
            <CurrentPage>{activeSlide}</CurrentPage>/{lang ? 7 : 8}
          </PageCounter>
          <NextPageBtn className="hidden" onClick={nextQuestion}>
            <QuizArrowRight />
          </NextPageBtn>
        </Pagination>
      </QuizBox>
    </>
  );
};
