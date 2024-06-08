import Marquee from "react-fast-marquee";
import { styled } from "styled-components";

export const StyledMarquee = styled(Marquee)`
  margin: 0 auto;
  max-width: 100vw;
`;

export const MarqueeChild = styled.div`
  border-radius: 20px;
  overflow: hidden;
  margin-right: 30px;
`;

export const MarqueePicture = styled.picture`
  display: block;
`;

export const MarqueeImg = styled.img`
  width: 100%;
`;
