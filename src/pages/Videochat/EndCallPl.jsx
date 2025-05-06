import { useNavigate } from 'react-router-dom';
import { PageContainer, LargeText, GradientBackground } from './Videochat.styled';

function EndCall() {
  return (
    <PageContainer>
      <GradientBackground>
        <LargeText>Dziękuję za uwagę!</LargeText>
      </GradientBackground>
    </PageContainer>
  );
}

export default EndCall;
