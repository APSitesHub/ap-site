import axios from 'axios';
import { Label } from 'components/LeadForm/LeadForm.styled';
import { Loader } from 'components/SharedLayout/Loaders/Loader';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { AHNSahootForm } from '../KahootAdminPanel/AHNSKahootForm';
import { ANSWPKahootForm } from '../KahootAdminPanel/ANSWPKahootForm';
import { EUKahootForm } from '../KahootAdminPanel/EUKahootForm';
import { EWSPALogisticsKahootForm } from '../KahootAdminPanel/EWSPALogisticsKahootForm';
import { EWSPAPrepKahootForm } from '../KahootAdminPanel/EWSPAPrepKahootForm';
import {
  AdminFormBtn,
  AdminInput,
  AdminInputNote,
  KahootFormBox,
  KahootLvlBtn,
  KahootLvlBtnBox,
  LoginForm,
} from '../KahootAdminPanel/KahootAdminPanel.styled';
import { MANSKahootForm } from '../KahootAdminPanel/MANSKahootForm';
import { MeritoAutomationKahootForm } from '../KahootAdminPanel/MeritoAutomationKahootForm';
import { MeritoLogisticsKahootForm } from '../KahootAdminPanel/MeritoLogisticsKahootForm';
import { MeritoPrepKahootForm } from '../KahootAdminPanel/MeritoPrepKahootForm';
import { PedagogiumLogistics2KahootForm } from '../KahootAdminPanel/PedagogiumLogistics2KahootForm';
import { PedagogiumLogisticsKahootForm } from '../KahootAdminPanel/PedagogiumLogisticsKahootForm';
import { PedagogiumPrepKahootForm } from '../KahootAdminPanel/PedagogiumPrepKahootForm';
import { SSWKahootForm } from '../KahootAdminPanel/SSWKahootForm';
import { WSBMIRLogisticsKahootForm } from '../KahootAdminPanel/WSBMIRLogisticsKahootForm';
import { WSBMIRPrepKahootForm } from '../KahootAdminPanel/WSBMIRPrepKahootForm';
import { WSEPrepKahootForm } from '../KahootAdminPanel/WSEPrepKahootForm';
import { WSKMCNCKahootForm } from '../KahootAdminPanel/WSKMCNCKahootForm';
import { WSSiPLogisticsKahootForm } from '../KahootAdminPanel/WSSiPLogisticsKahootForm';
import { WSSiPPrepKahootForm } from '../KahootAdminPanel/WSSiPPrepKahootForm';
import { WSTIJOLogisticsKahootForm } from '../KahootAdminPanel/WSTIJOLogisticsKahootForm';
import { WSTIJOPrepKahootForm } from '../KahootAdminPanel/WSTIJOPrepKahootForm';
import { WSTiHLogisticsKahootForm } from '../KahootAdminPanel/WSTiHLogisticsKahootForm';
import { WSTiHPrepKahootForm } from '../KahootAdminPanel/WSTiHPrepKahootForm';
import { HostAdminPanelSection } from './HostKahootAdminPanel.styled';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';
const setAuthToken = token => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const UniHostKahootAdminPanel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [levels, setLevels] = useState([]);
  const destination = '/unihostkahoots';

  useEffect(() => {
    document.title = 'Pl University Host Kahoot Admin Panel | AP Education';

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
      <HostAdminPanelSection>
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
            <KahootLvlBtn onClick={() => handleBtnClick('wskm_cnc')}>
              WSKM CNC
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
            <KahootLvlBtn onClick={() => handleBtnClick('ahns')}>AHNS</KahootLvlBtn>
            <KahootLvlBtn onClick={() => handleBtnClick('answp')}>ANSWP</KahootLvlBtn>
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
          {levels.includes('wskm_cnc') && <WSKMCNCKahootForm destination={destination} />}
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
          {levels.includes('ahns') && <AHNSahootForm destination={destination} />}
          {levels.includes('answp') && <ANSWPKahootForm destination={destination} />}
        </KahootFormBox>
        {isLoading && <Loader />}
      </HostAdminPanelSection>
    </>
  );
};

export default UniHostKahootAdminPanel;
