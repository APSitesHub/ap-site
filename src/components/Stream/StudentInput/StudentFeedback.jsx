import axios from 'axios';
import {
  ErrorMsg,
  FeedbackTextaera,
  StarButton,
  StarsContainer,
  StudentQuizBox,
  StudentQuizForm,
  StudentQuizSubmitBtn,
} from './StudentInput.styled';
import { useState } from 'react';
import { MenuBurgerCloseIcon } from 'components/Menu/Menu.styled';
import { QuestionHeader } from 'pages/TeacherPage/TeacherPage.styled';

export const StudentFeedback = ({
  isInputOpen,
  socket,
  page,
  toggleQuiz,
  currentUser,
  user,
  questionID,
  feedbackID,
}) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [isErrorMessageShowing, setIsErrorMessageShowing] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();

    if (rating < 1) {
      setIsErrorMessageShowing(true);
      return;
    }

    const answer = {
      rating,
      comment,
    };
    toggleQuiz();

    socket.emit('answer:given', {
      answer: answer,
      lesson: page,
      userId: user.id,
      feedbackID,
    });

    await axios.post('/answers', {
      answer: answer,
      userId: user.id,
      page: page,
      socketID: socket.id,
      questionID: questionID,
      userID: user?.id || currentUser.userID,
    });
  };

  return (
    <StudentQuizBox className={isInputOpen ? 'shown' : 'hidden'} $isFeedback>
      <QuestionHeader>Залиш фідбек по вебінару</QuestionHeader>
      <StudentQuizForm style={{ position: 'relative' }}>
        <div style={{ margin: '0 auto' }}>
          <StarsContainer>
            <StarButton
              style={{
                position: 'absolute',
                top: '4px',
                right: '4px',
              }}
              type="button"
              onClick={toggleQuiz}
            >
              <MenuBurgerCloseIcon />
            </StarButton>
            {[1, 2, 3, 4, 5].map(star => (
              <StarButton
                type="button"
                key={star}
                onClick={() => {
                  setRating(star);
                  setIsErrorMessageShowing(false);
                }}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
              >
                <span
                  style={{ color: star <= (hover || rating) ? '#facc15' : '#d1d5db' }}
                >
                  ★
                </span>
              </StarButton>
            ))}
          </StarsContainer>
          <ErrorMsg style={{ opacity: isErrorMessageShowing ? '1' : '0' }}>
            Будь ласка, поставте свою оцінку за урок
          </ErrorMsg>
        </div>
        <FeedbackTextaera
          id="comment"
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
        <StudentQuizSubmitBtn onClick={e => handleSubmit(e)}>Send</StudentQuizSubmitBtn>
      </StudentQuizForm>
    </StudentQuizBox>
  );
};
