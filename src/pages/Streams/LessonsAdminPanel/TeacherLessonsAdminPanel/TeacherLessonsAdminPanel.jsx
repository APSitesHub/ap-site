import axios from 'axios';
import { Backdrop } from 'components/LeadForm/Backdrop/Backdrop.styled';
import { Label } from 'components/LeadForm/LeadForm.styled';
import { Loader } from 'components/SharedLayout/Loaders/Loader';
import { Formik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import * as yup from 'yup';
import {
  AdminFormBtn,
  AdminInput,
  AdminInputNote,
  AdminPanelSection,
  FilterButton,
  FilterPicker,
  FilterPickerButton,
  Filterable,
  LoginForm,
  UserCell,
  UserDBCaption,
  UserDBRow,
  UserDBTable,
  UserEditButton,
  UserHeadCell,
  UsersEditForm,
} from '../../UserAdminPanel/UserAdminPanel.styled';
import { LessonInfo } from '../LessonsAdminPanel.styled';

axios.defaults.baseURL = 'https://aggregator-server.onrender.com';
const setAuthToken = token => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const TeacherLessonsAdminPanel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [lessons, setLessons] = useState([]);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [lessonToEdit, setLessonToEdit] = useState({});
  const [marathons, setMarathons] = useState([]);
  const [langs, setLangs] = useState([]);
  const [levels, setLevels] = useState([]);
  const [isMarathonPickerOpen, setIsMarathonPickerOpen] = useState(false);
  const [isLevelPickerOpen, setIsLevelPickerOpen] = useState(false);
  const [isLangPickerOpen, setIsLangPickerOpen] = useState(false);

  const persistentLessons = useRef([]);

  useEffect(() => {
    document.title = 'Lessons Admin Panel | AP Education';

    const refreshToken = async () => {
      console.log('token refresher');
      try {
        if (localStorage.getItem('isAdmin')) {
          const res = await axios.post('admins/refresh/users/', {});
          console.log(res);
          setIsUserAdmin(isAdmin => (isAdmin = true));
        }
      } catch (error) {
        console.log(error);
      }
    };
    refreshToken();

    const getLessons = async () => {
      try {
        if (isUserAdmin) {
          const response = await axios.get('/lessons/');
          setLessons(lessons => (lessons = [...response.data]));
          persistentLessons.current = [...response.data];
          setMarathons(
            marathons =>
              (marathons = [
                ...response.data
                  .map(lesson => lesson.marathonName)
                  .filter((marathon, i, arr) => arr.indexOf(marathon) === i)
                  .sort(),
              ])
          );
          setLangs(
            langs =>
              (langs = [
                ...response.data
                  .map(lesson => lesson.lang)
                  .filter((lang, i, arr) => arr.indexOf(lang) === i)
                  .sort(),
              ])
          );
          setLevels(
            levels =>
              (levels = [
                ...response.data
                  .map(lesson => lesson.level)
                  .filter((level, i, arr) => arr.indexOf(level) === i)
                  .sort(),
              ])
          );
        }
      } catch (error) {
        console.error(error);
      }
    };
    getLessons();

    const onEscapeClose = event => {
      if (event.code === 'Escape' && isEditFormOpen) {
        closeEditForm();
      }
    };

    window.addEventListener('keydown', onEscapeClose);

    return () => {
      window.removeEventListener('keydown', onEscapeClose);
    };
  }, [isUserAdmin, isLoading, isEditFormOpen]);

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

  const initialAnswerValues = {
    exercise: '',
    question: '',
    answer: '',
  };

  const answerSchema = yup.object().shape({
    exercise: yup
      .string()
      .required(
        "Необхідно вказати розділ та вправу, наприклад: 'Слухання 1.2'"
      ),
    question: yup
      .string()
      .required(
        'Необхідно вказати питання юзера (за потреби переформулювати та скоротити)'
      ),
    answer: yup.string().required('Лінк на відеовідповідь, залиту на ютуб'),
  });

  const handleAnswerSubmit = async (values, { resetForm }) => {
    setIsLoading(isLoading => (isLoading = true));

    const faq = {
      exercise: values.exercise,
      question: values.question,
      answer: values.answer,
    };

    try {
      console.log(lessonToEdit._id);
      console.log(faq);
      const response = await axios.patch(`/lessons/${lessonToEdit._id}`, faq);
      console.log(response);
      resetForm();
      alert('Відповідь додано');
    } catch (error) {
      console.error(error);
      alert(
        'Десь якась проблема - клацай F12, роби скрін консолі, відправляй Кирилу'
      );
    } finally {
      setIsLoading(isLoading => (isLoading = false));
    }
  };

  const handleEdit = async id => {
    setIsEditFormOpen(true);
    setLessonToEdit(
      lessonToEdit => (lessonToEdit = lessons.find(lesson => lesson._id === id))
    );
  };

  const closeEditForm = e => {
    setIsEditFormOpen(false);
  };

  const closeEditFormOnClick = e => {
    if (e.target.id === 'close-on-click') {
      setIsEditFormOpen(false);
    }
  };

  const filterByMarathon = current =>
    current === ''
      ? setLessons(lessons => (lessons = [...persistentLessons.current]))
      : setLessons(
          lessons =>
            (lessons = [
              ...persistentLessons.current.filter(
                lesson => lesson.marathonName === current
              ),
            ])
        );

  const toggleMarathonPicker = () => {
    setIsMarathonPickerOpen(isOpen => !isOpen);
  };

  const filterByLang = current =>
    current === ''
      ? setLessons(lessons => (lessons = [...persistentLessons.current]))
      : setLessons(
          lessons =>
            (lessons = [
              ...persistentLessons.current.filter(
                lesson => lesson.lang === current
              ),
            ])
        );

  const toggleLangPicker = () => {
    setIsLangPickerOpen(isOpen => !isOpen);
  };

  const filterByLevel = current =>
    current === ''
      ? setLessons(lessons => (lessons = [...persistentLessons.current]))
      : setLessons(
          lessons =>
            (lessons = [
              ...persistentLessons.current.filter(
                lesson => lesson.level === current
              ),
            ])
        );

  const toggleLevelPicker = () => {
    setIsLevelPickerOpen(isOpen => !isOpen);
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
                <AdminInput
                  type="password"
                  name="password"
                  placeholder="Password"
                />
                <AdminInputNote component="p" name="password" />
              </Label>
              <AdminFormBtn type="submit">Залогінитись</AdminFormBtn>
            </LoginForm>
          </Formik>
        )}

        {isUserAdmin && lessons && (
          <UserDBTable>
            <UserDBCaption>Список уроків на платформі</UserDBCaption>
            <thead>
              <UserDBRow>
                <UserHeadCell>
                  <Filterable>
                    Назва і № марафону
                    <FilterButton onClick={toggleMarathonPicker}></FilterButton>
                    {isMarathonPickerOpen && (
                      <FilterPicker>
                        {marathons.map((marathon, i) => (
                          <FilterPickerButton
                            key={i}
                            onClick={() => {
                              filterByMarathon(marathon);
                              toggleMarathonPicker();
                            }}
                          >
                            {marathon === undefined ? '—' : marathon}
                          </FilterPickerButton>
                        ))}
                        <FilterPickerButton
                          onClick={() => {
                            filterByMarathon('');
                            toggleMarathonPicker();
                          }}
                        >
                          ВСІ
                        </FilterPickerButton>
                      </FilterPicker>
                    )}
                  </Filterable>
                </UserHeadCell>
                <UserHeadCell>
                  <Filterable>
                    Мова
                    <FilterButton onClick={toggleLangPicker}></FilterButton>
                    {isLangPickerOpen && (
                      <FilterPicker>
                        {langs.map((lang, i) => (
                          <FilterPickerButton
                            key={i}
                            onClick={() => {
                              filterByLang(lang);
                              toggleLangPicker();
                            }}
                          >
                            {lang === undefined ? '—' : lang}
                          </FilterPickerButton>
                        ))}
                        <FilterPickerButton
                          onClick={() => {
                            filterByLang('');
                            toggleLangPicker();
                          }}
                        >
                          ВСІ
                        </FilterPickerButton>
                      </FilterPicker>
                    )}
                  </Filterable>
                </UserHeadCell>
                <UserHeadCell>
                  <Filterable>
                    Рівень
                    <FilterButton onClick={toggleLevelPicker}></FilterButton>
                    {isLevelPickerOpen && (
                      <FilterPicker>
                        {levels.map((level, i) => (
                          <FilterPickerButton
                            key={i}
                            onClick={() => {
                              filterByLevel(level);
                              toggleLevelPicker();
                            }}
                          >
                            {level === undefined ? '—' : level}
                          </FilterPickerButton>
                        ))}
                        <FilterPickerButton
                          onClick={() => {
                            filterByLevel('');
                            toggleLevelPicker();
                          }}
                        >
                          ВСІ
                        </FilterPickerButton>
                      </FilterPicker>
                    )}
                  </Filterable>
                </UserHeadCell>
                <UserHeadCell>Номер уроку</UserHeadCell>
                <UserHeadCell>Тема</UserHeadCell>
                <UserHeadCell>FAQ</UserHeadCell>
                <UserHeadCell>Додати</UserHeadCell>
              </UserDBRow>
            </thead>
            <tbody>
              {lessons.map(lesson => (
                <UserDBRow key={lesson._id}>
                  <UserCell>{lesson.marathonName}</UserCell>
                  <UserCell>{lesson.lang}</UserCell>
                  <UserCell>{lesson.level}</UserCell>
                  <UserCell>{lesson.lesson}</UserCell>
                  <UserCell>{lesson.topic}</UserCell>
                  <UserCell>
                    {lesson.faq.map((q, i) => (
                      <>
                        <a
                          key={i}
                          href={q.answer}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {i + 1}
                        </a>{' '}
                      </>
                    ))}
                  </UserCell>
                  <UserCell>
                    {
                      <UserEditButton onClick={() => handleEdit(lesson._id)}>
                        Add
                      </UserEditButton>
                    }
                  </UserCell>
                </UserDBRow>
              ))}
            </tbody>
          </UserDBTable>
        )}
        {isEditFormOpen && (
          <Backdrop onClick={closeEditFormOnClick} id="close-on-click">
            <Formik
              initialValues={initialAnswerValues}
              onSubmit={handleAnswerSubmit}
              validationSchema={answerSchema}
            >
              <UsersEditForm>
                <LessonInfo>
                  <li>{lessonToEdit.marathonName}</li>
                  <li>{lessonToEdit.lang}</li>
                  <li>{lessonToEdit.level}</li>
                  <li>{lessonToEdit.lesson}</li>
                </LessonInfo>

                <Label>
                  <AdminInput
                    type="text"
                    name="exercise"
                    placeholder="Розділ та вправа"
                  />
                  <AdminInputNote component="p" name="exercise" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="question"
                    placeholder="Питання користувача (переформулювати точніше та скоротити)"
                  />
                  <AdminInputNote component="p" name="question" />
                </Label>
                <Label>
                  <AdminInput
                    type="text"
                    name="answer"
                    placeholder="Відповідь"
                  />
                  <AdminInputNote component="p" name="answer" />
                </Label>
                <AdminFormBtn type="submit">Додати відповідь</AdminFormBtn>
              </UsersEditForm>
            </Formik>
          </Backdrop>
        )}
        {isLoading && <Loader />}
      </AdminPanelSection>
    </>
  );
};
