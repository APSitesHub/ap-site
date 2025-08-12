import { AdminFormBtn } from 'pages/Streams/AdminPanel/AdminPanel.styled';
import {
  GradientBackground,
  LinkBase,
  PageContainer,
} from '../Videochat/Videochat.styled';
import { ReminderContainer, ReminderText } from './Reminder.styled';

function Reminder() {
  return (
    <PageContainer>
      <GradientBackground>
        <ReminderContainer>
          <ReminderText>
            Оберіть месенджер, в якому Вам буде зручніше отримувати сповіщення
          </ReminderText>
          <AdminFormBtn>
            <LinkBase href="viber://pa?chatURI=agropracticepartnerss" target="_blank">
              Viber
            </LinkBase>
          </AdminFormBtn>

          <AdminFormBtn>
            <LinkBase href="https://t.me/ap_notification_lesson_bot" target="_blank">
              Telegram
            </LinkBase>
          </AdminFormBtn>
        </ReminderContainer>
      </GradientBackground>
    </PageContainer>
  );
}

export default Reminder;
