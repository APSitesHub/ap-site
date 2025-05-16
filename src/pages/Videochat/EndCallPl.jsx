import { PageContainer, LargeText, GradientBackground } from './Videochat.styled';
import { useEffect } from 'react';

function EndCall() {
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
        <LargeText>Dziękuję za uwagę!</LargeText>
      </GradientBackground>
    </PageContainer>
  );
}

export default EndCall;
