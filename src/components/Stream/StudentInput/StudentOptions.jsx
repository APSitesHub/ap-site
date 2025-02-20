import {
  StudentQuizBox,
  StudentQuizForm,
  StudentQuizSubmitBtnOptions
} from './StudentInput.styled';

export const StudentOptions = ({ isInputOpen, socket }) => {
  console.log(4, 'studentoptionssocket', socket);

  const handleSubmit = e => {
    e.preventDefault();
    console.log(e.target);
    socket.emit('answer:given', {
      answer: e.target.innerText,
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
        <StudentQuizSubmitBtnOptions onClick={(e) => handleSubmit(e)}>A</StudentQuizSubmitBtnOptions>
        <StudentQuizSubmitBtnOptions onClick={(e) => handleSubmit(e)}>B</StudentQuizSubmitBtnOptions>
        <StudentQuizSubmitBtnOptions onClick={(e) => handleSubmit(e)}>C</StudentQuizSubmitBtnOptions>
        {/* <StudentQuizSubmitBtnOptions onClick={(e) => handleSubmit(e)}>D</StudentQuizSubmitBtnOptions> */}
      </StudentQuizForm>
    </StudentQuizBox>
  );
};
