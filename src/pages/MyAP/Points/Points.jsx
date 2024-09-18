import { nanoid } from 'nanoid';
import { useState } from 'react';
import eyesImg from '../../../img/quiz/eyes.png';
import {
  CupIcon,
  EyesEmoji,
  LeaderPlace,
  PointsBox,
  PointsBoxHeading,
  PointsCategory,
  PointsCategoryPicker,
  PointsCategoryPointer,
  PointsLeader,
  PointsLeaderboard,
  PointsPlaceHolder,
  PointsPlaceHolderText,
  PointsTableHead,
  PointsTableHeadItem,
  PointsTableHeadItemWide,
  PointsUser,
  PointsUserData,
  PointsUserDataWide,
  UserPlace,
} from './Points.styled';

export const Points = ({
  user,
  flatPoints,
  flatMonthlyPoints,
  isMultipleCourses,
}) => {
  const [position, setPosition] = useState('0%');
  const [activeRating, setActiveRating] = useState(0);

  const pointsSorted =
    activeRating > 0
      ? flatMonthlyPoints
          .filter(student => `${student.course}` === user.course)
          .sort((a, b) => b.points - a.points)
      : flatPoints
          .filter(student => `${student.course}`[0] === user.course[0])
          .sort((a, b) => b.points - a.points);

  const userPlace = pointsSorted.findIndex(
    leader => leader.mail.toLowerCase() === user.mail.toLowerCase()
  );

  const calculatePointerPosition = i => {
    setPosition(position => (position = `${i * 100}%`));
    setActiveRating(i);
  };

  const panelStyles = () => {
    return {
      top: isMultipleCourses ? '184px' : '142px',
    };
  };

  return (
    <PointsBox style={{ ...panelStyles() }}>
      <PointsBoxHeading>
        <CupIcon />
        Рейтинг
      </PointsBoxHeading>
      {userPlace === -1 ? (
        <PointsPlaceHolder>
          <EyesEmoji src={eyesImg} alt="Eyes emoji" width="80" />
          <PointsPlaceHolderText>Шукаємо вас у рейтингу.</PointsPlaceHolderText>
          <PointsPlaceHolderText>
            Виконайте ще кілька вправ, <br /> щоб бути в топі! 🤩
          </PointsPlaceHolderText>
        </PointsPlaceHolder>
      ) : (
        <>
          <PointsCategoryPicker>
            <PointsCategoryPointer
              style={{ transform: `translateX(${position})` }}
            />
            <PointsCategory
              onClick={() => {
                calculatePointerPosition(0);
              }}
              className={activeRating === 0 && 'active'}
            >
              Загальний
            </PointsCategory>
            <PointsCategory
              onClick={() => {
                calculatePointerPosition(1);
              }}
              className={activeRating === 1 && 'active'}
            >
              Місячний
            </PointsCategory>
          </PointsCategoryPicker>
          <PointsTableHead>
            <PointsTableHeadItem>Місце</PointsTableHeadItem>
            <PointsTableHeadItemWide>Прізвище та ім’я</PointsTableHeadItemWide>
            <PointsTableHeadItem>Бали</PointsTableHeadItem>
          </PointsTableHead>
          <PointsUser>
            <PointsUserData>
              {pointsSorted.findIndex(
                leader => leader.mail.toLowerCase() === user.mail.toLowerCase()
              ) + 1}
            </PointsUserData>
            <PointsUserDataWide>{user.name}</PointsUserDataWide>
            <PointsUserData>
              {pointsSorted[userPlace].points < 0
                ? 0
                : pointsSorted[userPlace].points}
            </PointsUserData>
          </PointsUser>
          <PointsLeaderboard>
            {pointsSorted.slice(0, 10).map((leader, i) => (
              <PointsLeader key={nanoid(8)}>
                {i <= 2 ? (
                  <LeaderPlace>{i + 1}</LeaderPlace>
                ) : (
                  <UserPlace>{i + 1}</UserPlace>
                )}
                <PointsUserDataWide>{leader.name}</PointsUserDataWide>
                <PointsUserData>{leader.points}</PointsUserData>
              </PointsLeader>
            ))}
          </PointsLeaderboard>
        </>
      )}
    </PointsBox>
  );
};
