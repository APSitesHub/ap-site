import { DescriptionUnderlineShort } from 'components/Hero/Hero.styled';
import { useState } from 'react';
import { ScheduleTable, ScheduleTrigger } from './Schedule.styled';
import { ScheduleGrid } from './ScheduleGrid/ScheduleGrid';

export const Schedule = () => {
  const [isMore, setIsMore] = useState(false);
  const showMore = () => {
    setIsMore(isMore => !isMore);
  };

  return (
    <>
      <ScheduleTrigger onClick={showMore}>
        {isMore ? 'Згорнути ' : 'Розклад'}
        <DescriptionUnderlineShort />
      </ScheduleTrigger>

      {isMore ? (
        <ScheduleTable className={isMore ? 'more-shown' : 'more-hidden'}>
          <ScheduleGrid />
        </ScheduleTable>
      ) : (
        ''
      )}
    </>
  );
};
