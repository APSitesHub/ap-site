import { useLocation } from 'react-router-dom';
import { NameInputBox, TeacherInfoInput } from './NameInput.styled';
import { useEffect, useState } from 'react';

export const NameInput = ({ isNameInputOpen, changeTeacherInfo }) => {
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

    document.querySelector('input[name="nameValue"]').value = isPedagogiumCheck
      ? localStorage.getItem('teacherName') || ''
      : '';
    document.querySelector('input[name="lessonValue"]').value = isPedagogiumCheck
      ? localStorage.getItem('lessonNumber') || ''
      : '';
    document.querySelector('input[name="levelValue"]').value = isPedagogiumCheck
      ? localStorage.getItem('lessonName') || ''
      : '';
  }, []);

  return (
    <NameInputBox className={isNameInputOpen ? 'shown' : 'hidden'}>
      <TeacherInfoInput
        type="text"
        name="nameValue"
        placeholder="Ім'я викладача"
      ></TeacherInfoInput>
      <TeacherInfoInput
        type="text"
        name="levelValue"
        placeholder={`${isPedagogium ? 'Назва уроку' : 'Рівень'}`}
      ></TeacherInfoInput>
      <TeacherInfoInput
        type="text"
        name="lessonValue"
        placeholder="Номер уроку"
      ></TeacherInfoInput>
      <button onClick={setValuesAndUpdateTeacherInfo}>OK</button>
    </NameInputBox>
  );
};
