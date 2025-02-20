import {
  StudentQuizBox,
  StudentQuizForm,
  StudentQuizSubmitBtnOptions,
} from './StudentInput.styled';

export const StudentTrueFalse = ({ isInputOpen, socket }) => {
  console.log(4, 'studentinputsocket', socket);

  const handleSubmit = e => {
    e.preventDefault();
    console.log(e.target);
    socket.emit('answer:given', {
      answer: e.target.innerText,
    });
  };

  return (
    <StudentQuizBox className={isInputOpen ? 'shown' : 'hidden'}>
      <StudentQuizForm>
        <StudentQuizSubmitBtnOptions onClick={e => handleSubmit(e)}>
          True
        </StudentQuizSubmitBtnOptions>
        <StudentQuizSubmitBtnOptions onClick={e => handleSubmit(e)}>
          False
        </StudentQuizSubmitBtnOptions>
      </StudentQuizForm>
    </StudentQuizBox>
  );
};
