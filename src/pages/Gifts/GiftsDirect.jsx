import axios from 'axios';
import {
  Label,
  LeftFormBackgroundStar,
  RightFormBackgroundStar,
} from 'components/LeadForm/LeadForm.styled';
import { Loader } from 'components/SharedLayout/Loaders/Loader';
import { LoginFormText } from 'components/Stream/Stream.styled';
import { Formik, useFormikContext } from 'formik';
import {
  ExternalLinkIcon,
  LessonTopBox,
  LessonValuePdfLink,
  LessonVideoBox,
  PdfBox,
  PdfWrapper,
} from 'pages/MyAP/LessonFinder/LessonFinder.styled';
import { QuizFormLink, Title } from 'pages/Quiz/Quiz.styled';
import {
  AdminFormBtn,
  AdminInput,
  AdminInputNote,
  LoginForm,
} from 'pages/Streams/AdminPanel/AdminPanel.styled';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import { useLocation } from 'react-router-dom';
import * as yup from 'yup';
import { ReactComponent as PdfIcon } from '../../img/svg/pdf-icon.svg';
import {
  GiftLinkIcon,
  GiftsBox,
  GiftsBoxItem,
  GiftsDescription,
  GiftsVideoBox,
  Logo,
  PdfPreview,
  PdfPreviewBackground,
  QuizletLink,
  QuizletLogo,
  QuizletShortLogo,
  SubTitle,
  YouTubeLogo,
} from './Gifts.styled';
import { gifts } from './giftsSet';

