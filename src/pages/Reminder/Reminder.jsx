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
          <LinkBase href="viber://pa?chatURI=agropracticepartnerss" target="_blank">
            <AdminFormBtn>Viber</AdminFormBtn>
          </LinkBase>

          <LinkBase href="https://t.me/ap_notification_lesson_bot" target="_blank">
            <AdminFormBtn>Telegram</AdminFormBtn>
          </LinkBase>
        </ReminderContainer>
      </GradientBackground>
    </PageContainer>
  );
}

export default Reminder;
