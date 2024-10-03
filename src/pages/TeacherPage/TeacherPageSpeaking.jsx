import axios from 'axios';
import { Backdrop } from 'components/LeadForm/Backdrop/Backdrop.styled';
import { Loader } from 'components/SharedLayout/Loaders/Loader';
import {
  UserCell,
  UserCellLeft,
  UserDBCaption,
  UserDBRow,
  UserEditButton,
  UserHeadCell,
} from 'pages/Streams/UserAdminPanel/UserAdminPanel.styled';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  TeacherSpeakingDBSection,
  TeacherSpeakingDBTable,
} from './TeacherPage.styled';
import { TeacherPageSpeakingEditForm } from './TeacherPageSpeakingEditForm/TeacherPageSpeakingEditForm';

const TeacherPageSpeaking = () => {
  const location = useLocation().pathname.split('/speakings/')[1];
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [course, setCourse] = useState('');
  const [studentToEdit, setStudentToEdit] = useState({});
  const [isEditStudentFormOpen, setIsEditStudentFormOpen] = useState(false);
  const linksRegex = /\b(?:https?|ftp):\/\/\S+\b/g;

  const closeStudentEditForm = e => {
    setIsEditStudentFormOpen(false);
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
    if (location.includes('de') || location.includes('deutsch')) {
      return 'de';
    } else if (location.includes('pl') || location.includes('polski')) {
      return 'pl';
    } else {
      return 'en';
    }
  };
  const page = getLocation(location);
  const lang = getLanguageFromLocation(location);

  const closeEditStudentFormOnClick = e => {
    if (e.target.id === 'close-on-click') {
      setIsEditStudentFormOpen(false);
    }
  };

  const handleStudentEdit = async id => {
    setStudentToEdit(
      studentToEdit =>
        (studentToEdit = users.find(student => student.userId === id))
    );
    setIsEditStudentFormOpen(true);
  };

  useEffect(() => {
    document.title = `Speaking Teacher ${page.toLocaleUpperCase()} | AP Education`;
    const getSpeakingUsersRequest = async () => {
      try {
        setIsLoading(isLoading => (isLoading = true));
        setCourse(
          (await axios.get('/timetable')).data.filter(
            timetable =>
              page.includes(timetable.level) && lang === timetable.lang
          )[0].course
        );
        const usersToSet = await axios.get('/speakingusers', {
          params: { course },
        });
        setUsers(users => (users = [...usersToSet.data]));
        console.log('eff');
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(isLoading => (isLoading = false));
      }
    };
    getSpeakingUsersRequest();
  }, [isEditStudentFormOpen, course, page, lang]);

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
            <UserHeadCell>Відвідини</UserHeadCell>
            <UserHeadCell>Мова</UserHeadCell>
            <UserHeadCell>Потік</UserHeadCell>
            <UserHeadCell>Темперамент</UserHeadCell>
            <UserHeadCell>Успішність</UserHeadCell>
            <UserHeadCell>Фідбек</UserHeadCell>
          </UserDBRow>
        </thead>
        <tbody>
          {users
            .filter(
              user =>
                new Date() -
                  new Date(
                    changeDateFormat(user.visited[user.visited.length - 1])
                  ) <=
                  3 * 86400000 &&
                (lang === user.lang || lang === user.lang.split('/')[0]) &&
                course === user.course
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
                    <UserEditButton
                      onClick={() => handleStudentEdit(user.userId)}
                    >
                      Edit
                    </UserEditButton>
                  )}
                </UserCell>
                <UserCell>
                  {!user.visitedTime[user.visitedTime.length - 1]
                    ? ''
                    : user.visitedTime[user.visitedTime.length - 1].match(
                        '^202'
                      )
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
                <UserCellLeft
                  dangerouslySetInnerHTML={{
                    __html:
                      typeof user.feedback === 'string'
                        ? user.feedback.replace(
                            linksRegex,
                            match =>
                              `<a href="${match}" target="_blank">${
                                match.length > 50
                                  ? match.slice(0, 50) + '...'
                                  : match
                              }</a>`
                          )
                        : '',
                  }}
                ></UserCellLeft>
              </UserDBRow>
            ))}
        </tbody>
      </TeacherSpeakingDBTable>

      {isEditStudentFormOpen && (
        <Backdrop onClick={closeEditStudentFormOnClick} id="close-on-click">
          <TeacherPageSpeakingEditForm
            studentToEdit={studentToEdit}
            closeCourseLevelEditForm={closeStudentEditForm}
          />
        </Backdrop>
      )}
      {isLoading && <Loader />}
    </TeacherSpeakingDBSection>
  );
};

export default TeacherPageSpeaking;
