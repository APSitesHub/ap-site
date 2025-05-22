import axios from 'axios';
import { Loader } from 'components/SharedLayout/Loaders/Loader';
import { LoaderWrapper } from 'components/SharedLayout/Loaders/Loader.styled';
import {
  KahootExitFullScreenIcon,
  KahootFullScreenBtn,
  KahootFullScreenIcon,
} from 'components/Stream/Kahoots/Kahoots.styled';
import parse from 'html-react-parser';
import { useEffect, useRef, useState } from 'react';
import {
  ViewerBox,
  ViewerChooseLevelBtn,
  ViewerChooseLevelContainer,
} from './Viewer.styled';

export const ViewerIndividual = ({ isViewerOpen, isOpenedLast, sectionWidth, page }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [collection, setCollection] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [level, setLevel] = useState('');
  const lang = useRef(
    page === 'heinz' || page === 'doloka' || page === 'nakonechna' || page === 'lyasota'
      ? 'de'
      : 'en'
  );

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
      {!level ? (
        <ViewerBox
          className={isViewerOpen ? 'shown' : 'hidden'}
          style={{ ...supportBoxStylesHandler() }}
          onTransitionEnd={collectionRefresher}
        >
          <ViewerChooseLevelContainer>
            Моделі для якого рівня потрібно відкрити?
            <ViewerChooseLevelBtn
              onClick={level =>
                (level = setLevel(lang.current === 'en' ? 'a1free' : 'deutschfree'))
              }
            >
              A1
            </ViewerChooseLevelBtn>
            <ViewerChooseLevelBtn
              onClick={level =>
                (level = setLevel(lang.current === 'en' ? 'a1free' : 'deutscha2free'))
              }
            >
              A2
            </ViewerChooseLevelBtn>
            <ViewerChooseLevelBtn
              onClick={level =>
                (level = setLevel(lang.current === 'en' ? 'a1kidsfree' : 'dekidsfree'))
              }
            >
              A1 Діти
            </ViewerChooseLevelBtn>
          </ViewerChooseLevelContainer>
        </ViewerBox>
      ) : (
        <ViewerBox
          className={isViewerOpen ? 'shown' : 'hidden'}
          style={{ ...supportBoxStylesHandler() }}
          onTransitionEnd={collectionRefresher}
        >
          <KahootFullScreenBtn onClick={toggleFullScreen}>
            {isFullScreen ? <KahootExitFullScreenIcon /> : <KahootFullScreenIcon />}
          </KahootFullScreenBtn>
          {collection && collection.length && collection.map(coll => parse(coll[level]))}
        </ViewerBox>
      )}
      {isLoading && (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      )}
    </>
  );
};
