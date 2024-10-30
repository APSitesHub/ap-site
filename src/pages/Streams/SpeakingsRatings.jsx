import axios from 'axios';
import { Loader } from 'components/SharedLayout/Loaders/Loader';
import {
  UserCell,
  UserCellLeft,
  UserDBCaption,
  UserDBRow,
  UserHeadCell,
} from 'pages/Streams/UserAdminPanel/UserAdminPanel.styled';
import {
  TeacherSpeakingDBSection,
  TeacherSpeakingDBTable,
} from 'pages/TeacherPage/TeacherPage.styled';
import { useEffect, useState } from 'react';

const SpeakingsRatings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const changeDateFormat = dateString => {
    if (dateString) {
      const dateArray = dateString.split('.');
      return dateArray.length > 2
        ? Date.parse([dateArray[1], dateArray[0], dateArray[2]].join('/'))
        : Date.parse(dateString);
    }
    return;
  };

  useEffect(() => {
    document.title = `Speaking Visited | AP Education`;
    const getSpeakingUsersRequest = async () => {
      try {
        setIsLoading(isLoading => (isLoading = true));
        const usersToSet = await axios.get('/speakingusers/rating');
        console.log(47, usersToSet);

        setUsers(users => (users = [...usersToSet.data]));
        console.log('eff');
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(isLoading => (isLoading = false));
      }
    };
    getSpeakingUsersRequest();
  }, []);

  return (
    <TeacherSpeakingDBSection>
      <TeacherSpeakingDBTable>
        <UserDBCaption>Список студентів, що відвідали заняття</UserDBCaption>
        <thead>
          <UserDBRow>
            <UserHeadCell>№</UserHeadCell>
            <UserHeadCell>Ім'я</UserHeadCell>
            <UserHeadCell>Відвідини</UserHeadCell>
            <UserHeadCell>Мова</UserHeadCell>
            <UserHeadCell>Потік</UserHeadCell>
          </UserDBRow>
        </thead>
        <tbody>
          {users
            .filter(
              user =>
                new Date() -
                  new Date(
                    changeDateFormat(
                      user.visitedTime[user.visitedTime.length - 1]
                    )
                  ) <=
                  4 * 86400000 &&
                user.name !== 'Dev Acc' &&
                !user.name.includes('Guest')
            )
            .sort(
              (a, b) =>
                new Date(
                  changeDateFormat(b.visitedTime[b.visitedTime.length - 1])
                ) -
                new Date(
                  changeDateFormat(a.visitedTime[a.visitedTime.length - 1])
                )
            )
            .map((user, i) => (
              <UserDBRow key={user._id}>
                <UserCell>{i + 1}</UserCell>
                <UserCellLeft>{user.name}</UserCellLeft>
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
              </UserDBRow>
            ))}
        </tbody>
      </TeacherSpeakingDBTable>
      {isLoading && <Loader />}
    </TeacherSpeakingDBSection>
  );
};

export default SpeakingsRatings;
