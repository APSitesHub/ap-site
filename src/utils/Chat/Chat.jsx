import { useState } from 'react';
import { ThemeProvider, Toggle } from 'react-hook-theme';
import 'react-hook-theme/dist/styles/style.css';
import { useLocation } from 'react-router-dom';
import {
  ChatContainer,
  ChatHeader,
  ChatHeaderLogo,
  ChatHeading,
  ToggleContainer,
} from './Chat.styled';
import { ChatBody } from './ChatBody';
import { ChatFooter } from './ChatFooter';

export const Chat = ({ socket, messages, isChatOpen, currentUser }) => {
  const [theme, setTheme] = useState('auto');
  const location = useLocation();

  const handleThemeClick = () => {
    const themeFromStorage = localStorage.getItem('rht-theme');
    console.log(themeFromStorage);
    setTheme(theme => (theme = themeFromStorage));
  };

  return (
    <ThemeProvider
      options={{
        theme: 'dark',
        save: true,
      }}
    >
      <ChatContainer className={location.pathname.includes('polskia0_2') && 'nologo'}>
        <ChatHeader>
          <ChatHeading>
            <ChatHeaderLogo />{' '}
            {location.pathname.includes('polskia0_2') ? 'Lesson Chat' : 'AP Open Chat'}
          </ChatHeading>
          <ToggleContainer onClick={handleThemeClick}>
            <Toggle />
          </ToggleContainer>
        </ChatHeader>
        <ChatBody socket={socket} messages={messages} isChatOpen={isChatOpen} />
        <ChatFooter socket={socket} theme={theme} currentUser={currentUser} />
      </ChatContainer>
    </ThemeProvider>
  );
};
