import axios from 'axios';
import { Label } from 'components/LeadForm/LeadForm.styled';
import { Loader } from 'components/SharedLayout/Loaders/Loader';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import {
  AdminFormBtn,
  AdminInput,
  AdminInputNote,
  AdminPanelSection,
  LinksFieldGroup,
  LinksFieldGroupTitle,
  LinksForm,
  LoginForm,
} from './AdminPanel.styled';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';
const setAuthToken = token => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const UniAdminPanel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(false);

  useEffect(() => {
    document.title = 'Uni Link Admin Panel | AP Education';

    const refreshToken = async () => {
      console.log('token refresher');
      try {
        if (localStorage.getItem('isAdmin')) {
          const res = await axios.post('admins/refresh/', {});
          console.log(res);
          setIsUserAdmin(isAdmin => (isAdmin = true));
          setAuthToken(res.data.newToken);
        }
      } catch (error) {
        console.log(error);
      }
    };
    refreshToken();
  }, [isUserAdmin]);

  const initialLoginValues = {
    login: '',
    password: '',
  };

  const loginSchema = yup.object().shape({
    login: yup.string().required('Вкажіть логін!'),
    password: yup.string().required('Введіть пароль!'),
  });

  const handleLoginSubmit = async (values, { resetForm }) => {
    setIsLoading(isLoading => (isLoading = true));

    try {
      const response = await axios.post('/admins/login', values);
      setAuthToken(response.data.token);
      setIsUserAdmin(isAdmin => (isAdmin = true));
      localStorage.setItem('isAdmin', true);
      resetForm();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(isLoading => (isLoading = false));
    }
  };

  const initialLinksValues = {
    pedagogium_logistics: '',
    pedagogium_logistics_2: '',
    pedagogium_prep: '',
    wstijo_logistics: '',
    wstijo_prep: '',
    wsbmir_logistics: '',
    wsbmir_prep: '',
    ewspa_logistics: '',
    ewspa_prep: '',
    merito_logistics: '',
    merito_prep: '',
    merito_automation: '',
    wstih_logistics: '',
    wstih_prep: '',
    wskm_cnc: '',
    wssip_logistics: '',
    wssip_prep: '',
    wspa_logistics: '',
    wspa_prep: '',
    wse_prep: '',
    eu: '',
    ssw: '',
    mans: '',
    ahns: '',
    answp: '',
  };

  const linksSchema = yup.object().shape({
    pedagogium_logistics: yup.string().optional(),
    pedagogium_logistics_2: yup.string().optional(),
    pedagogium_prep: yup.string().optional(),
    wstijo_logistics: yup.string().optional(),
    wstijo_prep: yup.string().optional(),
    wsbmir_logistics: yup.string().optional(),
    wsbmir_prep: yup.string().optional(),
    ewspa_logistics: yup.string().optional(),
    ewspa_prep: yup.string().optional(),
    merito_logistics: yup.string().optional(),
    merito_prep: yup.string().optional(),
    merito_automation: yup.string().optional(),
    wstih_logistics: yup.string().optional(),
    wstih_prep: yup.string().optional(),
    wskm_cnc: yup.string().optional(),
    wssip_logistics: yup.string().optional(),
    wssip_prep: yup.string().optional(),
    wspa_logistics: yup.string().optional(),
    wspa_prep: yup.string().optional(),
    wse_prep: yup.string().optional(),
    eu: yup.string().optional(),
    ssw: yup.string().optional(),
    mans: yup.string().optional(),
    ahns: yup.string().optional(),
    answp: yup.string().optional(),
  });

  const handleLinksSubmit = async (values, { resetForm }) => {
    setIsLoading(isLoading => (isLoading = true));

    try {
      const response = await axios.patch('/unilinks', values);
      console.log(response);
      resetForm();
      alert('Лінки замінилися, молодець');
    } catch (error) {
      console.error(error);
      alert('Щось не прокнуло!');
    } finally {
      setIsLoading(isLoading => (isLoading = false));
    }
  };

  return (
    <>
      <AdminPanelSection>
        {!isUserAdmin && (
          <Formik
            initialValues={initialLoginValues}
            onSubmit={handleLoginSubmit}
            validationSchema={loginSchema}
          >
            <LoginForm>
              <Label>
                <AdminInput type="text" name="login" placeholder="Login" />
                <AdminInputNote component="p" name="login" />
              </Label>
              <Label>
                <AdminInput type="password" name="password" placeholder="Password" />
                <AdminInputNote component="p" name="password" />
              </Label>
              <AdminFormBtn type="submit">Залогінитись</AdminFormBtn>
            </LoginForm>
          </Formik>
        )}

        {isUserAdmin && (
          <Formik
            initialValues={initialLinksValues}
            onSubmit={handleLinksSubmit}
            validationSchema={linksSchema}
          >
            <LinksForm>
              <LinksFieldGroup>
                <LinksFieldGroupTitle>
                  Pedagogium (Wyższa Szkoła Nauk Społecznych)
                </LinksFieldGroupTitle>
                <Label>
                  <AdminInput
                    type="text"
                    name="pedagogium_logistics"
                    placeholder="Pedagogium Logistics"
                  />
                  <AdminInputNote component="p" name="pedagogium_logistics" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="pedagogium_logistics_2"
                    placeholder="Pedagogium Logistics 2"
                  />
                  <AdminInputNote component="p" name="pedagogium_logistics_2" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="pedagogium_prep"
                    placeholder="Pedagogium Przygotowawczy Kurs"
                  />
                  <AdminInputNote component="p" name="pedagogium_prep" />
                </Label>
              </LinksFieldGroup>
              <LinksFieldGroup>
                <LinksFieldGroupTitle>
                  WSTIJO (Wyzsza Szkoła Turystyki i Jezykow Obcych w Warszawie)
                </LinksFieldGroupTitle>
                <Label>
                  <AdminInput
                    type="text"
                    name="wstijo_logistics"
                    placeholder="WSTIJO Logistics"
                  />
                  <AdminInputNote component="p" name="wstijo_logistics" />
                </Label>
                {/* <Label>
                  <AdminInput
                    type="text"
                    name="wstijo_prep"
                    placeholder="WSTIJO Przygotowawczy Kurs"
                  />
                  <AdminInputNote component="p" name="wstijo_prep" />
                </Label> */}
              </LinksFieldGroup>
              <LinksFieldGroup>
                <LinksFieldGroupTitle>
                  WSBMIR (Wyższa Szkoła Biznesu, Mediów i Reklamy)
                </LinksFieldGroupTitle>
                <Label>
                  <AdminInput
                    type="text"
                    name="wsbmir_logistics"
                    placeholder="WSBMIR Logistics"
                  />
                  <AdminInputNote component="p" name="wsbmir_logistics" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="wsbmir_prep"
                    placeholder="WSBMIR Przygotowawczy Kurs"
                  />
                  <AdminInputNote component="p" name="wsbmir_prep" />
                </Label>
              </LinksFieldGroup>
              <LinksFieldGroup>
                <LinksFieldGroupTitle>
                  EWSPA (Wyższa Szkoła Biznesu, Mediów i Reklamy)
                </LinksFieldGroupTitle>
                <Label>
                  <AdminInput
                    type="text"
                    name="ewspa_logistics"
                    placeholder="EWSPA Logistics"
                  />
                  <AdminInputNote component="p" name="ewspa_logistics" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="ewspa_prep"
                    placeholder="EWSPA Przygotowawczy Kurs"
                  />
                  <AdminInputNote component="p" name="ewspa_prep" />
                </Label>
              </LinksFieldGroup>
              <LinksFieldGroup>
                <LinksFieldGroupTitle>
                  Merito (Uniwersytet WSB Merito Warszawa)
                </LinksFieldGroupTitle>
                <Label>
                  <AdminInput
                    type="text"
                    name="merito_logistics"
                    placeholder="Merito Logistics"
                  />
                  <AdminInputNote component="p" name="merito_logistics" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="merito_prep"
                    placeholder="Merito Preparation Course"
                  />
                  <AdminInputNote component="p" name="merito_prep" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="merito_automation"
                    placeholder="Merito Industrial Automation"
                  />
                  <AdminInputNote component="p" name="merito_automation" />
                </Label>
              </LinksFieldGroup>
              <LinksFieldGroup>
                <LinksFieldGroupTitle>
                  WSTiH (Wyższa Szkoła Turystyki i Hotelarstwa w Gdańsku)
                </LinksFieldGroupTitle>
                <Label>
                  <AdminInput
                    type="text"
                    name="wstih_logistics"
                    placeholder="WSTiH Logistics"
                  />
                  <AdminInputNote component="p" name="wstih_logistics" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="wstih_prep"
                    placeholder="WSTiH Preparation Course"
                  />
                  <AdminInputNote component="p" name="wstih_prep" />
                </Label>
              </LinksFieldGroup>
              <LinksFieldGroup>
                <LinksFieldGroupTitle>
                  WSKM (Wyższa Szkoła Kadr Menedżerskich)
                </LinksFieldGroupTitle>
                <Label>
                  <AdminInput type="text" name="wskm_cnc" placeholder="WSKM CNC" />
                  <AdminInputNote component="p" name="wskm_cnc" />
                </Label>
              </LinksFieldGroup>
              <LinksFieldGroup>
                <LinksFieldGroupTitle>
                  WSSiP (Wyższa Szkoła Sztuki i Projektowania)
                </LinksFieldGroupTitle>
                <Label>
                  <AdminInput
                    type="text"
                    name="wssip_logistics"
                    placeholder="WSSiP Logistics"
                  />
                  <AdminInputNote component="p" name="wssip_logistics" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="wssip_prep"
                    placeholder="WSSiP Preparation Course"
                  />
                  <AdminInputNote component="p" name="wssip_prep" />
                </Label>
              </LinksFieldGroup>
              <LinksFieldGroup>
                <LinksFieldGroupTitle>
                  WSPA (Wyższa Szkoła Przedsiębiorczości i Administracji)
                </LinksFieldGroupTitle>
                <Label>
                  <AdminInput
                    type="text"
                    name="wspa_logistics"
                    placeholder="WSPA Logistics"
                  />
                  <AdminInputNote component="p" name="wspa_logistics" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="wspa_prep"
                    placeholder="WSPA Preparation Course"
                  />
                  <AdminInputNote component="p" name="wspa_prep" />
                </Label>
              </LinksFieldGroup>
              <LinksFieldGroup>
                <LinksFieldGroupTitle>
                  WSE (Wyższa Szkoła Ekonomiczna w Stalowej Woli)
                </LinksFieldGroupTitle>
                <Label>
                  <AdminInput
                    type="text"
                    name="wse_prep"
                    placeholder="WSE Preparation Course"
                  />
                  <AdminInputNote component="p" name="wse_prep" />
                </Label>
              </LinksFieldGroup>
              <LinksFieldGroup>
                <LinksFieldGroupTitle>EU (Education Union)</LinksFieldGroupTitle>
                <Label>
                  <AdminInput type="text" name="eu" placeholder="Education Union" />
                  <AdminInputNote component="p" name="eu" />
                </Label>
              </LinksFieldGroup>
              <LinksFieldGroup>
                <LinksFieldGroupTitle>
                  SSW (Świętokrzyska Szkoła Wyższa im. św. Jana Pawła II)
                </LinksFieldGroupTitle>
                <Label>
                  <AdminInput type="text" name="ssw" placeholder="SSW" />
                  <AdminInputNote component="p" name="ssw" />
                </Label>
              </LinksFieldGroup>
              <LinksFieldGroup>
                <LinksFieldGroupTitle>
                  MANS (Międzynarodowa Akademia Nauk Stosowanych w Łomży)
                </LinksFieldGroupTitle>
                <Label>
                  <AdminInput type="text" name="mans" placeholder="MANS" />
                  <AdminInputNote component="p" name="mans" />
                </Label>
              </LinksFieldGroup>
              <LinksFieldGroup>
                <LinksFieldGroupTitle>
                  AHNS (Akademia Handlowa Nauk Stosowanych w Radomiu)
                </LinksFieldGroupTitle>
                <Label>
                  <AdminInput type="text" name="ahns" placeholder="AHNS" />
                  <AdminInputNote component="p" name="ahns" />
                </Label>
              </LinksFieldGroup>
              <LinksFieldGroup>
                <LinksFieldGroupTitle>
                  ANSWP (Akademia Nauk Stosowanych Wincentego Pola w Lublinie)
                </LinksFieldGroupTitle>
                <Label>
                  <AdminInput type="text" name="answp" placeholder="ANSWP Collection" />
                  <AdminInputNote component="p" name="answp" />
                </Label>
              </LinksFieldGroup>
              <AdminFormBtn type="submit">Замінити лінки</AdminFormBtn>
            </LinksForm>
          </Formik>
        )}
        {isLoading && <Loader />}
      </AdminPanelSection>
    </>
  );
};

export default UniAdminPanel;
