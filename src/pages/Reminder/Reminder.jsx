import {
  GradientBackground,
  LargeText,
  LinkBase,
  PageContainer,
} from '../Videochat/Videochat.styled';
import { AdminFormBtn } from 'pages/Streams/AdminPanel/AdminPanel.styled';

function Reminder() {
  return (
    <PageContainer>
      <GradientBackground>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <LargeText>
            Оберіть месенджер, де Вам буде зручніше отримувати сповіщення
          </LargeText>
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
        </div>
      </GradientBackground>
    </PageContainer>
  );
}

export default Reminder;
