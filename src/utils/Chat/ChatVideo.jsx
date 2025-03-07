import { useState } from 'react';
import { ThemeProvider, Toggle } from 'react-hook-theme';
import 'react-hook-theme/dist/styles/style.css';
import {
  ChatContainer,
  ChatHeader,
  ChatHeaderLogo,
  ChatHeading,
  ToggleContainer
} from './Chat.styled';
import { ChatVideoBody } from './ChatVideoBody';
import { ChatVideoFooter } from './ChatVideoFooter';

export const ChatVideo = ({ socket, messages, isChatOpen, currentUser }) => {
  const [theme, setTheme] = useState('auto');

  console.log(17, socket);

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
      <ChatContainer>
        <ChatHeader>
          <ChatHeading>
            <ChatHeaderLogo />
            AP Chat
          </ChatHeading>
          <ToggleContainer onClick={handleThemeClick}>
            <Toggle />
          </ToggleContainer>
        </ChatHeader>
        <ChatVideoBody
          socket={socket}
          messages={messages}
          isChatOpen={isChatOpen}
          currentUser={currentUser}
        />
        <ChatVideoFooter socket={socket} theme={theme} currentUser={currentUser} />
      </ChatContainer>
    </ThemeProvider>
  );
};
