import {
  KahootExitFullScreenIcon,
  KahootFullScreenBtn,
  KahootFullScreenIcon,
} from 'components/Stream/Kahoots/Kahoots.styled';
import parse from 'html-react-parser';
import { ViewerBox } from './Viewer.styled';
import { useState } from 'react';

export const Viewer = ({
  isViewerOpen,
  isOpenedLast,
  sectionWidth,
  collection,
  page,
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  console.log(collection);
  console.log(page);
  collection.map(coll => console.log((coll[page])))

  const supportBoxStylesHandler = () => {
    return {
      zIndex: isOpenedLast === 'viewer' ? '4' : '1',
      width: isFullScreen ? sectionWidth : (sectionWidth / 10) * 4,
    };
  };

  const toggleFullScreen = () => {
    setIsFullScreen(isFullScreen => (isFullScreen = !isFullScreen));
  };

  return (
    <>
      <ViewerBox
        className={isViewerOpen ? 'shown' : 'hidden'}
        style={{ ...supportBoxStylesHandler() }}
      >
        <KahootFullScreenBtn onClick={toggleFullScreen}>
          {isFullScreen ? (
            <KahootExitFullScreenIcon />
          ) : (
            <KahootFullScreenIcon />
          )}
        </KahootFullScreenBtn>
        {collection.map(coll => parse(coll[page]))}
        {/* <iframe
          src="https://sketchfab.com/playlists/embed?collection=50a0ac28542842fba993aea82915bfa1&autostart=0"
          title="CARS 3D MODELS"
          frameborder="0"
          allowfullscreen
          mozallowfullscreen="true"
          webkitallowfullscreen="true"
          allow="autoplay; fullscreen; xr-spatial-tracking"
          xr-spatial-tracking
          execution-while-out-of-viewport
          execution-while-not-rendered
          web-share
          width="100%"
          height="100%"
        ></iframe> */}
        {/* <iframe
          id="platform-window"
          title="platform-pin"
          src="https://online.ap.education/school/"
          width="100%"
          height="100%"
        ></iframe> */}
        {/* <iframe
          title="Black Pig"
          width="100%"
          height="100%"
          frameborder="0"
          allowfullscreen
          mozallowfullscreen="true"
          webkitallowfullscreen="true"
          allow="autoplay; fullscreen; xr-spatial-tracking"
          xr-spatial-tracking
          execution-while-out-of-viewport
          execution-while-not-rendered
          web-share
          src="https://sketchfab.com/models/4fc11b4aede6413d896f5a18a8f7be1e/embed"
        >
          {' '}
        </iframe> */}
        {/* <iframe
        
          src="https://sketchfab.com/playlists/embed?collection=b19c00a349844cba916832e24f4e9812&autostart=0"
          title="Realistic Food 3D Models"
          frameborder="0"
          allowfullscreen
          mozallowfullscreen="true"
          webkitallowfullscreen="true"
          allow="autoplay; fullscreen; xr-spatial-tracking"
          xr-spatial-tracking
          execution-while-out-of-viewport
          execution-while-not-rendered
          web-share
        ></iframe> */}
      </ViewerBox>
    </>
  );
};
