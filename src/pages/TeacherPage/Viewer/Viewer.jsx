import axios from 'axios';
import { Loader } from 'components/SharedLayout/Loaders/Loader';
import { LoaderWrapper } from 'components/SharedLayout/Loaders/Loader.styled';
import {
  KahootExitFullScreenIcon,
  KahootFullScreenBtn,
  KahootFullScreenIcon,
} from 'components/Stream/Kahoots/Kahoots.styled';
import parse from 'html-react-parser';
import { useEffect, useState } from 'react';
import { ViewerBox } from './Viewer.styled';

export const Viewer = ({ isViewerOpen, isOpenedLast, sectionWidth, page }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [collection, setCollection] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  console.log(collection);
  console.log(page);
  collection &&
    collection.length &&
    collection.map(coll => console.log(coll[page]));

  const supportBoxStylesHandler = () => {
    return {
      zIndex: isOpenedLast === 'viewer' ? '4' : '1',
      width: isFullScreen ? sectionWidth : (sectionWidth / 10) * 4,
    };
  };

  useEffect(() => {
    document.title = `Teacher ${page.toLocaleUpperCase()} | AP Education`;

    const getCollectionsRequest = async () => {
      try {
        setIsLoading(isLoading => (isLoading = true));
        setCollection((await axios.get('/collections')).data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(isLoading => (isLoading = false));
      }
    };
    getCollectionsRequest();
  }, [page]);

  const toggleFullScreen = () => {
    setIsFullScreen(isFullScreen => (isFullScreen = !isFullScreen));
  };

  const collectionRefresher = async e => {
    if (e.target === e.currentTarget) {
      setCollection((await axios.get('/collections')).data);
    }
  };

  return (
    <>
      <ViewerBox
        className={isViewerOpen ? 'shown' : 'hidden'}
        style={{ ...supportBoxStylesHandler() }}
        onTransitionEnd={collectionRefresher}
      >
        <KahootFullScreenBtn onClick={toggleFullScreen}>
          {isFullScreen ? (
            <KahootExitFullScreenIcon />
          ) : (
            <KahootFullScreenIcon />
          )}
        </KahootFullScreenBtn>
        {collection &&
          collection.length &&
          collection.map(coll => parse(coll[page]))}
      </ViewerBox>
      {isLoading && (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      )}
    </>
  );
};
