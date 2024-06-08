import {
  MarqueeChild,
  MarqueeImg,
  MarqueeOverlay,
  MarqueePicture,
  MarqueeText,
  StyledMarquee,
} from 'components/Hero/HeroMarquee/HeroMarquee.styled';
import { edCenterImgsIndex } from '../../../img/edcenter/edCenterImgs';

const {
  edCenterMarquee1large1xpng,
  edCenterMarquee1large1xwebp,
  edCenterMarquee1large2xpng,
  edCenterMarquee1large2xwebp,
  edCenterMarquee2large1xpng,
  edCenterMarquee2large1xwebp,
  edCenterMarquee2large2xpng,
  edCenterMarquee2large2xwebp,
  edCenterMarquee3large1xpng,
  edCenterMarquee3large1xwebp,
  edCenterMarquee3large2xpng,
  edCenterMarquee3large2xwebp,
  edCenterMarquee4large1xpng,
  edCenterMarquee4large1xwebp,
  edCenterMarquee4large2xpng,
  edCenterMarquee4large2xwebp,
  edCenterMarquee5large1xpng,
  edCenterMarquee5large1xwebp,
  edCenterMarquee5large2xpng,
  edCenterMarquee5large2xwebp,
  edCenterMarquee1small1xpng,
  edCenterMarquee1small1xwebp,
  edCenterMarquee1small2xpng,
  edCenterMarquee1small2xwebp,
  edCenterMarquee2small1xpng,
  edCenterMarquee2small1xwebp,
  edCenterMarquee2small2xpng,
  edCenterMarquee2small2xwebp,
  edCenterMarquee3small1xpng,
  edCenterMarquee3small1xwebp,
  edCenterMarquee3small2xpng,
  edCenterMarquee3small2xwebp,
  edCenterMarquee4small1xpng,
  edCenterMarquee4small1xwebp,
  edCenterMarquee4small2xpng,
  edCenterMarquee4small2xwebp,
  edCenterMarquee5small1xpng,
  edCenterMarquee5small1xwebp,
  edCenterMarquee5small2xpng,
  edCenterMarquee5small2xwebp,
} = edCenterImgsIndex;

