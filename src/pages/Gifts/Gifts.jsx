import axios from 'axios';
import {
  Label,
  LeftFormBackgroundStar,
  RightFormBackgroundStar,
} from 'components/LeadForm/LeadForm.styled';
import { LoginFormText } from 'components/Stream/Stream.styled';
import { Formik } from 'formik';
import {
  ExternalLinkIcon,
  LessonTopBox,
  LessonValuePdfLink,
  LessonVideoBox,
  PdfBox,
  PdfWrapper,
} from 'pages/MyAP/LessonFinder/LessonFinder.styled';
import { Title } from 'pages/Quiz/Quiz.styled';
import {
  AdminFormBtn,
  AdminInput,
  AdminInputNote,
  LoginForm,
} from 'pages/Streams/AdminPanel/AdminPanel.styled';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player/youtube';
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

const Gifts = () => {
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [user, setUser] = useState({});
  // const [isVideoOpen, setIsVideoOpen] = useState(true);
  // const [isGrammarOpen, setIsGrammarOpen] = useState(true);
  const [isPdfPreviewOpen, setIsPdfPreviewOpen] = useState(false);
  const [openedPdf, setOpenedPdf] = useState('');

  axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';

  const setAuthToken = token => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  useEffect(() => {
    document.title = 'Подарункові матеріали | AP Education';

    const refreshToken = async () => {
      console.log('token refresher');
      try {
        const res = await axios.post('/users/refresh', {
          mail: localStorage.getItem('mail'),
        });
        setIsUserLogged(isLogged => (isLogged = true));
        console.log(res);
        setUser(user => (user = { ...res.data.user }));
      } catch (error) {
        console.log(error);
      }
    };

    refreshToken();
  }, []);

  const initialLoginValues = {
    mail: '',
    password: '',
  };

  const loginSchema = yup.object().shape({
    mail: yup
      .string()
      .required('Вкажіть пошту, за якою ви зареєстровані на нашій платформі!'),
    password: yup
      .string()
      .required(
        'Введіть пароль, який ви використовуєте для входу на нашу платформу!'
      ),
  });

  const handleLoginSubmit = async (values, { resetForm }) => {
    values.mail = values.mail.toLowerCase().trim().trimStart();
    values.password = values.password.trim().trimStart();
    try {
      const response = await axios.post('/users/login', values);
      setAuthToken(response.data.token);
      setIsUserLogged(isLogged => (isLogged = true));
      setUser(user => (user = { ...response.data.user }));
      localStorage.setItem('mail', values.mail);
      resetForm();
    } catch (error) {
      console.error(error);
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
      {!isUserLogged ? (
        <Formik
          initialValues={initialLoginValues}
          onSubmit={handleLoginSubmit}
          validationSchema={loginSchema}
        >
          <LoginForm>
            <LeftFormBackgroundStar />
            <RightFormBackgroundStar />
            <LoginFormText>
              Привіт!
              <br />
              Логін і пароль від цієї сторінки ми надіслали вам в обраний вами
              месенджер!
            </LoginFormText>
            <Label>
              <AdminInput type="text" name="mail" placeholder="Login" />
              <AdminInputNote component="p" name="mail" type="email" />
            </Label>
            <Label>
              <AdminInput
                type="password"
                name="password"
                placeholder="Password"
              />
              <AdminInputNote component="p" name="password" />
            </Label>
            <AdminFormBtn type="submit">Увійти</AdminFormBtn>
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
    </>
  );
};

export default Gifts;
