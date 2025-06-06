import styled from 'styled-components';
import mobile1xBGPng from '../../img/bg/mobile-bg@1x.png';
import mobile2xBGPng from '../../img/bg/mobile-bg@2x.png';
import mobile1xBGWebp from '../../img/bg/mobile-bg@1x.webp';
import mobile2xBGWebp from '../../img/bg/mobile-bg@2x.webp';
import tablet1xBGPng from '../../img/bg/tablet-bg@1x.png';
import tablet2xBGPng from '../../img/bg/tablet-bg@2x.png';
import tablet1xBGWebp from '../../img/bg/tablet-bg@1x.webp';
import tablet2xBGWebp from '../../img/bg/tablet-bg@2x.webp';
import desktop1xBGPng from '../../img/bg/desktop-bg@1x.png';
import desktop2xBGPng from '../../img/bg/desktop-bg@2x.png';
import desktop1xBGWebp from '../../img/bg/desktop-bg@1x.webp';
import desktop2xBGWebp from '../../img/bg/desktop-bg@2x.webp';
// import mobile1xBGPng from '../../img/bg/ny-mobile-bg@1x.png';
// import mobile2xBGPng from '../../img/bg/ny-mobile-bg@2x.png';
// import mobile1xBGWebp from '../../img/bg/ny-mobile-bg@1x.webp';
// import mobile2xBGWebp from '../../img/bg/ny-mobile-bg@2x.webp';
// import tablet1xBGPng from '../../img/bg/ny-tablet-bg@1x.png';
// import tablet2xBGPng from '../../img/bg/ny-tablet-bg@2x.png';
// import tablet1xBGWebp from '../../img/bg/ny-tablet-bg@1x.webp';
// import tablet2xBGWebp from '../../img/bg/ny-tablet-bg@2x.webp';
// import desktop1xBGPng from '../../img/bg/ny-desktop-bg@1x.png';
// import desktop2xBGPng from '../../img/bg/ny-desktop-bg@2x.png';
// import desktop1xBGWebp from '../../img/bg/ny-desktop-bg@1x.webp';
// import desktop2xBGWebp from '../../img/bg/ny-desktop-bg@2x.webp';
// import mobile1xBGPng from '../../img/bg/e-mobile-bg@1x.png';
// import mobile2xBGPng from '../../img/bg/e-mobile-bg@2x.png';
// import mobile1xBGWebp from '../../img/bg/e-mobile-bg@1x.webp';
// import mobile2xBGWebp from '../../img/bg/e-mobile-bg@2x.webp';
// import tablet1xBGPng from '../../img/bg/e-tablet-bg@1x.png';
// import tablet2xBGPng from '../../img/bg/e-tablet-bg@2x.png';
// import tablet1xBGWebp from '../../img/bg/e-tablet-bg@1x.webp';
// import tablet2xBGWebp from '../../img/bg/e-tablet-bg@2x.webp';
// import desktop1xBGPng from '../../img/bg/e-desktop-bg@1x.png';
// import desktop2xBGPng from '../../img/bg/e-desktop-bg@2x.png';
// import desktop1xBGWebp from '../../img/bg/e-desktop-bg@1x.webp';
// import desktop2xBGWebp from '../../img/bg/e-desktop-bg@2x.webp';
import pedagogium1xBGPng from '../../img/bg/pedagogium-bg.png';
import pedagogium1xBGWebp from '../../img/bg/pedagogium-bg.webp';

export const BackgroundWrapper = styled.div`
  background-position: right -70px top 640px;
  background-image: image-set(
    url(${mobile1xBGWebp}) type('image/webp'),
    url(${mobile1xBGPng}) type('image/png')
  );
  background-size: 364px 359px;
  background-repeat: no-repeat;

  @media (min-device-pixel-ratio: 2), (min-resolution: 192dpi), (min-resolution: 2dppx) {
    background-image: image-set(
      url(${mobile2xBGWebp}) type('image/webp'),
      url(${mobile2xBGPng}) type('image/png')
    );
  }

  @media screen and (min-width: 768px) {
    background-position: center top 785px;
    background-image: image-set(
      url(${tablet1xBGWebp}) type('image/webp'),
      url(${tablet1xBGPng}) type('image/png')
    );
    background-size: 562px 554px;

    @media (min-device-pixel-ratio: 2),
      (min-resolution: 192dpi),
      (min-resolution: 2dppx) {
      background-image: image-set(
        url(${tablet2xBGWebp}) type('image/webp'),
        url(${tablet2xBGPng}) type('image/png')
      );
    }
  }

  @media screen and (min-width: 1280px) {
    background-position: left -215px top 725px;
    background-image: image-set(
      url(${desktop1xBGWebp}) type('image/webp'),
      url(${desktop1xBGPng}) type('image/png')
    );
    background-size: 760px 750px;

    @media (min-device-pixel-ratio: 2),
      (min-resolution: 192dpi),
      (min-resolution: 2dppx) {
      background-image: image-set(
        url(${desktop2xBGWebp}) type('image/webp'),
        url(${desktop2xBGPng}) type('image/png')
      );
    }
  }
`;

