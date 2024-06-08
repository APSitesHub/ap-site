import styled from 'styled-components';
import invertedMobile1xBGPng from '../../img/bg/mobile-bg-inv@1x.png';
import invertedMobile2xBGPng from '../../img/bg/mobile-bg-inv@2x.png';
import invertedMobile1xBGWebp from '../../img/bg/mobile-bg-inv@1x.webp';
import invertedMobile2xBGWebp from '../../img/bg/mobile-bg-inv@2x.webp';
import invertedTablet1xBGPng from '../../img/bg/tablet-bg-inv@1x.png';
import invertedTablet2xBGPng from '../../img/bg/tablet-bg-inv@2x.png';
import invertedTablet1xBGWebp from '../../img/bg/tablet-bg-inv@1x.webp';
import invertedTablet2xBGWebp from '../../img/bg/tablet-bg-inv@2x.webp';
import invertedDesktop1xBGPng from '../../img/bg/desktop-bg-inv@1x.png';
import invertedDesktop2xBGPng from '../../img/bg/desktop-bg-inv@2x.png';
import invertedDesktop1xBGWebp from '../../img/bg/desktop-bg-inv@1x.webp';
import invertedDesktop2xBGWebp from '../../img/bg/desktop-bg-inv@2x.webp';


export const InvertedBackgroundWrapper = styled.div`
  background-position: right -70px top 640px;
  background-image: image-set(
    url(${invertedMobile1xBGWebp}) type('image/webp'),
    url(${invertedMobile1xBGPng}) type('image/png')
  );
  background-color: var(--main-color);
  background-size: 364px 359px;
  background-repeat: no-repeat;

  @media (min-device-pixel-ratio: 2),
    (min-resolution: 192dpi),
    (min-resolution: 2dppx) {
    background-image: image-set(
      url(${invertedMobile2xBGWebp}) type('image/webp'),
      url(${invertedMobile2xBGPng}) type('image/png')
    );
  }

  @media screen and (min-width: 768px) {
    background-position: center top 785px;
    background-image: image-set(
      url(${invertedTablet1xBGWebp}) type('image/webp'),
      url(${invertedTablet1xBGPng}) type('image/png')
    );
    background-size: 562px 554px;

    @media (min-device-pixel-ratio: 2),
      (min-resolution: 192dpi),
      (min-resolution: 2dppx) {
      background-image: image-set(
        url(${invertedTablet2xBGWebp}) type('image/webp'),
        url(${invertedTablet2xBGPng}) type('image/png')
      );
    }
  }

  @media screen and (min-width: 1280px) {
    background-position: left -215px top 725px;
    background-image: image-set(
      url(${invertedDesktop1xBGWebp}) type('image/webp'),
      url(${invertedDesktop1xBGPng}) type('image/png')
    );
    background-size: 760px 750px;

    @media (min-device-pixel-ratio: 2),
      (min-resolution: 192dpi),
      (min-resolution: 2dppx) {
      background-image: image-set(
        url(${invertedDesktop2xBGWebp}) type('image/webp'),
        url(${invertedDesktop2xBGPng}) type('image/png')
      );
    }
  }
`;