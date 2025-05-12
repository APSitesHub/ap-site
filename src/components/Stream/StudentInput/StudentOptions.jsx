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
