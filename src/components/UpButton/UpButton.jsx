import useSize from '@react-hook/size';
import { StyledUpButton, UpArrow } from './UpButton.styled';
import { useLocation } from 'react-router-dom';

export const UpButton = () => {
  // eslint-disable-next-line
  const [width, _] = useSize(document.body);
  const location = useLocation().pathname;

  const props =
    width < 768
      ? { spy: true, smooth: true, offset: -73 }
      : { spy: true, smooth: true };

  const strokeColor = location.includes('school')
    ? '#924DFF'
    : location.includes('university')
    ? '#352CE8'
    : '#0f645b';

  return (
    <StyledUpButton to="hero" {...props}>
      <UpArrow style={{ color: strokeColor }} />
    </StyledUpButton>
  );
};
