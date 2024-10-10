import axios from 'axios';
import { HiddenInput, InputNote } from 'components/LeadForm/LeadForm.styled';
import { Loader } from 'components/SharedLayout/Loaders/Loader';
import { Formik } from 'formik';
import { FormSelect } from 'pages/Streams/TimeTableAdminPanel/TimeTableAdminPanel.styled';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
} from '../AmbassadorFormPage/AmbassadorFormPage.styled';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';

const TeacherFormPage = ({ utms }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [course, setCourse] = useState('');
  const [lang, setLang] = useState('');
  const [level, setLevel] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Форма кандидата | AP Education';
  }, []);

  const initialValues = {
    name: '',
    phone: '',
    tgusername: '',
    tag: '',
    course: '',
    specialty: '',
    lang: '',
    level: '',
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
      .max(18, 'Номер телефону має складатися не більше ніж з 18 символів!'),
    tgusername: yup.string().optional(),
    tag: yup.string().optional(),
    course: yup.string().optional(),
    specialty: yup.string().required('Будь ласка, вкажіть свою спеціальність!'),
    lang: yup.string().optional(),
    level: yup.string().optional(),
  });

  const handleSubmit = async values => {
    values.tag = 'Університетські ходіння';
    values.course = course;
    values.lang = lang;
    values.level = level;
    setIsLoading(isLoading => (isLoading = true));
    console.log(values);

    try {
      const response = await axios.post('/uni-leads/cand', values);
      console.log(response);
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
        <img
          src="https://ap.education/static/video/test/arrow-down.svg"
          alt=""
          width="24"
          height="22"
        />
      </components.DropdownIndicator>
    );
  };

  return (
    <>
      <FormSection>
        <PageFormWrapper>
          <PageFormHeading>
            Залишіть заявку зараз та приєднуйтесь до нашої команди викладачів
            вже сьогодні!
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
                <InputName>На якому курсі навчаєтесь?*</InputName>
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
                      left: '0',
                    }),
                    option: (baseStyles, state) => ({
                      ...baseStyles,
                      display: 'block',
                      padding: '20px 30px',
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
                <InputName>Яку мову знаєте?*</InputName>
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
                      left: '0',
                    }),
                    option: (baseStyles, state) => ({
                      ...baseStyles,
                      display: 'block',
                      padding: '20px 30px',
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
                      translateY: '2px',
                    }),
                    option: (baseStyles, state) => ({
                      ...baseStyles,
                      display: 'block',
                      padding: '20px 30px',
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
              <LinkTreeFormBtn type="submit">Надіслати</LinkTreeFormBtn>
              {isLoading && <Loader />}
            </PageForm>
          </Formik>
        </PageFormWrapper>
      </FormSection>
    </>
  );
};

export default TeacherFormPage;
