import { nanoid } from 'nanoid';
import {
  CupIcon,
  LeaderPlace,
  PointsBox,
  PointsBoxHeading,
  PointsCategory,
  PointsCategoryPicker,
  PointsCategoryPointer,
  PointsLeader,
  PointsLeaderboard,
  PointsTableHead,
  PointsTableHeadItem,
  PointsTableHeadItemWide,
  PointsUser,
  PointsUserData,
  PointsUserDataWide,
  UserPlace,
} from './Points.styled';
import { useState } from 'react';

export const Points = ({ user, flatPoints, flatMonthlyPoints }) => {
  const [position, setPosition] = useState('0%');
  const [activeRating, setActiveRating] = useState(0);

  const pointsSorted =
    activeRating > 0
      ? flatMonthlyPoints
          .filter(student => `${student.course}` === user.course)
          .sort((a, b) => b.points - a.points)
      : flatPoints
          .filter(student => `${student.course}` === user.course)
          .sort((a, b) => b.points - a.points);

  const userPlace = pointsSorted.findIndex(leader => leader.mail === user.mail);

  const calculatePointerPosition = i => {
    setPosition(position => (position = `${i * 100}%`));
    setActiveRating(i);
  };

  return (
    <PointsBox>
      <PointsBoxHeading>
        <CupIcon />
        Рейтинг
      </PointsBoxHeading>
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
          {pointsSorted.findIndex(leader => leader.mail === user.mail) + 1}
        </PointsUserData>
        <PointsUserDataWide>{user.name}</PointsUserDataWide>
        <PointsUserData>{pointsSorted[userPlace].points}</PointsUserData>
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
    </PointsBox>
  );
};
