import useSize from '@react-hook/size';
import axios from 'axios';
import {
  HiddenInput,
  InputNote
} from 'components/LeadForm/LeadForm.styled';
import { Loader } from 'components/SharedLayout/Loaders/Loader';
import { Formik } from 'formik';
import { FormSelect } from 'pages/Streams/TimeTableAdminPanel/TimeTableAdminPanel.styled';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { components } from 'react-select';
import * as yup from 'yup';
import {
  FormLabel,
  FormSection,
  Input,
  InputName,
  LinkTreeFormBtn,
  PageForm,
  PageFormHeading,
  PageFormWrapper,
} from './AmbassadorFormPage.styled';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';

const AmbassadorFormPage = ({ utms }) => {
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line
  const [course, setCourse] = useState('');
  // eslint-disable-next-line
  const [lang, setLang] = useState('');
  // eslint-disable-next-line
  const [level, setLevel] = useState('');
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const query = useLocation().search;

  // eslint-disable-next-line
  const [width, _] = useSize(document.body);

  const replace = () =>
    location.includes('form-mova') && !query.includes('tg_only')
      ? window.location.replace('https://ap.education/form')
      : null;
  replace();

  useEffect(() => {
    document.title = 'Форма амбасадора | AP Education';
  }, []);

  const initialValues = {
    name: '',
    phone: '',
    tgusername: '',
    tag: '',
    specialty: '',
    utm_content: '',
    utm_medium: '',
    utm_campaign: '',
    utm_source: '',
    utm_term: '',
    utm_referrer: '',
    referrer: '',
    gclientid: '',
    gclid: '',
    fbclid: '',
  };

  const langOptions = [
    {
      label: 'Англійська мова',
      value: 'en',
    },
    {
      label: 'Німецька мова',
      value: 'de',
    },
    {
      label: 'Польська мова',
      value: 'pl',
    },
  ];

  const courseOptions = [
    {
      label: '1 курс',
      value: '1',
    },
    {
      label: '2 курс',
      value: '2',
    },
    {
      label: '3 курс',
      value: '3',
    },
    {
      label: '4 курс',
      value: '4',
    },
  ];

  const levelOptions = [
    {
      label: 'A1',
      value: 'a1',
    },
    {
      label: 'A2',
      value: 'a2',
    },
    {
      label: 'B1',
      value: 'b1',
    },
    {
      label: 'B2',
      value: 'b2',
    },
    {
      label: 'C1',
      value: 'c1',
    },
    {
      label: 'C2',
      value: 'c2',
    },
  ];

  const leadSchema = yup.object().shape({
    name: yup
      .string()
      .required("Будь ласка, вкажіть своє ім'я та прізвище!")
      .matches(
        /^[A-Za-zА-Яа-яіІїЇєЄ]+(?:[-'\s][A-Za-zА-Яа-яіІїЇєЄ]+)+$/,
        "Будь ласка, введіть ім'я та прізвище, не менше двох слів, без цифр та спецсимволів!"
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
    tag: yup.string().optional(),
    utm_content: yup.string().optional(),
    utm_medium: yup.string().optional(),
    utm_campaign: yup.string().optional(),
    utm_source: yup.string().optional(),
    utm_term: yup.string().optional(),
    utm_referrer: yup.string().optional(),
    referrer: yup.string().optional(),
    gclientid: yup.string().optional(),
    gclid: yup.string().optional(),
    fbclid: yup.string().optional(),
  });

  const handleSubmit = async (values, { resetForm }) => {
    values.tag = 'Університетські ходіння';
    values.utm_content = utms.utm_content;
    values.utm_medium = utms.utm_medium;
    values.utm_campaign = utms.utm_campaign;
    values.utm_source = utms.utm_source;
    values.utm_term = utms.utm_term;
    values.utm_referrer = utms.utm_referrer;
    values.referrer = utms.referrer;
    values.gclientid = utms.gclientid;
    values.gclid = utms.gclid;
    values.fbclid = utms.fbclid;
    setIsLoading(isLoading => (isLoading = true));
    console.log(values);

    try {
      const response = await axios.post('/leads', values);
      console.log(response);
      resetForm();
      navigate('/thankyou');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(isLoading => (isLoading = false));
    }
  };

  const DropdownIndicator = props => {
    return (
      <components.DropdownIndicator {...props}>
        <img src="https://ap.education/static/video/test/arrow-down.svg" alt="" width='24' height='22'/>
      </components.DropdownIndicator>
    );
  };

  return (
    <>
      <FormSection>
        <PageFormWrapper>
          <PageFormHeading>
            Залишіть заявку зараз та станьте амбасадором AP Education!
          </PageFormHeading>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={leadSchema}
          >
            <PageForm>
              <FormLabel>
                <InputName>Ім'я та прізвище*</InputName>
                <Input type="text" name="name" placeholder="" />
                <InputNote component="p" name="name" />
              </FormLabel>
              <FormLabel>
                <InputName>Телефон*</InputName>
                <Input type="tel" name="phone" placeholder="" />
                <InputNote component="p" name="phone" />
              </FormLabel>
              <FormLabel>
                <InputName>Нікнейм у Телеграм*</InputName>
                <Input type="text" name="tgusername" placeholder="" />
                <InputNote component="p" name="tgusername" />
              </FormLabel>
              <FormLabel>
                <InputName>На якому курсі навчаєшся?*</InputName>
                <FormSelect
                  options={courseOptions}
                  components={{ DropdownIndicator }}
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      border: 'none',
                      borderColor: 'transparent',
                      boxShadow: 'none',
                    }),
                    container: (baseStyles, state) => ({
                      ...baseStyles,
                      borderRadius: '50px',
                      backgroundColor: 'white',
                      padding: '8px 12px',
                    }),
                    indicatorSeparator: (baseStyles, state) => ({
                      ...baseStyles,
                      width: '0',
                    }),
                    menu: (baseStyles, state) => ({
                      ...baseStyles,
                      backgroundColor: '#F8F8F8',
                      left: '0'
                    }),
                    option: (baseStyles, state) => ({
                      ...baseStyles,
                      display: 'block',
                      padding: '20px 30px'
                    }),
                  }}
                  placeholder=""
                  name="course"
                  onChange={course => {
                    setCourse(course.value);
                  }}
                />
              </FormLabel>
              <FormLabel>
                <InputName>На якій спеціальності?*</InputName>
                <Input type="text" name="specialty" placeholder="" />
                <InputNote component="p" name="specialty" />
              </FormLabel>
              <FormLabel>
                <InputName>Яку мову знаєш?*</InputName>
                <FormSelect
                  options={langOptions}
                  components={{ DropdownIndicator }}
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      border: 'none',
                      borderColor: 'transparent',
                      boxShadow: 'none',
                    }),
                    container: (baseStyles, state) => ({
                      ...baseStyles,
                      borderRadius: '50px',
                      backgroundColor: 'white',
                      padding: '8px 12px',
                    }),
                    indicatorSeparator: (baseStyles, state) => ({
                      ...baseStyles,
                      width: '0',
                    }),
                    menu: (baseStyles, state) => ({
                      ...baseStyles,
                      backgroundColor: '#F8F8F8',
                      left: '0'
                    }),
                    option: (baseStyles, state) => ({
                      ...baseStyles,
                      display: 'block',
                      padding: '20px 30px'
                    }),
                  }}
                  placeholder=""
                  name="lang"
                  onChange={lang => {
                    setLang(lang.value);
                  }}
                />
              </FormLabel>
              <FormLabel>
                <InputName>На який рівень?*</InputName>
                <FormSelect
                  options={levelOptions}
                  components={{ DropdownIndicator }}
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      border: 'none',
                      borderColor: 'transparent',
                      boxShadow: 'none',
                    }),
                    container: (baseStyles, state) => ({
                      ...baseStyles,
                      borderRadius: '50px',
                      backgroundColor: 'white',
                      padding: '8px 12px',
                    }),
                    indicatorSeparator: (baseStyles, state) => ({
                      ...baseStyles,
                      width: '0',
                    }),
                    menu: (baseStyles, state) => ({
                      ...baseStyles,
                      backgroundColor: '#F8F8F8',
                      left: '0',
                      translateY: '2px' 
                    }),
                    option: (baseStyles, state) => ({
                      ...baseStyles,
                      display: 'block',
                      padding: '20px 30px'
                    }),
                  }}
                  placeholder=""
                  name="course"
                  onChange={level => {
                    setLevel(level.value);
                  }}
                />
              </FormLabel>
              <HiddenInput type="text" name="tag" />
              <HiddenInput type="text" name="utm_content" />
              <HiddenInput type="text" name="utm_medium" />
              <HiddenInput type="text" name="utm_campaign" />
              <HiddenInput type="text" name="utm_source" />
              <HiddenInput type="text" name="utm_term" />
              <HiddenInput type="text" name="utm_referrer" />
              <HiddenInput type="text" name="referrer" />
              <HiddenInput type="text" name="gclientid" />
              <HiddenInput type="text" name="gclid" />
              <HiddenInput type="text" name="fbclid" />
              <LinkTreeFormBtn type="submit">Надіслати</LinkTreeFormBtn>
              {isLoading && <Loader />}
            </PageForm>
          </Formik>
        </PageFormWrapper>
      </FormSection>
    </>
  );
};

export default AmbassadorFormPage;