const GiftsDirect = () => {
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [user, setUser] = useState({});
  const [isPhoneSent, setIsPhoneSent] = useState(false);
  const [isPdfPreviewOpen, setIsPdfPreviewOpen] = useState(false);
  const [openedPdf, setOpenedPdf] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const mailRandomId = Math.floor(Math.random() * 1000000).toString();
  const passwordRandom = Math.floor(Math.random() * 1000000).toString();
  const authCodeRandom = Math.floor(Math.random() * 1000000).toString();

  console.log(user);

  const id = useLocation().pathname.match(/(\d+)/)[0];
  console.log(id);

  axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';

  const setAuthToken = token => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  useEffect(() => {
    document.title = 'Подарункові матеріали | AP Education';

    const refreshToken = async () => {
      // setIsLoading(true);
      console.log('token refresher');
      console.log(localStorage.getItem('authCode'));
      if (localStorage.getItem('authCode')) {
        try {
          const res = await axios.post('/users/refresh-code', {
            authCode: localStorage.getItem('authCode'),
          });
          setIsUserLogged(isLogged => (isLogged = true));
          console.log(res);
          setUser(user => (user = { ...res.data.user }));
        } catch (error) {
          console.log(error);
        } 
      }
    };

    refreshToken();
  }, []);

  const initialPhoneValues = {
    phone: '',
    name: `Marathon User ${authCodeRandom}`,
    mail:
      mailRandomId.length < 6
        ? `marathon-ap0${mailRandomId}@ap.edu`
        : `marathon-ap${mailRandomId}@ap.edu`,
    password: passwordRandom.length < 6 ? '0' + passwordRandom : passwordRandom,
    authCode: authCodeRandom,
  };

  const initialAuthCodeValue = {
    authCode: '',
  };

  const QuizSubmitLink = () => {
    console.log(useFormikContext());
    const { values, isValid, submitForm } = useFormikContext();
    return (
      <QuizFormLink
        onClick={async e => {
          console.log(isValid);
          if (values.authCode && isValid) {
            console.log('valid');
            await submitForm();
            // setIsLoading(isLoading => (isLoading = false));
          }
        }}
      >
        Перейти до подарунків
      </QuizFormLink>
    );
  };

  const phoneSchema = yup.object().shape({
    phone: yup
      .string()
      .required('Будь ласка, вкажіть свій номер телефону!')
      .matches(
        /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
        'Будь ласка, введіть валідний номер телефону!'
      )
      .min(10, 'Номер телефону має складатися не менше ніж з 10 символів!')
      .max(15, 'Номер телефону має складатися не більше ніж з 15 символів!'),
    name: yup.string(),
    mail: yup.string(),
    password: yup.string(),
    authCode: yup.string(),
  });

  const authCodeSchema = yup.object().shape({
    authCode: yup
      .string()
      .required('Вкажіть код, який ми надіслали вам в SMS!'),
  });

  const handlePhoneSubmit = async (values, { resetForm }) => {
    values.phone = values.phone.trim().trimStart();
    try {
      setIsLoading(true);
      const response = await axios.put(`/users/crm-gifts/${id}`, values);
      console.log(response);
      setAuthToken(response.data.token);
      setIsPhoneSent(isPhoneSent => (isPhoneSent = true));
      setUser(user => (user = { ...response.data }));
      resetForm();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeSubmit = async (values, { resetForm }) => {
    values = { authCode: values.authCode.trim().trimStart() };
    console.log(values);
    try {
      setIsLoading(true);
      const response = await axios.post('/users/login-direct', values);
      setAuthToken(response.data.token);
      setIsUserLogged(isLogged => (isLogged = true));
      setUser(user => (user = { ...response.data.user }));
      localStorage.setItem('authCode', user.authCode);
      resetForm();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePdfPreviewOnTouch = pdfId => {
    const pdfOpener = pdfId => {
      console.log('opener');
      setOpenedPdf(pdf => (pdf = pdfId));
      setIsPdfPreviewOpen(isOpen => !isOpen);
    };

    setOpenedPdf(pdfId);
    isPdfPreviewOpen && pdfId !== openedPdf
      ? setOpenedPdf(pdf => (pdf = pdfId))
      : !isPdfPreviewOpen && pdfId === openedPdf
      ? setIsPdfPreviewOpen(isOpen => !isOpen)
      : isPdfPreviewOpen && pdfId === openedPdf
      ? setIsPdfPreviewOpen(isOpen => !isOpen)
      : pdfOpener(pdfId);
  };

  const openPdfPreviewOnHover = e => {
    setOpenedPdf(pdf => (pdf = e.target.id));
    if (!isPdfPreviewOpen) {
      setIsPdfPreviewOpen(isOpen => !isOpen);
    }
  };

  const closePdfPreviewOnMouseOut = () => {
    console.log('mouse out?');
    setOpenedPdf(pdf => (pdf = ''));
    if (isPdfPreviewOpen) {
      setIsPdfPreviewOpen(isOpen => !isOpen);
    }
  };

  return (
    <>
      {!isUserLogged && !isPhoneSent ? (
        <Formik
          initialValues={initialPhoneValues}
          onSubmit={handlePhoneSubmit}
          validationSchema={phoneSchema}
        >
          <LoginForm>
            <LeftFormBackgroundStar />
            <RightFormBackgroundStar />
            <LoginFormText>
              Привіт!
              <br />
              Для отримання паролю від цієї сторінки, будь ласка, вкажіть свій
              актуальний номер!
            </LoginFormText>
            <Label>
              <AdminInput
                type="text"
                name="phone"
                placeholder="Номер телефону*"
              />
              <AdminInputNote component="p" name="phone" />
            </Label>
            <AdminFormBtn type="submit">Отримати код</AdminFormBtn>
          </LoginForm>
        </Formik>
      ) : !isUserLogged && isPhoneSent ? (
        <Formik
          initialValues={initialAuthCodeValue}
          onSubmit={handleCodeSubmit}
          validationSchema={authCodeSchema}
        >
          <LoginForm>
            <LeftFormBackgroundStar />
            <RightFormBackgroundStar />
            <LoginFormText>
              Вкажіть код, який ми надіслали вам в SMS-повідомленні!
            </LoginFormText>
            <Label>
              <AdminInput type="text" name="authCode" placeholder="Код*" />
              <AdminInputNote component="p" name="authCode" />
            </Label>
            <QuizSubmitLink>Перейти до подарунків</QuizSubmitLink>
            {/* <AdminFormBtn type="submit">Увійти</AdminFormBtn> */}
          </LoginForm>
        </Formik>
      ) : (
        <>
          <Logo />
          <Title>Подарункові матеріали</Title>
          <SubTitle>
            Розпочніть своє навчання вже зараз з безкоштовними подарунковими
            матеріалами!
          </SubTitle>
          <GiftsBox>
            {gifts[user.lang][user.knowledge].map((gift, i) => (
              <>
                <GiftsBoxItem key={i}>
                  {gift.type === 'quizlet' && (
                    <LessonTopBox>
                      <QuizletLink
                        target="_blank"
                        rel="noopener noreferrer"
                        to={gift.link}
                      >
                        <QuizletLogo />
                        <QuizletShortLogo />
                        <GiftsDescription>
                          Набір вправ для самостійного вивчення слів для рівня{' '}
                          {gift.name}
                        </GiftsDescription>
                        <GiftLinkIcon />
                      </QuizletLink>
                    </LessonTopBox>
                  )}
                  {gift.type === 'video' && (
                    <GiftsVideoBox
                    // className={!isVideoOpen && 'minimized'}
                    >
                      <LessonTopBox>
                        <YouTubeLogo />
                        <GiftsDescription>{gift.name}</GiftsDescription>
                      </LessonTopBox>
                      <LessonVideoBox>
                        <ReactPlayer
                          loop={true}
                          muted={false}
                          controls={true}
                          style={{
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                          }}
                          width="100%"
                          height="100%"
                          url={gift.link}
                        />
                      </LessonVideoBox>
                    </GiftsVideoBox>
                  )}

                  {gift.type === 'grammar' && (
                    <PdfBox
                      onMouseLeave={closePdfPreviewOnMouseOut}
                      // className={!isGrammarOpen && 'minimized'}
                    >
                      <PdfWrapper
                        id={gift.link}
                        onMouseEnter={e => openPdfPreviewOnHover(e)}
                        onTouchEnd={() => togglePdfPreviewOnTouch(gift.link)}
                      >
                        <PdfIcon />
                        <LessonValuePdfLink
                          target="_blank"
                          rel="noopener noreferrer"
                          to={gift.link}
                        >
                          <GiftsDescription>{gift.name}</GiftsDescription>
                          <ExternalLinkIcon />
                        </LessonValuePdfLink>
                      </PdfWrapper>
                      <PdfPreviewBackground
                        className={
                          isPdfPreviewOpen &&
                          openedPdf === gift.link &&
                          'preview-open'
                        }
                      >
                        {isPdfPreviewOpen && openedPdf === gift.link && (
                          <PdfPreview
                            title={`Preview of ${gift.link}`}
                            src={gift.link
                              .replace('open?id=', 'file/d/')
                              .replace('view', 'preview')
                              .replace('&usp=drive_copy', '/preview')}
                            allow="autoplay"
                          ></PdfPreview>
                        )}
                      </PdfPreviewBackground>
                    </PdfBox>
                  )}
                </GiftsBoxItem>
              </>
            ))}
          </GiftsBox>
        </>
      )}
      {isLoading && <Loader />}
    </>
  );
};

export default GiftsDirect;
