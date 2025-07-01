import { useLocation } from 'react-router-dom';
import { NameInputBox, TeacherInfoInput } from './NameInput.styled';
import { useEffect, useState } from 'react';

export const NameInput = ({ isNameInputOpen, changeTeacherInfo, uni }) => {
  const [isPedagogium, setIsPedagogium] = useState(false);
  const location = useLocation();
  const setValuesAndUpdateTeacherInfo = () => {
    const name = document.querySelector('input[name="nameValue"]').value;
    const lesson = document.querySelector('input[name="lessonValue"]').value;
    const level = document.querySelector('input[name="levelValue"]').value;
    changeTeacherInfo(name, lesson, level);
  };

  useEffect(() => {
    const isPedagogiumCheck = location.pathname.includes('pedagogium');
    setIsPedagogium(isPedagogiumCheck);

    document.querySelector('input[name="nameValue"]').value =
      localStorage.getItem('teacherName') || '';

    document.querySelector('input[name="lessonValue"]').value =
      localStorage.getItem('lessonNumber') || '';

    document.querySelector('input[name="levelValue"]').value =
      localStorage.getItem('lessonName') || '';
  }, [location.pathname]);

  return (
    <NameInputBox className={isNameInputOpen ? 'shown' : 'hidden'}>
      <TeacherInfoInput
        type="text"
        name="nameValue"
        placeholder={uni ? 'Teacher name' : "Ім'я викладача"}
      ></TeacherInfoInput>
      <TeacherInfoInput
        type="text"
        name="levelValue"
        placeholder={
          uni
            ? `${isPedagogium ? 'Lesson' : 'Level'}`
            : `${isPedagogium ? 'Назва уроку' : 'Рівень'}`
        }
      ></TeacherInfoInput>
      <TeacherInfoInput
        type="text"
        name="lessonValue"
        placeholder={uni ? 'Lesson number' : 'Номер уроку'}
      ></TeacherInfoInput>
      <button onClick={setValuesAndUpdateTeacherInfo}>OK</button>
    </NameInputBox>
  );
};