export const AdmissionMarquee = () => {
  return (
    <StyledMarquee autoFill={true} pauseOnHover={true}>
      <MarqueeChild>
        <MarqueeOverlay>
          <MarqueeText>Універ</MarqueeText>
        </MarqueeOverlay>
        <MarqueePicture>
          <source
            media="(min-width:768px)"
            srcSet={`${edCenterMarquee1large1xwebp} 1x, ${edCenterMarquee1large2xwebp} 2x`}
            type="image/webp"
          />
          <source
            media="(min-width:768px)"
            srcSet={`${edCenterMarquee1large1xpng} 1x, ${edCenterMarquee1large2xpng} 2x`}
            type="image/png"
          />
          <source
            media="(max-width:767px)"
            srcSet={`${edCenterMarquee1small1xwebp} 1x, ${edCenterMarquee1small2xwebp} 2x`}
            type="image/webp"
          />
          <source
            media="(max-width:767px)"
            srcSet={`${edCenterMarquee1small1xpng} 1x, ${edCenterMarquee1small2xpng} 2x`}
            type="image/png"
          />
          <MarqueeImg
            src={edCenterMarquee1small1xpng}
            alt="Admission marquee placeholder"
          />
        </MarqueePicture>
      </MarqueeChild>

      <MarqueeChild>
        <MarqueeOverlay>
          <MarqueeText>Ще універ</MarqueeText>
        </MarqueeOverlay>
        <MarqueePicture>
          <source
            media="(min-width:768px)"
            srcSet={`${edCenterMarquee2large1xwebp} 1x, ${edCenterMarquee2large2xwebp} 2x`}
            type="image/webp"
          />
          <source
            media="(min-width:768px)"
            srcSet={`${edCenterMarquee2large1xpng} 1x, ${edCenterMarquee2large2xpng} 2x`}
            type="image/png"
          />
          <source
            media="(max-width:767px)"
            srcSet={`${edCenterMarquee2small1xwebp} 1x, ${edCenterMarquee2small2xwebp} 2x`}
            type="image/webp"
          />
          <source
            media="(max-width:767px)"
            srcSet={`${edCenterMarquee2small1xpng} 1x, ${edCenterMarquee2small2xpng} 2x`}
            type="image/png"
          />
          <MarqueeImg
            src={edCenterMarquee2small1xpng}
            alt="Admission marquee placeholder"
          />
        </MarqueePicture>
      </MarqueeChild>

      <MarqueeChild>
        <MarqueeOverlay>
          <MarqueeText>Ще один універ</MarqueeText>
        </MarqueeOverlay>
        <MarqueePicture>
          <source
            media="(min-width:768px)"
            srcSet={`${edCenterMarquee3large1xwebp} 1x, ${edCenterMarquee3large2xwebp} 2x`}
            type="image/webp"
          />
          <source
            media="(min-width:768px)"
            srcSet={`${edCenterMarquee3large1xpng} 1x, ${edCenterMarquee3large2xpng} 2x`}
            type="image/png"
          />
          <source
            media="(max-width:767px)"
            srcSet={`${edCenterMarquee3small1xwebp} 1x, ${edCenterMarquee3small2xwebp} 2x`}
            type="image/webp"
          />
          <source
            media="(max-width:767px)"
            srcSet={`${edCenterMarquee3small1xpng} 1x, ${edCenterMarquee3small2xpng} 2x`}
            type="image/png"
          />
          <MarqueeImg
            src={edCenterMarquee3small1xpng}
            alt="Admission marquee placeholder"
          />
        </MarqueePicture>
      </MarqueeChild>

      <MarqueeChild>
        <MarqueeOverlay>
          <MarqueeText>Передостанній універ</MarqueeText>
        </MarqueeOverlay>
        <MarqueePicture>
          <source
            media="(min-width:768px)"
            srcSet={`${edCenterMarquee4large1xwebp} 1x, ${edCenterMarquee4large2xwebp} 2x`}
            type="image/webp"
          />
          <source
            media="(min-width:768px)"
            srcSet={`${edCenterMarquee4large1xpng} 1x, ${edCenterMarquee4large2xpng} 2x`}
            type="image/png"
          />
          <source
            media="(max-width:767px)"
            srcSet={`${edCenterMarquee4small1xwebp} 1x, ${edCenterMarquee4small2xwebp} 2x`}
            type="image/webp"
          />
          <source
            media="(max-width:767px)"
            srcSet={`${edCenterMarquee4small1xpng} 1x, ${edCenterMarquee4small2xpng} 2x`}
            type="image/png"
          />
          <MarqueeImg
            src={edCenterMarquee4small1xpng}
            alt="Admission marquee placeholder"
          />
        </MarqueePicture>
      </MarqueeChild>

      <MarqueeChild>
        <MarqueeOverlay>
          <MarqueeText>Останній універ</MarqueeText>
        </MarqueeOverlay>
        <MarqueePicture>
          <source
            media="(min-width:768px)"
            srcSet={`${edCenterMarquee5large1xwebp} 1x, ${edCenterMarquee5large2xwebp} 2x`}
            type="image/webp"
          />
          <source
            media="(min-width:768px)"
            srcSet={`${edCenterMarquee5large1xpng} 1x, ${edCenterMarquee5large2xpng} 2x`}
            type="image/png"
          />
          <source
            media="(max-width:767px)"
            srcSet={`${edCenterMarquee5small1xwebp} 1x, ${edCenterMarquee5small2xwebp} 2x`}
            type="image/webp"
          />
          <source
            media="(max-width:767px)"
            srcSet={`${edCenterMarquee5small1xpng} 1x, ${edCenterMarquee5small2xpng} 2x`}
            type="image/png"
          />
          <MarqueeImg
            src={edCenterMarquee5small1xpng}
            alt="Admission marquee placeholder"
          />
        </MarqueePicture>
      </MarqueeChild>
    </StyledMarquee>
  );
};
