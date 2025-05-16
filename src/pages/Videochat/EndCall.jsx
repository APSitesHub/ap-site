import { useNavigate } from 'react-router-dom';
import {
  PageContainer,
  LargeText,
  GradientBackground,
  Container,
} from './Videochat.styled';
import { AdminFormBtn } from 'pages/Streams/AdminPanel/AdminPanel.styled';
import { useEffect } from 'react';

function EndCall() {
  const navigate = useNavigate();

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const root = document.getElementById('root');

    html.style.height = '100%';
    body.style.height = '100%';
    root.style.height = '100%';

    return () => {
      html.style.height = '';
      body.style.height = '';
      root.style.height = '';
    };
  }, []);

  return (
    <PageContainer>
      <GradientBackground>
        <Container style={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
          <LargeText>Дякую за увагу!</LargeText>
          <div
            style={{
              display: 'flex',
              gap: '20px',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <AdminFormBtn onClick={() => navigate(-1)} style={{ width: '340px' }}>
              Повернутися до уроку
            </AdminFormBtn>
            <AdminFormBtn onClick={() => navigate('/my-ap')} style={{ width: '340px' }}>
              На платформу
            </AdminFormBtn>
          </div>
        </Container>
      </GradientBackground>
    </PageContainer>
  );
}

export default EndCall;