export const StreamsBackgroundWrapper = styled.div`
  font-family: var(--streams-font-family);

  height: 100vh;
  background-position: center top 0px;
  background-image: image-set(
    url(${mobile1xBGWebp}) type('image/webp'),
    url(${mobile1xBGPng}) type('image/png')
  );
  background-size: auto 50%;
  background-repeat: no-repeat;

  @media (min-device-pixel-ratio: 2), (min-resolution: 192dpi), (min-resolution: 2dppx) {
    background-image: image-set(
      url(${mobile2xBGWebp}) type('image/webp'),
      url(${mobile2xBGPng}) type('image/png')
    );
  }

  @media screen and (min-width: 768px) {
    background-position: center top 0px;
    background-image: image-set(
      url(${tablet1xBGWebp}) type('image/webp'),
      url(${tablet1xBGPng}) type('image/png')
    );
    background-size: auto 50%;

    @media (min-device-pixel-ratio: 2),
      (min-resolution: 192dpi),
      (min-resolution: 2dppx) {
      background-image: image-set(
        url(${tablet2xBGWebp}) type('image/webp'),
        url(${tablet2xBGPng}) type('image/png')
      );
    }
  }

  @media screen and (min-width: 1280px) {
    background-position: center top 0;
    background-image: image-set(
      url(${desktop1xBGWebp}) type('image/webp'),
      url(${desktop1xBGPng}) type('image/png')
    );
    background-size: auto 50%;

    @media (min-device-pixel-ratio: 2),
      (min-resolution: 192dpi),
      (min-resolution: 2dppx) {
      background-image: image-set(
        url(${desktop2xBGWebp}) type('image/webp'),
        url(${desktop2xBGPng}) type('image/png')
      );
    }
  }

  &.pedagogium {
    background-position: center top 20%;
    background-image: image-set(
      url(${pedagogium1xBGWebp}) type('image/webp'),
      url(${pedagogium1xBGPng}) type('image/png')
    );
    background-size: 240px 240px;
    background-repeat: no-repeat;

    @media (min-device-pixel-ratio: 2),
      (min-resolution: 192dpi),
      (min-resolution: 2dppx) {
      background-image: image-set(
        url(${pedagogium1xBGWebp}) type('image/webp'),
        url(${pedagogium1xBGPng}) type('image/png')
      );
    }

    @media screen and (min-width: 768px) {
      background-position: center top 20%;
      background-image: image-set(
        url(${pedagogium1xBGWebp}) type('image/webp'),
        url(${pedagogium1xBGPng}) type('image/png')
      );
      background-size: 240px 240px;

      @media (min-device-pixel-ratio: 2),
        (min-resolution: 192dpi),
        (min-resolution: 2dppx) {
        background-image: image-set(
          url(${pedagogium1xBGWebp}) type('image/webp'),
          url(${pedagogium1xBGPng}) type('image/png')
        );
      }
    }

    @media screen and (min-width: 1280px) {
      background-position: center top 20%;
      background-image: image-set(
        url(${pedagogium1xBGWebp}) type('image/webp'),
        url(${pedagogium1xBGPng}) type('image/png')
      );
      background-size: 240px 240px;

      @media (min-device-pixel-ratio: 2),
        (min-resolution: 192dpi),
        (min-resolution: 2dppx) {
        background-image: image-set(
          url(${pedagogium1xBGWebp}) type('image/webp'),
          url(${pedagogium1xBGPng}) type('image/png')
        );
      }
    }
  }
`;

export const LinkTreeBackgroundWrapper = styled.div`
  padding: 30px;
  font-family: var(--streams-font-family);
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-position: center top 0px;
  background-image: image-set(
    url(${mobile1xBGWebp}) type('image/webp'),
    url(${mobile1xBGPng}) type('image/png')
  );
  background-size: auto 50%;
  background-repeat: no-repeat;

  @media (min-device-pixel-ratio: 2), (min-resolution: 192dpi), (min-resolution: 2dppx) {
    background-image: image-set(
      url(${mobile2xBGWebp}) type('image/webp'),
      url(${mobile2xBGPng}) type('image/png')
    );
  }

  @media screen and (min-width: 768px) {
    padding: 40px;
    background-position: center top 0px;
    background-image: image-set(
      url(${tablet1xBGWebp}) type('image/webp'),
      url(${tablet1xBGPng}) type('image/png')
    );
    background-size: auto 50%;

    @media (min-device-pixel-ratio: 2),
      (min-resolution: 192dpi),
      (min-resolution: 2dppx) {
      background-image: image-set(
        url(${tablet2xBGWebp}) type('image/webp'),
        url(${tablet2xBGPng}) type('image/png')
      );
    }
  }

  @media screen and (min-width: 1280px) {
    padding: 50px;
    background-position: center top 0;
    background-image: image-set(
      url(${desktop1xBGWebp}) type('image/webp'),
      url(${desktop1xBGPng}) type('image/png')
    );
    background-size: auto 50%;

    @media (min-device-pixel-ratio: 2),
      (min-resolution: 192dpi),
      (min-resolution: 2dppx) {
      background-image: image-set(
        url(${desktop2xBGWebp}) type('image/webp'),
        url(${desktop2xBGPng}) type('image/png')
      );
    }
  }
`;
