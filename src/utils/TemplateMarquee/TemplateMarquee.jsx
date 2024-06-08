import { heroImgsIndex } from 'img/hero/heroImgs';
import {
  MarqueeChild,
  MarqueeImg,
  MarqueePicture,
  StyledMarquee,
} from './TemplateMarquee.styled';

const {
  heroMarquee1x1png,
  heroMarquee1x1webp,
  heroMarquee2x1png,
  heroMarquee2x1webp,
  heroMarquee1x2png,
  heroMarquee1x2webp,
  heroMarquee2x2png,
  heroMarquee2x2webp,
  heroMarquee1x3png,
  heroMarquee1x3webp,
  heroMarquee2x3png,
  heroMarquee2x3webp,
  heroMarquee1x4png,
  heroMarquee1x4webp,
  heroMarquee2x4png,
  heroMarquee2x4webp,
  heroMarquee1x5png,
  heroMarquee1x5webp,
  heroMarquee2x5png,
  heroMarquee2x5webp,
} = heroImgsIndex;

export const TemplateMarquee = () => {
  return (
    <StyledMarquee autoFill={true} pauseOnHover={true}>
      <MarqueeChild>
        <MarqueePicture>
          <source
            media="(min-width:1280px)"
            srcSet={`${heroMarquee1x1webp} 1x, ${heroMarquee2x1webp} 2x`}
            type="image/webp"
          />
          <source
            media="(min-width:1280px)"
            srcSet={`${heroMarquee1x1png} 1x, ${heroMarquee2x1png} 2x`}
            type="image/png"
          />
          <MarqueeImg src={heroMarquee1x1png} alt="Hero marquee placeholder" />
        </MarqueePicture>
        {/* <video
              src="https://res.cloudinary.com/superlist/video/upload/c_scale,q_auto:good,w_700/v1653395875/website/mini%20cards/v2/Animation_nk2ydp.mp4"
              type="video/mp4"
              width={'500px'}
              style={{ display: 'block' }}
              autoPlay={true}
              loop={true}
              muted={true}
              data-loaded={true}
            ></video> */}
      </MarqueeChild>

      <MarqueeChild>
        <MarqueePicture>
          <source
            media="(min-width:1280px)"
            srcSet={`${heroMarquee1x2webp} 1x, ${heroMarquee2x2webp} 2x`}
            type="image/webp"
          />
          <source
            media="(min-width:1280px)"
            srcSet={`${heroMarquee1x2png} 1x, ${heroMarquee2x2png} 2x`}
            type="image/png"
          />
          <MarqueeImg src={heroMarquee1x2png} alt="Hero marquee placeholder" />
        </MarqueePicture>
      </MarqueeChild>

      <MarqueeChild>
        <MarqueePicture>
          <source
            media="(min-width:1280px)"
            srcSet={`${heroMarquee1x3webp} 1x, ${heroMarquee2x3webp} 2x`}
            type="image/webp"
          />
          <source
            media="(min-width:1280px)"
            srcSet={`${heroMarquee1x3png} 1x, ${heroMarquee2x3png} 2x`}
            type="image/png"
          />
          <MarqueeImg src={heroMarquee1x3png} alt="Hero marquee placeholder" />
        </MarqueePicture>
      </MarqueeChild>

      <MarqueeChild>
        <MarqueePicture>
          <source
            media="(min-width:1280px)"
            srcSet={`${heroMarquee1x4webp} 1x, ${heroMarquee2x4webp} 2x`}
            type="image/webp"
          />
          <source
            media="(min-width:1280px)"
            srcSet={`${heroMarquee1x4png} 1x, ${heroMarquee2x4png} 2x`}
            type="image/png"
          />
          <MarqueeImg src={heroMarquee1x4png} alt="Hero marquee placeholder" />
        </MarqueePicture>
      </MarqueeChild>

      <MarqueeChild>
        <MarqueePicture>
          <source
            media="(min-width:1280px)"
            srcSet={`${heroMarquee1x5webp} 1x, ${heroMarquee2x5webp} 2x`}
            type="image/webp"
          />
          <source
            media="(min-width:1280px)"
            srcSet={`${heroMarquee1x5png} 1x, ${heroMarquee2x5png} 2x`}
            type="image/png"
          />
          <MarqueeImg src={heroMarquee1x5png} alt="Hero marquee placeholder" />
        </MarqueePicture>
      </MarqueeChild>
    </StyledMarquee>
  );
};
