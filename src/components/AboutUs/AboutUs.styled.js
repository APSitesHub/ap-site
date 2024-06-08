import styled from 'styled-components';

export const VideoLimiter = styled.div`
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 640px;
  margin-bottom: 13px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 10px 10px 30px 0px rgba(0, 0, 0, 0.25);

  @media screen and (min-width: 768px) {
    max-width: 960px;
    margin: 0;
  }
  @media screen and (min-width: 1280px) {
    max-width: 1280px;
  }
`;

export const Video = styled.video`
  display: block;
  width: 100%;
`;

export const VideoBox = styled.div`
  position: relative;
  padding-top: 56.25%;
  border-radius: 20px;
  overflow: hidden;
`;
