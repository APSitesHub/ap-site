import axios from 'axios';
import { Label } from 'components/LeadForm/LeadForm.styled';
import { Loader } from 'components/SharedLayout/Loaders/Loader';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { EUKahootForm } from './EUKahootForm';
import { EWSPALogisticsKahootForm } from './EWSPALogisticsKahootForm';
import { EWSPAPrepKahootForm } from './EWSPAPrepKahootForm';
import {
  AdminFormBtn,
  AdminInput,
  AdminInputNote,
  AdminPanelSection,
  KahootFormBox,
  KahootLvlBtn,
  KahootLvlBtnBox,
  LoginForm,
} from './KahootAdminPanel.styled';
import { MANSKahootForm } from './MANSKahootForm';
import { MeritoAutomationKahootForm } from './MeritoAutomationKahootForm';
import { MeritoLogisticsKahootForm } from './MeritoLogisticsKahootForm';
import { MeritoPrepKahootForm } from './MeritoPrepKahootForm';
import { PedagogiumLogistics2KahootForm } from './PedagogiumLogistics2KahootForm';
import { PedagogiumLogisticsKahootForm } from './PedagogiumLogisticsKahootForm';
import { PedagogiumPrepKahootForm } from './PedagogiumPrepKahootForm';
import { SSWKahootForm } from './SSWKahootForm';
import { WSBMIRLogisticsKahootForm } from './WSBMIRLogisticsKahootForm';
import { WSBMIRPrepKahootForm } from './WSBMIRPrepKahootForm';
import { WSEPrepKahootForm } from './WSEPrepKahootForm';
import { WSKMLogisticsKahootForm } from './WSKMLogisticsKahootForm';
import { WSKMPrepKahootForm } from './WSKMPrepKahootForm';
import { WSSiPLogisticsKahootForm } from './WSSiPLogisticsKahootForm';
import { WSSiPPrepKahootForm } from './WSSiPPrepKahootForm';
import { WSTIJOLogisticsKahootForm } from './WSTIJOLogisticsKahootForm';
import { WSTIJOPrepKahootForm } from './WSTIJOPrepKahootForm';
import { WSTiHLogisticsKahootForm } from './WSTiHLogisticsKahootForm';
import { WSTiHPrepKahootForm } from './WSTiHPrepKahootForm';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';
const setAuthToken = token => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const UniKahootAdminPanel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [levels, setLevels] = useState([]);
  const destination = '/unikahoots';

  useEffect(() => {
    document.title = 'Pl University Kahoot Admin Panel | AP Education';

    const refreshToken = async () => {
      console.log('token refresher');
      try {
        if (localStorage.getItem('isAdmin')) {
          const res = await axios.post('admins/refresh/kahoot/', {});
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

  const handleBtnClick = lvl => {
    levels.includes(lvl)
      ? setLevels(levels => [...levels].filter(level => level !== lvl))
      : setLevels(levels => [...levels, lvl]);
  };

  const handleLoginSubmit = async (values, { resetForm }) => {
    setIsLoading(isLoading => (isLoading = true));

    try {
      const response = await axios.post('/admins/login/kahoot', values);
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
          <KahootLvlBtnBox>
            <KahootLvlBtn onClick={() => handleBtnClick('pedagogium_logistics')}>
              Pedagogium Logistics
            </KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('pedagogium_logistics_2')}>
              Pedagogium Logistics 2
            </KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('pedagogium_prep')}>
              Pedagogium Prep
            </KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('wstijo_logistics')}>
              WSTIJO Logistics
            </KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('wstijo_prep')}>
              WSTIJO Prep
            </KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('wsbmir_logistics')}>
              WSBMIR Logistics
            </KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('wsbmir_prep')}>
              WSBMIR Prep
            </KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('ewspa_logistics')}>
              EWSPA Logistics
            </KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('ewspa_prep')}>
              EWSPA Prep
            </KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('merito_logistics')}>
              Merito Logistics
            </KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('merito_prep')}>
              Merito Prep
            </KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('merito_automation')}>
              Merito Automation
            </KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('wstih_logistics')}>
              WSTiH Logistics
            </KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('wstih_prep')}>
              WSTiH Prep
            </KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('wskm_logistics')}>
              WSKM Logistics
            </KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('wskm_prep')}>
              WSKM Prep
            </KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('wssip_logistics')}>
              WSSiP Logistics
            </KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('wssip_prep')}>
              WSSiP Prep
            </KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('wse_prep')}>
              WSE Prep
            </KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('eu')}>
              Education Union
            </KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('ssw')}>SSW</KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('mans')}>MANS</KahootLvlBtn>
          </KahootLvlBtnBox>
        )}
        <KahootFormBox>
          {levels.includes('pedagogium_logistics') && (
            <PedagogiumLogisticsKahootForm destination={destination} />
          )}
          {levels.includes('pedagogium_logistics_2') && (
            <PedagogiumLogistics2KahootForm destination={destination} />
          )}
          {levels.includes('pedagogium_prep') && (
            <PedagogiumPrepKahootForm destination={destination} />
          )}
          {levels.includes('wstijo_logistics') && (
            <WSTIJOLogisticsKahootForm destination={destination} />
          )}
          {levels.includes('wstijo_prep') && (
            <WSTIJOPrepKahootForm destination={destination} />
          )}
          {levels.includes('wsbmir_logistics') && (
            <WSBMIRLogisticsKahootForm destination={destination} />
          )}
          {levels.includes('wsbmir_prep') && (
            <WSBMIRPrepKahootForm destination={destination} />
          )}
          {levels.includes('ewspa_logistics') && (
            <EWSPALogisticsKahootForm destination={destination} />
          )}
          {levels.includes('ewspa_prep') && (
            <EWSPAPrepKahootForm destination={destination} />
          )}
          {levels.includes('merito_logistics') && (
            <MeritoLogisticsKahootForm destination={destination} />
          )}
          {levels.includes('merito_prep') && (
            <MeritoPrepKahootForm destination={destination} />
          )}
          {levels.includes('merito_automation') && (
            <MeritoAutomationKahootForm destination={destination} />
          )}
          {levels.includes('wstih_logistics') && (
            <WSTiHLogisticsKahootForm destination={destination} />
          )}
          {levels.includes('wstih_prep') && (
            <WSTiHPrepKahootForm destination={destination} />
          )}
          {levels.includes('wskm_logistics') && (
            <WSKMLogisticsKahootForm destination={destination} />
          )}
          {levels.includes('wskm_prep') && (
            <WSKMPrepKahootForm destination={destination} />
          )}
          {levels.includes('wssip_logistics') && (
            <WSSiPLogisticsKahootForm destination={destination} />
          )}
          {levels.includes('wssip_prep') && (
            <WSSiPPrepKahootForm destination={destination} />
          )}
          {levels.includes('wse_prep') && <WSEPrepKahootForm destination={destination} />}
          {levels.includes('eu') && <EUKahootForm destination={destination} />}
          {levels.includes('ssw') && <SSWKahootForm destination={destination} />}
          {levels.includes('mans') && <MANSKahootForm destination={destination} />}
        </KahootFormBox>
        {isLoading && <Loader />}
      </AdminPanelSection>
    </>
  );
};

export default UniKahootAdminPanel;
