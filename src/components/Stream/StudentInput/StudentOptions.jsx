import axios from 'axios';
import {
  StudentQuizBox,
  StudentQuizForm,
  StudentQuizSubmitBtnOptions,
} from './StudentInput.styled';

export const StudentOptions = ({
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
    <StudentQuizBox
      className={isInputOpen ? 'shown' : 'hidden'}
      //   draggable={true}
      //   onDrag={handleOnDrag}
      //   onTouchMove={handleOnDrag}
    >
      <StudentQuizForm>
        <StudentQuizSubmitBtnOptions onClick={e => handleSubmit(e)}>
          A
        </StudentQuizSubmitBtnOptions>
        <StudentQuizSubmitBtnOptions onClick={e => handleSubmit(e)}>
          B
        </StudentQuizSubmitBtnOptions>
        <StudentQuizSubmitBtnOptions onClick={e => handleSubmit(e)}>
          C
        </StudentQuizSubmitBtnOptions>
        {/* <StudentQuizSubmitBtnOptions onClick={(e) => handleSubmit(e)}>D</StudentQuizSubmitBtnOptions> */}
      </StudentQuizForm>
    </StudentQuizBox>
  );
};
