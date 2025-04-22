import { Formik } from 'formik';
import * as yup from 'yup';
import { Label } from 'components/LeadForm/LeadForm.styled';
import { LoginFormText } from 'components/Stream/Stream.styled';
import {
  AdminFormBtn,
  AdminInput,
  AdminInputNote,
} from 'pages/Streams/AdminPanel/AdminPanel.styled';
import { GradientBackground, LoginForm, LoginPage } from '../Videochat.styled';
import { useParams } from 'react-router-dom';

function Login({ logined }) {
  const { id: roomID } = useParams();
  const lang = roomID === '446390d3-10c9-47f4-8880-8d9043219ccd' ? 'pl' : 'ua';

  const initialLoginValues = {
    userName: localStorage.getItem('userName') || '',
  };

  const loginSchema = yup.object().shape({
    userName: yup
      .string()
      .required(lang === 'pl' ? 'Wpisz swoje imię i nazwisko.' : "Введи ім'я та прізвище")
      .max(40, lang === 'pl' ? 'Maksymalnie 40 znaków' : 'Максимум 40 символів')
      .test(
        'no-teacher-suffix',
        lang === 'pl'
          ? 'Nie może kończyć się na "(teacher)"'
          : 'Не може закінчуватись на "(teacher)"',
        value => !value?.toLowerCase().endsWith('(teacher)')
      ),
  });

  return (
    <GradientBackground>
      <LoginPage>
        <Formik
          initialValues={initialLoginValues}
          onSubmit={logined}
          validationSchema={loginSchema}
        >
          <LoginForm>
            <LoginFormText style={{ color: 'white' }}>
              {lang === 'pl' ? (
                <>
                  Pozdrowienia!
                  <br />
                  Wprowadź swoje imię i nazwisko, aby uzyskać dostęp do klasy
                </>
              ) : (
                <>
                  Привіт!
                  <br />
                  Введи своє ім'я та прізвище для доступу до заняття
                </>
              )}
            </LoginFormText>
            <Label>
              <AdminInput
                type="text"
                name="userName"
                placeholder={lang === 'pl' ? 'Imię i nazwisko' : "Ім'я та прізвище"}
              />
              <AdminInputNote
                component="p"
                name="userName"
                type="text"
                style={{ color: 'red' }}
              />
            </Label>
            <AdminFormBtn type="submit">
              {lang === 'pl' ? 'Zalogować się' : 'Увійти'}
            </AdminFormBtn>
          </LoginForm>
        </Formik>
      </LoginPage>
    </GradientBackground>
  );
}

export default Login;
