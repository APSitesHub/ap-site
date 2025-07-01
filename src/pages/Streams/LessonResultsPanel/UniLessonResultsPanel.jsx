import axios from 'axios';
import { FormBtnText } from 'pages/LeadFormPage/UniversalLeadFormPage.styled';
import { Loader } from 'components/SharedLayout/Loaders/Loader';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import * as yup from 'yup';

import 'react-datepicker/dist/react-datepicker.css';
import {
  AdminFormBtn,
  AdminInput,
  AdminInputNote,
  AdminPanelSection,
  LoginForm,
} from '../AdminPanel/AdminPanel.styled';
import {
  AdminDatePicker,
  LessonItem,
  LessonsContainer,
  PointsAdminContainer,
  PointsAdminSidebar,
  PointsAdminTableContainer,
  PointsForm,
  PointsFormSelect,
  SmallText,
  SubmitFormBtn,
} from './LessonResultsPanel.styled';
import { LoginErrorNote } from 'components/Stream/Stream.styled';
import {
  UserCell,
  UserDBCaption,
  UserDBRow,
  UserHeadCell,
} from '../UserAdminPanel/UserAdminPanel.styled';
import { Label } from 'components/LeadForm/LeadForm.styled';
import { TeacherSpeakingDBTable } from 'pages/TeacherPage/TeacherPage.styled';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';
// axios.defaults.baseURL = 'http://localhost:3001';

const Univesitets = {
  pedagogium: 'Pedagogium (Wyższa Szkoła Nauk Społecznych)',
  wstijo: 'WSTIJO (Wyzsza Szkoła Turystyki i Jezykow Obcych w Warszawie)',
  wsbmir: 'WSBMIR (Wyższa Szkoła Biznesу, Mediów i Reklamy)',
  ewspa: 'EWSPA (Europejska Wyższa Szkoła Prawа i Administracji w Warszawie)',
  merito: 'Merito (Uniwersytet WSB Merito Warszawa)',
  wstih: 'WSTiH (Wyższa Szkoła Turystyki i Hotelarstwa w Gdańsku)',
  wskm: 'WSKM (Wyższa Szkoła Kadr Menedżerskich)',
  wssip: 'WSSiP (Wyższa Szkoła Sztuki i Projektowania)',
  wspa: 'WSPA (Wyższa Szkoła Przedsiębiorczości i Administracji)',
  wse: 'WSE (Wyższa Szkoła Ekonomiczna w Stalowej Woli)',
  answp: 'ANSWP (Akademia Nauk Stosowanych Wincentego Pola w Lublinie)',
  ssw: 'SSW (Świętokrzyska Szkoła Wyższa im. św. Jana Pawła II)',
  mans: 'MANS (Międzynarodowa Akademia Nauk Stosowanych w Łomży)',
  ahns: 'AHNS (Akademia Handlowa Nauk Stosowanych w Radomiu)',
};

