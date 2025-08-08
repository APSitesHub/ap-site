import { LoginLogo } from 'components/Stream/Stream.styled';
import { Formik } from 'formik';
import { FormLabel } from 'pages/AmbassadorFormPage/AmbassadorFormPage.styled';
import { AdminPanelSection } from 'pages/Streams/TimeTableAdminPanel/TimeTableAdminPanel.styled';
import { LoginForm, Page } from 'pages/Videochat/Videochat.styled';
import { useParams } from 'react-router-dom';
import {
  ApStar,
  ApStarGray,
  FeedbackButton,
  FeedbackFormContainer,
  FormArea,
  FreeAnswerArea,
  StarsContainer,
} from './SpeackingFeedback';
import { EditFormHeader } from 'pages/TeacherPage/TeacherPage.styled';
import { useState } from 'react';
import axios from 'axios';

const ServiceFeedback = () => {
  const [isSent, setIsSent] = useState(false);
  const [hovered1, setHovered1] = useState(null);
  const [hovered2, setHovered2] = useState(null);
  const [selected1, setSelected1] = useState(null);
  const [selected2, setSelected2] = useState(null);
  const [freeAnswer, setFreeAnswer] = useState('');
  const { crmId } = useParams();

  const handleSubmit = async () => {
    if (!selected1 || !selected2) {
      alert('Будь ласка, заповніть усі поля');
      return;
    }

    const payload = {
      crmId,
      rating1: selected1,
      rating2: selected2,
      feedback: freeAnswer,
    };

    try {
      await axios.post('https://ap-server-8qi1.onrender.com/service-feedback', payload);

      setIsSent(true);
    } catch (err) {
      alert('Помилка при відправці');
      console.error(err);
    }
  };

  return (
    <Page>
      <AdminPanelSection>
        {isSent ? (
          <FeedbackFormContainer>
            <LoginLogo />
            <br />
            <br />
            <EditFormHeader>Дякую за оцінку!</EditFormHeader>
          </FeedbackFormContainer>
        ) : (
          <Formik onSubmit={handleSubmit} initialValues={{}}>
            {({ handleSubmit }) => (
              <LoginForm onSubmit={handleSubmit}>
                <LoginLogo />
                <br />
                <br />
                <FeedbackFormContainer>
                  <EditFormHeader>
                    Оцініть спілкування з менеджером сервісу
                  </EditFormHeader>
                  <FormArea>
                    <FormLabel>
                      <span>
                        Наскільки чітко та професійно менеджер спілкувався та надавав
                        інформацію?
                      </span>
                      <span>
                        (1 – зовсім не чітко/непрофесійно, 5 – дуже чітко/професійно)
                      </span>
                      <StarsContainer>
                        {[1, 2, 3, 4, 5].map(number => {
                          const isActive =
                            hovered1 !== null
                              ? number <= hovered1
                              : selected1 !== null
                              ? number <= selected1
                              : false;

                          return (
                            <div
                              key={number}
                              onMouseEnter={() => setHovered1(number)}
                              onMouseLeave={() => setHovered1(null)}
                              onClick={() => setSelected1(number)}
                            >
                              {isActive ? <ApStar /> : <ApStarGray />}
                            </div>
                          );
                        })}
                      </StarsContainer>
                    </FormLabel>
                  </FormArea>
                  <FormArea>
                    <FormLabel>
                      <span>
                        Наскільки менеджер був уважним і ефективно вирішував ваші питання?
                      </span>
                      <span>
                        (1 – зовсім не уважний/неефективний, 5 – дуже уважний/ефективний)
                      </span>
                      <StarsContainer>
                        {[1, 2, 3, 4, 5].map(number => {
                          const isActive =
                            hovered2 !== null
                              ? number <= hovered2
                              : selected2 !== null
                              ? number <= selected2
                              : false;

                          return (
                            <div
                              key={number}
                              onMouseEnter={() => setHovered2(number)}
                              onMouseLeave={() => setHovered2(null)}
                              onClick={() => setSelected2(number)}
                            >
                              {isActive ? <ApStar /> : <ApStarGray />}
                            </div>
                          );
                        })}
                      </StarsContainer>
                    </FormLabel>
                  </FormArea>
                  <FormArea>
                    <FormLabel>
                      <span>
                        Що вам сподобалося чи потребує покращення в роботі менеджера?
                      </span>
                      <FreeAnswerArea
                        value={freeAnswer}
                        onChange={e => setFreeAnswer(e.target.value)}
                        placeholder="Ваша відповідь"
                      />
                    </FormLabel>
                  </FormArea>
                  <FeedbackButton type="submit">Надіслати</FeedbackButton>
                </FeedbackFormContainer>
              </LoginForm>
            )}
          </Formik>
        )}
      </AdminPanelSection>
    </Page>
  );
};

export default ServiceFeedback;
