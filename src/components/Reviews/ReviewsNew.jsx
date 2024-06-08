import { SectionTitleNew } from 'components/HowItWorks/HowItWorks.styled';
import { useInView } from 'react-intersection-observer';
import {
  ReviewsDescription,
  ReviewsSectionNew,
  ReviewsTitleBox,
} from './Reviews.styled';
import { ReviewsSwiper } from './ReviewsSwiper/ReviewsSwiper';

export const ReviewsNew = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  return (
    <ReviewsSectionNew id="reviews-anchor" ref={ref}>
      <ReviewsTitleBox>
        <SectionTitleNew>Відгуки</SectionTitleNew>
        <ReviewsDescription>
          Ми піклуємося про наших студентів, тому ми даруємо навчальний ноутбук
          для зручного доступу та комфортного навчання.
        </ReviewsDescription>
      </ReviewsTitleBox>
      {inView && <ReviewsSwiper />}
    </ReviewsSectionNew>
  );
};
