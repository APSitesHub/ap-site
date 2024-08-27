import axios from 'axios';
import { Loader } from 'components/SharedLayout/Loaders/Loader';
import { LoaderWrapper } from 'components/SharedLayout/Loaders/Loader.styled';
import {
  KahootExitFullScreenIcon,
  KahootFullScreenIcon
} from 'components/Stream/Kahoots/Kahoots.styled';
import parse from 'html-react-parser';
import { useEffect, useState } from 'react';
import { ViewerBoxVertical, ViewerFullScreenBtn } from './Viewer.styled';

export const ViewerVertical = ({ isViewerOpen, isOpenedLast, page }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [collection, setCollection] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const supportBoxStylesHandler = () => {
    return {
      zIndex: isOpenedLast === 'viewer' ? '4' : '1',
      height: isFullScreen && '100%',
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
      <ViewerBoxVertical
        className={isViewerOpen ? 'shown' : 'hidden'}
        style={{ ...supportBoxStylesHandler() }}
        onTransitionEnd={collectionRefresher}
      >
        <ViewerFullScreenBtn onClick={toggleFullScreen} className={isFullScreen && 'fullscreen-on'}>
          {isFullScreen ? (
            <KahootExitFullScreenIcon />
          ) : (
            <KahootFullScreenIcon />
          )}
        </ViewerFullScreenBtn>
        {collection &&
          collection.length &&
          collection.map(coll => parse(coll[page]))}
      </ViewerBoxVertical>
      {isLoading && (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      )}
    </>
  );
};
