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
  currentUser,
  user,
  questionID,
}) => {
  const handleSubmit = async e => {
    e.preventDefault();
    const answer = e.target.innerText;
    toggleQuiz();

    socket.emit('answer:given', {
      answer: answer,
      page: page,
    });

    await axios.post('/answers', {
      answer: answer,
      username: user?.name || currentUser.username,
      page: page,
      socketID: socket.id,
      questionID: questionID,
      userID: user?.id || currentUser.userID,
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
