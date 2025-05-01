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
  LinksForm,
  LoginForm,
} from './CollectionsAdminPanel.styled';
import { LinksFieldGroup, LinksFieldGroupTitle } from '../AdminPanel/AdminPanel.styled';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';
const setAuthToken = token => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const UniCollectionsAdminPanel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(false);

  useEffect(() => {
    document.title = 'Pl Uni 3D Collections Admin Panel | AP Education';

    const refreshToken = async () => {
      console.log('token refresher');
      try {
        if (localStorage.getItem('isAdmin')) {
          const res = await axios.post('admins/refresh/collections', {});
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
      const response = await axios.post('/admins/login/collections', values);
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
    wskm_logistics: '',
    wskm_prep: '',
    wssip_logistics: '',
    wssip_prep: '',
    wspa_logistics: '',
    wspa_prep: '',
    wse_prep: '',
    eu: '',
    ssw: '',
    mans: '',
  };

  const linksSchema = yup.object().shape({
    pedagogium_logistics: yup.string().optional(),
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
    wskm_logistics: yup.string().optional(),
    wskm_prep: yup.string().optional(),
    wssip_logistics: yup.string().optional(),
    wssip_prep: yup.string().optional(),
    wspa_logistics: yup.string().optional(),
    wspa_prep: yup.string().optional(),
    wse_prep: yup.string().optional(),
    eu: yup.string().optional(),
    ssw: yup.string().optional(),
    mans: yup.string().optional(),
  });

  const handleLinksSubmit = async (values, { resetForm }) => {
    setIsLoading(isLoading => (isLoading = true));

    Object.keys(values).forEach(
      key =>
        (values[key] = values[key].replace(
          'width="640" height="480"',
          'width="100%" height="100%"'
        ))
    );

    try {
      const response = await axios.patch('/unicollections', values);
      console.log(response);
      resetForm();
      alert('Коллекції замінилися, молодець');
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
                    placeholder="Pedagogium Logistics Collection"
                  />
                  <AdminInputNote component="p" name="pedagogium_logistics" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="pedagogium_logistics_2"
                    placeholder="Pedagogium Logistics 2 Collection"
                  />
                  <AdminInputNote component="p" name="pedagogium_logistics_2" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="pedagogium_prep"
                    placeholder="Pedagogium Preparation Course Collection"
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
                    placeholder="WSTIJO Logistics Collection"
                  />
                  <AdminInputNote component="p" name="wstijo_logistics" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="wstijo_prep"
                    placeholder="WSTIJO Preparation Course Collection"
                  />
                  <AdminInputNote component="p" name="wstijo_prep" />
                </Label>
              </LinksFieldGroup>
              <LinksFieldGroup>
                <LinksFieldGroupTitle>
                  WSBMIR (Wyższa Szkoła Biznesu, Mediów i Reklamy)
                </LinksFieldGroupTitle>
                <Label>
                  <AdminInput
                    type="text"
                    name="wsbmir_logistics"
                    placeholder="WSBMIR Logistics Collection"
                  />
                  <AdminInputNote component="p" name="wsbmir_logistics" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="wsbmir_prep"
                    placeholder="WSBMIR Preparation Course Collection"
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
                    placeholder="EWSPA Logistics Collection"
                  />
                  <AdminInputNote component="p" name="ewspa_logistics" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="ewspa_prep"
                    placeholder="EWSPA Preparation Course Collection"
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
                    placeholder="Merito Logistics Collection"
                  />
                  <AdminInputNote component="p" name="merito_logistics" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="merito_prep"
                    placeholder="Merito Preparation Course Collection"
                  />
                  <AdminInputNote component="p" name="merito_prep" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="merito_automation"
                    placeholder="Merito Industrial Automation Collection"
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
                    placeholder="WSTiH Logistics Collection"
                  />
                  <AdminInputNote component="p" name="wstih_logistics" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="wstih_prep"
                    placeholder="WSTiH Preparation Course Collection"
                  />
                  <AdminInputNote component="p" name="wstih_prep" />
                </Label>
              </LinksFieldGroup>
              <LinksFieldGroup>
                <LinksFieldGroupTitle>
                  WSKM (Wyższa Szkoła Kadr Menedżerskich)
                </LinksFieldGroupTitle>
                <Label>
                  <AdminInput
                    type="text"
                    name="wskm_logistics"
                    placeholder="WSKM Logistics Collection"
                  />
                  <AdminInputNote component="p" name="wskm_logistics" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="wskm_prep"
                    placeholder="WSKM Preparation Course Collection"
                  />
                  <AdminInputNote component="p" name="wskm_prep" />
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
                    placeholder="WSSiP Logistics Collection"
                  />
                  <AdminInputNote component="p" name="wssip_logistics" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="wssip_prep"
                    placeholder="WSSiP Preparation Course Collection"
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
                    placeholder="WSPA Logistics Collection"
                  />
                  <AdminInputNote component="p" name="wspa_logistics" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="wspa_prep"
                    placeholder="WSPA Preparation Course Collection"
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
                    placeholder="WSE Preparation Course Collection"
                  />
                  <AdminInputNote component="p" name="wse_prep" />
                </Label>
              </LinksFieldGroup>
              <LinksFieldGroup>
                <LinksFieldGroupTitle>EU (Education Union)</LinksFieldGroupTitle>
                <Label>
                  <AdminInput
                    type="text"
                    name="eu"
                    placeholder="Education Union Collection"
                  />
                  <AdminInputNote component="p" name="eu" />
                </Label>
              </LinksFieldGroup>
              <LinksFieldGroup>
                <LinksFieldGroupTitle>
                  SSW (Świętokrzyska Szkoła Wyższa im. św. Jana Pawła II)
                </LinksFieldGroupTitle>
                <Label>
                  <AdminInput type="text" name="ssw" placeholder="SSW Collection" />
                  <AdminInputNote component="p" name="ssw" />
                </Label>
              </LinksFieldGroup>
              <LinksFieldGroup>
                <LinksFieldGroupTitle>
                  MANS (Międzynarodowa Akademia Nauk Stosowanych w Łomży)
                </LinksFieldGroupTitle>
                <Label>
                  <AdminInput type="text" name="mans" placeholder="MANS Collection" />
                  <AdminInputNote component="p" name="mans" />
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

export default UniCollectionsAdminPanel;
