import axios from 'axios';
import { Backdrop } from 'components/LeadForm/Backdrop/Backdrop.styled';
import { Loader } from 'components/SharedLayout/Loaders/Loader';
import {
  UserCell,
  UserCellLeft,
  UserChartButton,
  UserDBCaption,
  UserDBRow,
  UserEditButton,
  UserHeadCell,
} from 'pages/Streams/UserAdminPanel/UserAdminPanel.styled';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useOutletContext } from 'react-router-dom';
import { TeacherSpeakingDBSection, TeacherSpeakingDBTable } from './TeacherPage.styled';
import { TeacherPageSpeakingEditForm } from './TeacherPageSpeakingEditForm/TeacherPageSpeakingEditForm';
import { StudentChart } from './StudentChart/StudentChart';

const TeacherPageSpeaking = () => {
  const location = useLocation().pathname.split('/speakings/')[1];
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const course = useRef('');
  const lang = useRef('');
  const [studentToEdit, setStudentToEdit] = useState({});
  const [currentStudentChart, setCurrentStudentChart] = useState({});
  const [isEditStudentFormOpen, setIsEditStudentFormOpen] = useState(false);
  const [isStudentChartOpen, setIsStudentChartOpen] = useState(false);
  const linksRegex = /\b(?:https?|ftp):\/\/\S+\b/g;
  const [currentUser] = useOutletContext();

  const closeStudentEditForm = e => {
    setIsEditStudentFormOpen(false);
  };

  const closeStudentChart = e => {
    setIsStudentChartOpen(false);
  };

  const changeDateFormat = dateString => {
    if (dateString) {
      const dateArray = dateString.split('.');
      return dateArray.length > 2
        ? Date.parse([dateArray[1], dateArray[0], dateArray[2]].join('/'))
        : Date.parse(dateString);
    }
    return;
  };

  const getLocation = location => {
    switch (location) {
      case 'deutsch-a0':
        return 'deutscha0';
      case 'deutsch-a0_2':
        return 'deutscha0_2';
      case 'deutsch-a1':
        return 'deutsch';
      case 'deutsch-a1free':
        return 'deutschfree';
      case 'deutsch-a2':
        return 'deutscha2';
      case 'deutsch-a2free':
        return 'deutscha2free';
      case 'deutsch-b1':
        return 'deutschb1';
      case 'deutsch-b2':
        return 'deutschb2';
      case 'polski-a0':
        return 'polskia0';
      case 'polski-a0_2':
        return 'polskia0_2';
      case 'polski-a1':
        return 'polski';
      case 'polski-a1free':
        return 'polskifree';
      case 'polski-a2':
        return 'polskia2';
      case 'polski-b1':
        return 'polskib1';
      case 'polski-b2':
        return 'polskib2';
      default:
        return location;
    }
  };

  const getLanguageFromLocation = location => {
    if (location.includes('kids')) {
      if (location.includes('de') || location.includes('deutsch')) {
        return 'dekids';
      } else if (location.includes('pl') || location.includes('polski')) {
        return 'plkids';
      } else {
        return 'enkids';
      }
    }
    if (location.includes('de') || location.includes('deutsch')) {
      return 'de';
    } else if (location.includes('pl') || location.includes('polski')) {
      return 'pl';
    } else {
      return 'en';
    }
  };
  const page = getLocation(location);
  lang.current = getLanguageFromLocation(location);

  const closeEditStudentFormOnClick = e => {
    if (e.target.id === 'close-on-click') {
      setIsEditStudentFormOpen(false);
    }
  };

  const closeStudentChartOnClick = e => {
    if (e.target.id === 'close-chart-on-click') {
      setIsStudentChartOpen(false);
    }
  };

  const updateFeedback = (id, values) => {
    const userToUpdate = users.find(user => user._id === id);

    userToUpdate.successRate = values.successRate;
    userToUpdate.temperament = values.temperament;
    userToUpdate.feedback.push({
      grammar: values.feedback.grammar,
      lexis: values.feedback.lexis,
      speaking: values.feedback.speaking,
      listening: values.feedback.listening,
      activity: values.feedback.activity,
      text: values.feedback.text,
      grade: values.feedback.grade,
    });

    setUsers(users => (users = [...users.filter(user => user._id !== id), userToUpdate]));
  };

  const handleStudentEdit = async id => {
    setStudentToEdit(
      studentToEdit => (studentToEdit = users.find(student => student.userId === id))
    );
    setIsEditStudentFormOpen(true);
  };

  const handleStudentChart = async id => {
    setCurrentStudentChart(
      currentStudentChart =>
        (currentStudentChart = users.find(student => student.userId === id))
    );
    setIsStudentChartOpen(true);
  };

  useEffect(() => {
    document.title = `Speaking Teacher ${page.toLocaleUpperCase()} | AP Education`;
    const getSpeakingUsersRequest = async () => {
      try {
        setIsLoading(isLoading => (isLoading = true));
        page === 'kids-c1sc'
          ? (course.current = '10')
          : page === 'deb2sc'
          ? (course.current = '24')
          : (course.current = (await axios.get('/timetable')).data.filter(
              timetable =>
                page.includes(timetable.level) && lang.current === timetable.lang
            )[0].course);

        const usersToSet = await axios.get(
          `speakingusers?course=${course.current}&lang=${lang.current}`
        );

        setUsers(
          users =>
            (users =
              page === 'deb2sc'
                ? [
                    ...usersToSet.data.filter(
                      user =>
                        user.course.includes('24') ||
                        user.course
                          .split('/')
                          .some(usersCourse => usersCourse.includes('24'))
                    ),
                  ]
                : [
                    ...usersToSet.data.filter(
                      user =>
                        user.course === course.current ||
                        user.course
                          .split('/')
                          .some(usersCourse => usersCourse === course.current)
                    ),
                  ])
        );
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(isLoading => (isLoading = false));
      }
    };
    getSpeakingUsersRequest();
  }, [page]);

  return (
    <TeacherSpeakingDBSection>
      <TeacherSpeakingDBTable>
        <UserDBCaption>Список студентів, що відвідали заняття</UserDBCaption>
        <thead>
          <UserDBRow>
            <UserHeadCell>№</UserHeadCell>
            <UserHeadCell>CRM</UserHeadCell>
            <UserHeadCell>Ім'я</UserHeadCell>
            <UserHeadCell>Edit</UserHeadCell>
            <UserHeadCell>Chart</UserHeadCell>
            <UserHeadCell>Відвідини</UserHeadCell>
            <UserHeadCell>Мова</UserHeadCell>
            <UserHeadCell>Потік</UserHeadCell>
            <UserHeadCell>Темперамент</UserHeadCell>
            <UserHeadCell>Успішність</UserHeadCell>
            <UserHeadCell>Граматика</UserHeadCell>
            <UserHeadCell>Лексика</UserHeadCell>
            <UserHeadCell>Говоріння</UserHeadCell>
            <UserHeadCell>Слухання</UserHeadCell>
            <UserHeadCell>Активність</UserHeadCell>
            <UserHeadCell>Оцінка</UserHeadCell>
            <UserHeadCell>Фідбек</UserHeadCell>
          </UserDBRow>
        </thead>
        <tbody>
          {users
            .filter(user =>
              page === 'deb2sc'
                ? new Date() -
                    new Date(changeDateFormat(user.visited[user.visited.length - 1])) <=
                    4 * 86400000 &&
                  (lang.current === user.lang ||
                    user.lang.split('/').some(userLang => lang.current === userLang)) &&
                  (user.course.includes('24') ||
                    user.course
                      .split('/')
                      .some(usersCourse => usersCourse.includes('24')))
                : new Date() -
                    new Date(changeDateFormat(user.visited[user.visited.length - 1])) <=
                    4 * 86400000 &&
                  (lang === user.lang ||
                    user.lang.split('/').some(userLang => lang.current === userLang)) &&
                  (course.current === user.course ||
                    user.course
                      .split('/')
                      .some(userCourse => course.current === userCourse))
            )
            .sort((a, b) => Intl.Collator('uk').compare(a.name, b.name))
            .map((user, i) => (
              <UserDBRow key={user._id}>
                <UserCell>{i + 1}</UserCell>
                <UserCell>
                  <a
                    href={`https://apeducation.kommo.com/leads/detail/${user.crmId}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {user.crmId}
                  </a>
                </UserCell>
                <UserCellLeft>{user.name}</UserCellLeft>
                <UserCell>
                  {user.name === 'Dev Acc' ? null : (
                    <UserEditButton onClick={() => handleStudentEdit(user.userId)}>
                      Edit
                    </UserEditButton>
                  )}
                </UserCell>
                <UserCell>
                  <UserChartButton onClick={() => handleStudentChart(user.userId)}>
                    Chart
                  </UserChartButton>
                </UserCell>
                <UserCell>
                  {!user.visitedTime[user.visitedTime.length - 1]
                    ? ''
                    : user.visitedTime[user.visitedTime.length - 1].match('^202')
                    ? new Date(
                        user.visitedTime[user.visitedTime.length - 1]
                      ).toLocaleString('uk-UA')
                    : ''}
                </UserCell>
                <UserCell>{user.lang}</UserCell>
                <UserCell>{user.course}</UserCell>
                <UserCell>
                  {user.temperament === 'extro'
                    ? 'Екстраверт'
                    : user.temperament === 'intro'
                    ? 'Інтроверт'
                    : ''}
                </UserCell>
                <UserCell>
                  {user.successRate === 'good'
                    ? 'Сильний'
                    : user.successRate === 'mid'
                    ? 'Середній'
                    : user.successRate === 'bad'
                    ? 'Слабкий'
                    : ''}
                </UserCell>
                <UserCell>
                  {user.feedback[user.feedback.length - 1]?.grammar === 3
                    ? 'Дуже добре'
                    : user.feedback[user.feedback.length - 1]?.grammar === 2
                    ? 'Добре'
                    : user.feedback[user.feedback.length - 1]?.grammar === 1
                    ? 'Потребує покращення'
                    : ''}
                </UserCell>
                <UserCell>
                  {user.feedback[user.feedback.length - 1]?.lexis === 3
                    ? 'Дуже добре'
                    : user.feedback[user.feedback.length - 1]?.lexis === 2
                    ? 'Добре'
                    : user.feedback[user.feedback.length - 1]?.lexis === 1
                    ? 'Потребує покращення'
                    : ''}
                </UserCell>
                <UserCell>
                  {user.feedback[user.feedback.length - 1]?.speaking === 3
                    ? 'Дуже добре'
                    : user.feedback[user.feedback.length - 1]?.speaking === 2
                    ? 'Добре'
                    : user.feedback[user.feedback.length - 1]?.speaking === 1
                    ? 'Потребує покращення'
                    : ''}
                </UserCell>
                <UserCell>
                  {user.feedback[user.feedback.length - 1]?.listening === 3
                    ? 'Дуже добре'
                    : user.feedback[user.feedback.length - 1]?.listening === 2
                    ? 'Добре'
                    : user.feedback[user.feedback.length - 1]?.listening === 1
                    ? 'Потребує покращення'
                    : ''}
                </UserCell>
                <UserCell>
                  {user.feedback[user.feedback.length - 1]?.activity === 3
                    ? 'Дуже добре'
                    : user.feedback[user.feedback.length - 1]?.activity === 2
                    ? 'Добре'
                    : user.feedback[user.feedback.length - 1]?.activity === 1
                    ? 'Потребує покращення'
                    : ''}
                </UserCell>
                <UserCell>
                  {user.feedback[user.feedback.length - 1]?.grade || ''}
                </UserCell>
                <UserCellLeft
                  dangerouslySetInnerHTML={{
                    __html:
                      typeof user.feedback[user.feedback.length - 1]?.text === 'string'
                        ? user.feedback[user.feedback.length - 1]?.text
                            .replace(
                              linksRegex,
                              match =>
                                `<a href="${match}" target="_blank">${
                                  match.length > 50 ? match.slice(0, 50) + '...' : match
                                }</a>`
                            )
                            .split(' ')
                            .slice(1)
                            .join(' ')
                        : '',
                  }}
                ></UserCellLeft>
              </UserDBRow>
            ))}
        </tbody>
      </TeacherSpeakingDBTable>

      {isEditStudentFormOpen && (
        <Backdrop onMouseDown={closeEditStudentFormOnClick} id="close-on-click">
          <TeacherPageSpeakingEditForm
            currentUser={currentUser}
            studentToEdit={studentToEdit}
            updateFeedback={updateFeedback}
            closeStudentEditForm={closeStudentEditForm}
          />
        </Backdrop>
      )}

      {isStudentChartOpen && (
        <Backdrop onMouseDown={closeStudentChartOnClick} id="close-chart-on-click">
          <StudentChart
            currentStudentChart={currentStudentChart}
            closeCourseLevelEditForm={closeStudentChart}
          />
        </Backdrop>
      )}
      {isLoading && <Loader />}
    </TeacherSpeakingDBSection>
  );
};

export default TeacherPageSpeaking;
