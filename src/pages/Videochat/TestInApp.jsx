import Bowser from 'bowser';
import InAppSpy from 'inapp-spy';
import { Outlet } from 'react-router-dom';
import {
  GradientBackground,
  LargeText,
  LinkBase,
  PageContainer,
} from './Videochat.styled';
import { AdminFormBtn } from 'pages/Streams/AdminPanel/AdminPanel.styled';
import { useEffect, useState } from 'react';

function TestInApp() {
  const [{ isInApp }] = useState(() => InAppSpy());
  const [os, setOs] = useState();

  useEffect(() => {
    const sys = Bowser.getParser(window.navigator.userAgent).getOS().name.toLowerCase();
    setOs(sys);
  }, []);

  if (!isInApp) {
    return <Outlet />;
  }

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
          <LargeText>Для коректної роботи відеозв'язку перейдіть в браузер</LargeText>
          {os === 'ios' ? (
            <>
              <AdminFormBtn>
                <LinkBase
                  href={`googlechromes://${window.location.href.split('://')[1]}`}
                  target="_blank"
                >
                  Відкрити в Chrome
                </LinkBase>
              </AdminFormBtn>

              <AdminFormBtn>
                <LinkBase
                  href={`x-safari-https://${window.location.href.split('://')[1]}`}
                  target="_blank"
                >
                  Відкрити в Safari
                </LinkBase>
              </AdminFormBtn>
            </>
          ) : (
            <AdminFormBtn>
              <LinkBase
                href={`intent://${
                  window.location.href.split('://')[1]
                }#Intent;scheme=https;end`}
                target="_blank"
              >
                Відкрити в браузері
              </LinkBase>
            </AdminFormBtn>
          )}
        </div>
      </GradientBackground>
    </PageContainer>
  );
}

export default TestInApp;
