import axios from 'axios';
import {
  StudentQuizBox,
  StudentQuizForm,
  StudentQuizSubmitBtnOptions,
} from './StudentInput.styled';

export const StudentTrueFalse = ({
  isInputOpen,
  socket,
  page,
  toggleQuiz,
  user,
  questionID,
}) => {

  const handleSubmit = async e => {
    e.preventDefault();
    console.log(e.target);
    socket.emit('answer:given', {
      answer: e.target.innerText,
      page: page,
    });

    await axios.post('/answers', {
      answer: e.target.innerText,
      username: user.name,
      page: page,
      socketID: socket.id,
      questionID: questionID,
      userID: user.id,
    });

    toggleQuiz();
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
