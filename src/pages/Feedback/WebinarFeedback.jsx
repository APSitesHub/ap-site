import { Page } from 'pages/Videochat/Videochat.styled';
import { useParams } from 'react-router-dom';
import { FeedbackContainer, FeedbackItem } from './Feedback.styled';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Loader } from 'components/SharedLayout/Loaders/Loader';
import {
  ErrorMsg,
  FeedbackTextaera,
  StarButton,
  StarsContainer,
  StudentQuizSubmitBtn,
} from 'components/Stream/StudentInput/StudentInput.styled';

axios.defaults.baseURL = 'https://ap-server-8qi1.onrender.com';
// axios.defaults.baseURL = 'http://localhost:3001';

const WebinarFeedback = () => {
  const { lessonId, userId } = useParams();
  const [webinarData, setWebinarData] = useState(null);
  const [headerString, setHeaderString] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [isErrorMessageShowing, setIsErrorMessageShowing] = useState(false);

  const calculateLessonStart = date => {
    const newDate = new Date(date);

    newDate.setHours(newDate.getHours() - 1);
    const minutes = newDate.getMinutes(0);

    if (minutes < 15) {
      newDate.setMinutes(0);
    } else if (minutes < 45) {
      newDate.setMinutes(30);
    } else {
      newDate.setMinutes(0);
      newDate.setHours(newDate.getHours() + 1);
    }

    const hh = newDate.getHours().toString().padStart(2, '0');
    const mm = newDate.getMinutes().toString().padStart(2, '0');

    return `${hh}:${mm}`;
  };

  const buildHeader = (rawDate, teacherName) => {
    const date = new Date(rawDate);
    const lessonDate = `${date.toLocaleDateString('uk-UA')} (${calculateLessonStart(
      date
    )})`;

    setHeaderString(
      `Будь ласка, залиште відгук, як пройшло ваше заняття від ${lessonDate}, яке провів(-ла) ${teacherName} `
    );
  };

  const handleSubmit = async () => {
    if (rating < 1) {
      setIsErrorMessageShowing(true);
      return;
    }

    await axios.post(`/feedbacks/${lessonId}`, {
      rating,
      comment,
      userId,
      page: webinarData.lesson,
    });
  };

  useEffect(() => {
    const fetchWebinar = async () => {
      const res = await axios.get(`/feedbacks/${lessonId}`);

      setWebinarData(res.data);
      buildHeader(res.data.date, res.data.teachername);
    };

    fetchWebinar();
  }, []);

  return (
    <Page>
      {webinarData ? (
        <FeedbackContainer>
          <h2>{headerString}</h2>
          <FeedbackItem
            $isRow
            style={{ borderColor: isErrorMessageShowing && '#f03022' }}
          >
            <p>Оцініть якість проведення уроку:</p>
            <StarsContainer>
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
          </FeedbackItem>
          <FeedbackItem>
            <p>Коментар:</p>
            <FeedbackTextaera
              id="comment"
              value={comment}
              onChange={e => setComment(e.target.value)}
              $isLarge
            />
          </FeedbackItem>
          <StudentQuizSubmitBtn onClick={e => handleSubmit(e)}>
            Надіслати
          </StudentQuizSubmitBtn>
        </FeedbackContainer>
      ) : (
        <Loader />
      )}
    </Page>
  );
};

export default WebinarFeedback;
