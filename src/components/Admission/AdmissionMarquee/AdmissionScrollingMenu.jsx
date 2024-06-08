import {
  MarqueeImg,
  MarqueeOverlay,
  MarqueeText,
  MarqueeChild,
  MarqueePicture,
} from 'components/Hero/HeroMarquee/HeroMarquee.styled';
import { StyledUpButton } from 'components/UpButton/UpButton.styled';
import { edCenterImgsIndex } from 'img/edcenter/edCenterImgs';
import { useContext, useState } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';

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

const cardItems = [
  {
    id: 0,
    title: 'Універ',
    picture: [
      {
        media: '(min-width:768px)',
        srcSet: `${edCenterMarquee1large1xwebp} 1x, ${edCenterMarquee1large2xwebp} 2x`,
        type: 'image/webp',
      },
      {
        media: '(min-width:768px)',
        srcSet: `${edCenterMarquee1large1xpng} 1x, ${edCenterMarquee1large2xpng} 2x`,
        type: 'image/png',
      },
      {
        media: '(max-width:768px)',
        srcSet: `${edCenterMarquee1small1xwebp} 1x, ${edCenterMarquee1small2xwebp} 2x`,
        type: 'image/webp',
      },
      {
        media: '(max-width:768px)',
        srcSet: `${edCenterMarquee1small1xpng} 1x, ${edCenterMarquee1small2xpng} 2x`,
        type: 'image/png',
      },
    ],
    img: {
      src: { edCenterMarquee1small1xpng },
      alt: 'Admission marquee placeholder',
    },
  },
  {
    id: 1,
    title: 'Ще універ',
    picture: [
      {
        media: '(min-width:768px)',
        srcSet: `${edCenterMarquee2large1xwebp} 1x, ${edCenterMarquee2large2xwebp} 2x`,
        type: 'image/webp',
      },
      {
        media: '(min-width:768px)',
        srcSet: `${edCenterMarquee2large1xpng} 1x, ${edCenterMarquee2large2xpng} 2x`,
        type: 'image/png',
      },
      {
        media: '(max-width:768px)',
        srcSet: `${edCenterMarquee2small1xwebp} 1x, ${edCenterMarquee2small2xwebp} 2x`,
        type: 'image/webp',
      },
      {
        media: '(max-width:768px)',
        srcSet: `${edCenterMarquee2small1xpng} 1x, ${edCenterMarquee2small2xpng} 2x`,
        type: 'image/png',
      },
    ],
    img: {
      src: { edCenterMarquee2small1xpng },
      alt: 'Admission marquee placeholder',
    },
  },
  {
    id: 2,
    title: 'Ще один універ',
    picture: [
      {
        media: '(min-width:768px)',
        srcSet: `${edCenterMarquee3large1xwebp} 1x, ${edCenterMarquee3large2xwebp} 2x`,
        type: 'image/webp',
      },
      {
        media: '(min-width:768px)',
        srcSet: `${edCenterMarquee3large1xpng} 1x, ${edCenterMarquee3large2xpng} 2x`,
        type: 'image/png',
      },
      {
        media: '(max-width:768px)',
        srcSet: `${edCenterMarquee3small1xwebp} 1x, ${edCenterMarquee3small2xwebp} 2x`,
        type: 'image/webp',
      },
      {
        media: '(max-width:768px)',
        srcSet: `${edCenterMarquee3small1xpng} 1x, ${edCenterMarquee3small2xpng} 2x`,
        type: 'image/png',
      },
    ],
    img: {
      src: { edCenterMarquee3small1xpng },
      alt: 'Admission marquee placeholder',
    },
  },
  {
    id: 3,
    title: 'Передостанній універ',
    picture: [
      {
        media: '(min-width:768px)',
        srcSet: `${edCenterMarquee4large1xwebp} 1x, ${edCenterMarquee4large2xwebp} 2x`,
        type: 'image/webp',
      },
      {
        media: '(min-width:768px)',
        srcSet: `${edCenterMarquee4large1xpng} 1x, ${edCenterMarquee4large2xpng} 2x`,
        type: 'image/png',
      },
      {
        media: '(max-width:768px)',
        srcSet: `${edCenterMarquee4small1xwebp} 1x, ${edCenterMarquee4small2xwebp} 2x`,
        type: 'image/webp',
      },
      {
        media: '(max-width:768px)',
        srcSet: `${edCenterMarquee4small1xpng} 1x, ${edCenterMarquee4small2xpng} 2x`,
        type: 'image/png',
      },
    ],
    img: {
      src: { edCenterMarquee4small1xpng },
      alt: 'Admission marquee placeholder',
    },
  },
  {
    id: 4,
    title: 'Останній універ',
    picture: [
      {
        media: '(min-width:768px)',
        srcSet: `${edCenterMarquee5large1xwebp} 1x, ${edCenterMarquee5large2xwebp} 2x`,
        type: 'image/webp',
      },
      {
        media: '(min-width:768px)',
        srcSet: `${edCenterMarquee5large1xpng} 1x, ${edCenterMarquee5large2xpng} 2x`,
        type: 'image/png',
      },
      {
        media: '(max-width:768px)',
        srcSet: `${edCenterMarquee5small1xwebp} 1x, ${edCenterMarquee5small2xwebp} 2x`,
        type: 'image/webp',
      },
      {
        media: '(max-width:768px)',
        srcSet: `${edCenterMarquee5small1xpng} 1x, ${edCenterMarquee5small2xpng} 2x`,
        type: 'image/png',
      },
    ],
    img: {
      src: { edCenterMarquee5small1xpng },
      alt: 'Admission marquee placeholder',
    },
  },
];

