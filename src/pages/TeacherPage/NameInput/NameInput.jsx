import { NameInputBox, TeacherInfoInput } from './NameInput.styled';

export const NameInput = ({ isNameInputOpen, changeTeacherInfo }) => {
  const setValuesAndUpdateTeacherInfo = () => {
    const name = document.querySelector('input[name="nameValue"]').value;
    const lesson = document.querySelector('input[name="lessonValue"]').value;
    const level = document.querySelector('input[name="levelValue"]').value;
    changeTeacherInfo(name, lesson, level);
    document.querySelector('input[name="nameValue"]').value = '';
    document.querySelector('input[name="lessonValue"]').value = '';
    document.querySelector('input[name="levelValue"]').value = '';
  };

  return (
    <NameInputBox className={isNameInputOpen ? 'shown' : 'hidden'}>
      <TeacherInfoInput type="text" name="nameValue" placeholder="Ім'я викладача"></TeacherInfoInput>
      <TeacherInfoInput type="text" name="levelValue" placeholder="Рівень"></TeacherInfoInput>
      <TeacherInfoInput type="text" name="lessonValue" placeholder="Номер уроку"></TeacherInfoInput>
      <button onClick={setValuesAndUpdateTeacherInfo}>OK</button>
    </NameInputBox>
  );
};