const setAuthToken = token => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const LessonResultsPanel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [foundLessons, setFoundLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [selectedLessonPoints, setSelectedLessonPoints] = useState([]);
  const [customError, setCustomError] = useState('');

  const initialLoginValues = {
    login: '',
    password: '',
  };

  const loginSchema = yup.object().shape({
    login: yup.string().required('Введіть логін'),
    password: yup.string().required('Введіть пароль!'),
  });

  const initialLessonValues = {
    level: '',
    date: '',
  };

  const lessonSchema = yup.object().shape({
    level: yup.string().required('Виберіть рівень'),
    date: yup.date().required('Виберіть дату'),
  });

  const handleLoginSubmit = async (values, { resetForm }) => {
    setIsLoading(isLoading => (isLoading = true));
    try {
      const response = await axios.post('/admins/login/users', values);
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

  const handleSelectCourse = item => {
    setSelectedCourse(courses.find(course => course === item.value));
    setCustomError('');
  };

  const handleFindLessons = async () => {
    try {
      const response = await axios.get(
        `/uni-lesson-results/findOne/${selectedCourse}/${selectedDate.toLocaleDateString(
          'uk-UA'
        )}`
      );

      setFoundLessons(response.data);

      if (response.data.length === 0) {
        alert('Не знайдено уроків за обраними параметрами!');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleFetchLessonPoints = async lessonId => {
    const response = await axios.get(`/uni-lesson-results/points/${lessonId}`);

    setSelectedLessonPoints(response.data);
    setSelectedLesson(foundLessons.find(lesson => lesson._id === lessonId));
  };

  useEffect(() => {
    document.title = 'Lessons Results Panel | AP Education';

    const refreshToken = async () => {
      console.log('token refresher');
      try {
        if (localStorage.getItem('isAdmin')) {
          const res = await axios.post('admins/refresh/users/', {});
          setAuthToken(res.data.newToken);
          setIsUserAdmin(isAdmin => (isAdmin = true));
        }
      } catch (error) {
        console.error(error);
      }
    };
    refreshToken();

    const getCourses = async () => {
      setCourses(Object.keys(Univesitets));
    };

    getCourses();
  }, []);

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
          <PointsAdminContainer>
            <PointsAdminSidebar>
              {courses.length > 0 && (
                <Formik
                  initialValues={initialLessonValues}
                  onSubmit={handleFindLessons}
                  validationSchema={lessonSchema}
                >
                  <PointsForm>
                    <PointsFormSelect
                      options={courses.map(uni => ({
                        label: Univesitets[uni],
                        value: uni,
                      }))}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          border: 'none',
                          borderRadius: '50px',
                          minHeight: '38px',
                        }),
                        menu: (baseStyles, state) => ({
                          ...baseStyles,
                          position: 'absolute',
                          zIndex: '2',
                          top: '36px',
                        }),
                        dropdownIndicator: (baseStyles, state) => ({
                          ...baseStyles,
                          padding: '7px',
                        }),
                      }}
                      placeholder="Університет"
                      onChange={handleSelectCourse}
                    />
                    <AdminDatePicker
                      selected={selectedDate}
                      dateFormat="dd.MM.yyyy"
                      onChange={date => {
                        setSelectedDate(date);
                      }}
                      calendarStartDay={1}
                      shouldCloseOnSelect={true}
                      maxDate={new Date()}
                      placeholderText="Дата"
                    />

                    <SubmitFormBtn onClick={handleFindLessons} type="submit">
                      <FormBtnText>Знайти</FormBtnText>
                    </SubmitFormBtn>
                    {customError && <LoginErrorNote>{customError}</LoginErrorNote>}
                  </PointsForm>
                </Formik>
              )}

              {foundLessons.length > 0 && (
                <LessonsContainer>
                  {foundLessons.map(lesson => (
                    <LessonItem
                      key={lesson._id}
                      onClick={() => handleFetchLessonPoints(lesson._id)}
                    >
                      <p>
                        {lesson.lessonName} {lesson.lessonNumber}
                      </p>
                      <SmallText>Teacher: {lesson.teacherName}</SmallText>
                    </LessonItem>
                  ))}
                </LessonsContainer>
              )}
            </PointsAdminSidebar>
            <PointsAdminTableContainer>
              {selectedLesson && (
                <TeacherSpeakingDBTable>
                  <UserDBCaption>
                    {selectedLesson.lessonName} {selectedLesson.lessonNumber}
                  </UserDBCaption>
                  <thead>
                    <UserDBRow>
                      <UserHeadCell>№</UserHeadCell>
                      <UserHeadCell>Ім'я</UserHeadCell>
                      {selectedLesson &&
                        selectedLesson.questions.map((question, index) => (
                          <UserHeadCell key={question._id}>q_{index + 1}</UserHeadCell>
                        ))}
                      <UserHeadCell>Загалом</UserHeadCell>
                    </UserDBRow>
                  </thead>
                  <tbody>
                    {selectedLessonPoints.length > 0 &&
                      selectedLessonPoints.map((user, index) => (
                        <UserDBRow key={user._id}>
                          <UserCell>{index + 1}</UserCell>
                          <UserCell>{user.name}</UserCell>
                          {selectedLesson.questions.map(question => (
                            <UserCell key={question._id}>
                              {(() => {
                                const ans = user.answers.find(
                                  answer => answer.questionId === question._id
                                );
                                return ans?.points !== undefined ? ans.points : '';
                              })()}
                            </UserCell>
                          ))}
                          <UserCell>{user.totalPoints}</UserCell>
                        </UserDBRow>
                      ))}
                  </tbody>
                </TeacherSpeakingDBTable>
              )}
            </PointsAdminTableContainer>
          </PointsAdminContainer>
        )}

        {isLoading && <Loader />}
      </AdminPanelSection>
    </>
  );
};

export default LessonResultsPanel;