export const ScrollableMenu = () => {
  // eslint-disable-next-line
  const [items, _] = useState(cardItems);
  const [selected, setSelected] = useState([]);

  const isItemSelected = id => !!selected.find(el => el === id);

  const handleClick =
    id =>
    ({ getItemById, scrollToItem }) => {
      const itemSelected = isItemSelected(id);

      setSelected(currentSelected =>
        itemSelected
          ? currentSelected.filter(el => el !== id)
          : currentSelected.concat(id)
      );
    };

  return (
    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
      {items.map(({ id, title, picture, img: { src, alt } }) => (
        <Card
          key={id}
          itemId={id} // NOTE: itemId is required for track items
          title={title}
          onClick={handleClick(id)}
          selected={isItemSelected(id)}
        >
          <MarqueeChild style={{ width: '211px', height: '321px' }}>
            <MarqueeOverlay>
              <MarqueeText>{title}</MarqueeText>
            </MarqueeOverlay>
            <MarqueePicture>
              {picture.map(({ media, srcSet, type }) => (
                <source media={media} srcSet={srcSet} type={type} />
              ))}
              <MarqueeImg src={src} alt={alt} />
            </MarqueePicture>
          </MarqueeChild>
        </Card>
      ))}
    </ScrollMenu>
  );
};

function LeftArrow() {
  const { isFirstItemVisible, scrollPrev } = useContext(VisibilityContext);

  return (
    <Arrow
      disabled={isFirstItemVisible}
      onClick={() => scrollPrev()}
      style={{ position: 'absolute', top: 'center', left: '5px' }}
    >
      {'<'}
    </Arrow>
  );
}

function RightArrow() {
  const { isLastItemVisible, scrollNext } = useContext(VisibilityContext);

  return (
    <Arrow
      disabled={isLastItemVisible}
      onClick={() => scrollNext()}
      style={{ position: 'absolute', top: 'center', right: '5px' }}
    >
      {'>'}
    </Arrow>
  );
}

function Arrow({ children, disabled, onClick }) {
  return (
    <StyledUpButton
      disabled={disabled}
      onClick={onClick}
      style={{
        cursor: 'pointer',
        position: 'absolute',
        opacity: disabled ? '0' : '1',
        userSelect: 'none',
      }}
    >
      {children}
    </StyledUpButton>
  );
}

function Card({ children, onClick, selected, title, itemId }) {
  const visibility = useContext(VisibilityContext);

  return (
    <div onClick={() => onClick(visibility)} tabIndex={0}>
      <div>{children}</div>
    </div>
  );
}
