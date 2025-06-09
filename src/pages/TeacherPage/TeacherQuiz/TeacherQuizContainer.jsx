import axios from 'axios';
import { CloseIcon, FormCloseBtn } from 'components/LeadForm/LeadForm.styled';
import { useEffect, useRef, useState } from 'react';
import {
  TeacherChartBtn,
  TeacherChartBtnBox,
  TeacherChartResetBtn,
} from '../StudentChart/StudentChart.styled';
import { TeacherAnswersChart } from '../StudentChart/TeacherAnswersChart';
import {
  TeacherChatPageContainer,
  TeacherQuizConfirmation,
  TeacherQuizConfirmationBtnBox,
  TeacherQuizConfirmationHighlight,
  TeacherQuizConfirmationText,
  TeacherQuizCorrectList,
  TeacherQuizCorrectListEndQuizBtnBox,
  TeacherQuizCorrectListHeading,
  TeacherQuizCorrectListUser,
  TeacherQuizCorrectListUserInfo,
  TeacherQuizCorrectListUserNumber,
  TeacherQuizCorrectListUsers,
} from './TeacherQuiz.styled';
import { nanoid } from 'nanoid';

export const TeacherQuizContainer = ({
  page,
  quizType,
  socket,
  closeInputs,
  questionID,
  changeQuestionID,
  uni,
  teacherName,
}) => {
  const [answers, setAnswers] = useState({});
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isListOpen, setIsListOpen] = useState(false);
  const correctAnswer = useRef('');
  const list = useRef([]);

  const emitQuizStart = () => {
    setAnswers(answers => (answers = { ...{} }));
    console.log(socket.id, 'socket.id');
    console.log(questionID, 'questionID.current');

    console.log(teacherName);

    if (quizType === 'feedback') {
      socket.emit('question:asked', {
        id: socket.id,
        feedbackId: nanoid(),
        question: questionID,
        page: page,
        quizType: quizType,
        teacherName: teacherName,
      });
    } else {
      socket.emit('question:asked', {
        id: socket.id,
        question: questionID,
        page: page,
        quizType: quizType,
      });
    }
    setIsQuizActive(true);
    changeQuestionID();
    console.log(questionID, 'questionID.current after emitQuizStart');
  };

  const emitQuizEnd = () => {
    setAnswers(answers => (answers = { ...{} }));
    socket.emit('question:closed', { question: 'bye', page: page, quizType: quizType });
    closeInputs();
    setIsQuizActive(false);
  };

  const setAndSendAnswer = answer => {
    correctAnswer.current = answer;
    setIsConfirmationOpen(true);
  };

  const sendConfirmedAnswer = async () => {
    console.log(answers, 'answers before sendConfirmedAnswer');
    console.log(correctAnswer.current, 'correctAnswer.current');
    list.current = await axios.get(
      `https://ap-server-8qi1.onrender.com/answers/${questionID}`
    );
    console.log(
      list.current.data.filter(
        item => item.answer.toLowerCase() === correctAnswer.current.toLowerCase()
      ),
      'list.current.data'
    );
    setIsListOpen(true);
    setIsConfirmationOpen(false);
  };

  useEffect(() => {
    socket &&
      socket.on('answer:acquired', (answer, answerPage) => {
        if (page === answerPage) {
          const answerNumbers = answers.hasOwnProperty(answer) ? answers[answer] + 1 : 1;
          setAnswers(answers => (answers = { ...answers, [answer]: answerNumbers }));
        }
      });
  }, [socket, answers, page]);

  return (
    <TeacherChatPageContainer>
      {isConfirmationOpen && (
        <TeacherQuizConfirmation>
          <FormCloseBtn onClick={() => setIsConfirmationOpen(false)}>
            {' '}
            <CloseIcon />
          </FormCloseBtn>
          <TeacherQuizConfirmationText>
            {uni ? 'Set answer' : 'Чи відповідь'}{' '}
            <TeacherQuizConfirmationHighlight>
              "{correctAnswer.current}"
            </TeacherQuizConfirmationHighlight>{' '}
            {uni ? 'as correct or delete it?' : 'правильна чи її необхідно видалити?'}{' '}
          </TeacherQuizConfirmationText>
          <TeacherQuizConfirmationBtnBox>
            <TeacherChartBtn onClick={sendConfirmedAnswer}>
              {uni ? 'Correct' : 'Правильна'}
            </TeacherChartBtn>
            <TeacherChartResetBtn
              onClick={() => {
                setAnswers(answers => {
                  delete answers[correctAnswer.current];
                  return answers;
                });

                setIsConfirmationOpen(false);
              }}
            >
              {uni ? 'Delete' : 'Видалити'}
            </TeacherChartResetBtn>
          </TeacherQuizConfirmationBtnBox>
        </TeacherQuizConfirmation>
      )}
      {isListOpen && (
        <TeacherQuizCorrectList>
          <TeacherQuizCorrectListHeading>
            {uni ? 'Correct answers' : 'Правильно відповіли'}
          </TeacherQuizCorrectListHeading>
          <TeacherQuizCorrectListUsers>
            {list.current.data
              .filter(
                item => item.answer.toLowerCase() === correctAnswer.current.toLowerCase()
              )
              .map((item, index) => (
                <TeacherQuizCorrectListUser key={index}>
                  <TeacherQuizCorrectListUserNumber
                    className={
                      index + 1 === 1
                        ? 'gold'
                        : index + 1 === 2
                        ? 'silver'
                        : index + 1 === 3
                        ? 'bronze'
                        : null
                    }
                  >{`${index + 1}`}</TeacherQuizCorrectListUserNumber>
                  <TeacherQuizCorrectListUserInfo>
                    {item.username}
                  </TeacherQuizCorrectListUserInfo>
                  <TeacherQuizCorrectListUserInfo>
                    {new Date(item.createdAt).toTimeString().slice(0, 8)}
                    {/* {new Date(item.createdAt).toTimeString().slice(0,8)+'.'+new Date(item.createdAt).getMilliseconds()} */}
                  </TeacherQuizCorrectListUserInfo>
                </TeacherQuizCorrectListUser>
              ))}
          </TeacherQuizCorrectListUsers>
          {isQuizActive && (
            <TeacherQuizCorrectListEndQuizBtnBox>
              <TeacherChartResetBtn type="button" onClick={emitQuizEnd}>
                End
              </TeacherChartResetBtn>
            </TeacherQuizCorrectListEndQuizBtnBox>
          )}
        </TeacherQuizCorrectList>
      )}
      <TeacherAnswersChart
        answers={answers}
        quizType={quizType}
        isQuizActive={isQuizActive}
        setAndSendAnswer={setAndSendAnswer}
      />
      <TeacherChartBtnBox>
        {!isQuizActive && (
          <TeacherChartBtn type="button" onClick={emitQuizStart}>
            Start
          </TeacherChartBtn>
        )}
        {isQuizActive && (
          <TeacherChartResetBtn type="button" onClick={emitQuizEnd}>
            End
          </TeacherChartResetBtn>
        )}
      </TeacherChartBtnBox>
    </TeacherChatPageContainer>
  );
};
