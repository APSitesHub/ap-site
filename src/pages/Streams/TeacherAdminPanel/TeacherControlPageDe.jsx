import axios from 'axios';
import { Label } from 'components/LeadForm/LeadForm.styled';
import { Loader } from 'components/SharedLayout/Loaders/Loader';
import { Formik } from 'formik';
import {
  LabelText,
  SpeakingLabel,
} from 'pages/TeacherPage/TeacherPageSpeakingEditForm/TeacherPageSpeakingEditForm.styled';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import {
  AdminFormBtn,
  AdminInput,
  AdminInputNote,
  AdminPanelSection,
  DateInputBox,
  DateInputLabel,
  DateInputSelect,
  Feedback,
  LoginForm,
  TeacherTable,
  UserCell,
  UserDBCaption,
  UserDBRow,
  UserHeadCell,
} from './TeacherAdminPanel.styled';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';
const setAuthToken = token => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const TeacherControlPageDe = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [fullReviews, setFullReviews] = useState(false);
  const [month, setMonth] = useState(new Date(Date.now()).getMonth() + 1);
  const [year, setYear] = useState(new Date(Date.now()).getFullYear());

  const yearOptions = [
    { label: '2024', value: '2024' },
    { label: '2025', value: '2025' },
    { label: '2026', value: '2026' },
  ];

  const monthOptions = [
    { label: 'Січень', value: '1' },
    { label: 'Лютий', value: '2' },
    { label: 'Березень', value: '3' },
    { label: 'Квітень', value: '4' },
    { label: 'Травень', value: '5' },
    { label: 'Червень', value: '6' },
    { label: 'Липень', value: '7' },
    { label: 'Серпень', value: '8' },
    { label: 'Вересень', value: '9' },
    { label: 'Жовтень', value: '10' },
    { label: 'Листопад', value: '11' },
    { label: 'Грудень', value: '12' },
  ];

  useEffect(() => {
    document.title = 'Teacher Admin Panel | AP Education';

    const refreshToken = async () => {
      setIsLoading(isLoading => (isLoading = true));
      try {
        if (localStorage.getItem('isAdmin')) {
          const res = await axios.post('admins/refresh/teachers/', {});
          setAuthToken(res.data.newToken);
          setIsUserAdmin(isAdmin => (isAdmin = true));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(isLoading => (isLoading = false));
      }
    };
    refreshToken();

    const getTeachers = async () => {
      setIsLoading(isLoading => (isLoading = true));
      try {
        if (isUserAdmin) {
          const response = await axios.get('/teachers/de');
          setTeachers(teachers => (teachers = [...response.data.reverse()]));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(isLoading => (isLoading = false));
      }
    };
    getTeachers();

    const getReviews = async () => {
      setIsLoading(isLoading => (isLoading = true));
      try {
        if (isUserAdmin) {
          const response = await axios.get('/speakingusers/admin/de');
          setReviews(reviews => (reviews = [...response.data]));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(isLoading => (isLoading = false));
      }
    };
    getReviews();
  }, [isUserAdmin]);

  const initialLoginValues = {
    login: '',
    password: '',
  };

  const loginSchema = yup.object().shape({
    login: yup.string().required('Вкажіть логін!'),
    password: yup.string().required('Введіть пароль!'),
  });

  const regex = /\d{1,2}\.\d{2}\.\d{4}/;

  const changeDateFormat = dateString => {
    if (dateString) {
      const dateArray = dateString.split('.');
      return dateArray.length > 2
        ? Date.parse([dateArray[1], dateArray[0], dateArray[2]].join('/'))
        : Date.parse(dateString);
    }
    return;
  };

  const handleLoginSubmit = async (values, { resetForm }) => {
    setIsLoading(isLoading => (isLoading = true));
    try {
      const response = await axios.post('/admins/login/teachers', values);
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

        {isUserAdmin && teachers.length > 0 && (
          <TeacherTable>
            <UserDBCaption>
              Список тічерів та їх відгуків (німецька) за
              <DateInputBox>
                <DateInputLabel>
                  {month && <LabelText>Місяць</LabelText>}
                  <DateInputSelect
                    options={monthOptions}
                    styles={{
                      control: baseStyles => ({
                        ...baseStyles,
                        border: 'none',
                        borderRadius: '50px',
                        minHeight: '34px',
                      }),
                      menu: baseStyles => ({
                        ...baseStyles,
                        position: 'absolute',
                        zIndex: '2',
                        top: '36px',
                        backgroundColor: 'white',
                      }),
                      dropdownIndicator: baseStyles => ({
                        ...baseStyles,
                        padding: '7px',
                      }),
                    }}
                    placeholder="Місяць"
                    name="month"
                    onChange={month => setMonth(+month.value)}
                    defaultValue={monthOptions.find(option => +option.value === month)}
                  />
                </DateInputLabel>
                <SpeakingLabel>
                  {year && <LabelText>Рік</LabelText>}
                  <DateInputSelect
                    options={yearOptions}
                    styles={{
                      control: baseStyles => ({
                        ...baseStyles,
                        border: 'none',
                        borderRadius: '50px',
                        minHeight: '34px',
                      }),
                      menu: baseStyles => ({
                        ...baseStyles,
                        position: 'absolute',
                        zIndex: '2',
                        top: '36px',
                        backgroundColor: 'white',
                      }),
                      dropdownIndicator: baseStyles => ({
                        ...baseStyles,
                        padding: '7px',
                      }),
                    }}
                    placeholder="Рік"
                    name="year"
                    onChange={year => setYear(+year.value)}
                    defaultValue={yearOptions.find(option => +option.value === year)}
                  />
                </SpeakingLabel>
                <button onClick={() => setFullReviews(fullReviews => !fullReviews)}>
                  {fullReviews ? 'Згорнути' : 'Розгорнути'}
                </button>
              </DateInputBox>
            </UserDBCaption>
            <thead>
              <UserDBRow>
                <UserHeadCell>Тічер</UserHeadCell>
                <UserHeadCell>Відгуки</UserHeadCell>
              </UserDBRow>
            </thead>
            <tbody>
              {teachers
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((teacher, i) => (
                  <UserDBRow key={teacher._id}>
                    <UserCell key={'Тічер' + teacher._id}>{teacher.name}</UserCell>
                    <UserCell key={`Відгук ${i} ${teacher._id}`}>
                      {reviews
                        .filter(user =>
                          user.feedback.some(
                            review =>
                              review.text.includes(teacher.name) ||
                              review.text.includes(
                                teacher.name.split(' ').reverse().join(' ')
                              )
                          )
                        )
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map(
                          user =>
                            (user = {
                              _id: user._id,
                              name: user.name,
                              feedback: user.feedback.filter(
                                feedbackObj =>
                                  (feedbackObj.text.includes(teacher.name) ||
                                    feedbackObj.text.includes(
                                      teacher.name.split(' ').reverse().join(' ')
                                    )) &&
                                  new Date(
                                    changeDateFormat(feedbackObj.date)
                                  ).getMonth() +
                                    1 ===
                                    month &&
                                  new Date(
                                    changeDateFormat(feedbackObj.date)
                                  ).getFullYear() === year
                              ),
                            })
                        )
                        .flatMap(user =>
                          user.feedback.map(
                            feedbackObj =>
                              `для ${user.name}) ${
                                feedbackObj.isOverdue ? 'ПРОТЕРМІНОВАНО' : ''
                              } ${feedbackObj.text}`
                          )
                        )
                        .sort((a, b) => {
                          const dateA = a.match(regex)?.[0];
                          const dateB = b.match(regex)?.[0];

                          if (!dateA || !dateB) return 0; // Handle cases where date is missing

                          const parsedDateA = dateA
                            .split('.')
                            .map(value => (value.length === 1 ? '0' + value : value)) // Add leading zero if needed
                            .reverse()
                            .join('-'); // Convert to YYYY-MM-DD for sorting by localeCompare
                          const parsedDateB = dateB
                            .split('.')
                            .map(value => (value.length === 1 ? '0' + value : value))
                            .reverse()
                            .join('-');

                          return parsedDateB.localeCompare(parsedDateA); // Sort in descending order
                        })
                        .map((text, i) => (
                          <Feedback
                            className={fullReviews && 'full'}
                            key={i}
                            isOverdue={text.includes('ПРОТЕРМІНОВАНО')}
                          >
                            {!fullReviews
                              ? `(Відгук від ${text.match(regex)} ${text.slice(
                                  0,
                                  200
                                )}...`.replace('ПРОТЕРМІНОВАНО', '')
                              : `(Відгук від ${text.match(regex)} ${text}`.replace(
                                  'ПРОТЕРМІНОВАНО',
                                  ''
                                )}
                          </Feedback>
                        ))}
                    </UserCell>
                  </UserDBRow>
                ))}
            </tbody>
          </TeacherTable>
        )}

        {isLoading && <Loader />}
      </AdminPanelSection>
    </>
  );
};

export default TeacherControlPageDe;
