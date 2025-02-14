import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  APPanel,
  APPanelBtn,
  PanelBackdrop,
  PanelHideLeftSwitch,
  PanelHideRightSwitch,
  PanelHideSwitch,
} from '../../MyAP/MyAPPanel/MyAPPanel.styled';
import { CameraIcon } from 'pages/Videochat/Videochat.styled';

const TeacherAPPanel = () => {
  const navigate = useNavigate();
  const [isBackdropShown, setIsBackdropShown] = useState(false);
  const [isButtonBoxShown, setIsButtonBoxShown] = useState(false);

  const toggleButtonBox = () => {
    hideBackdrop();
    setIsButtonBoxShown(isShown => !isShown);
  };

  const hideBackdrop = () => {
    setIsBackdropShown(false);
  };

  return (
    <>
      <PanelBackdrop className={isBackdropShown ? '' : 'hidden'} />

      <PanelHideSwitch id="no-transform" onClick={toggleButtonBox}>
        {isButtonBoxShown ? <PanelHideRightSwitch /> : <PanelHideLeftSwitch />}
      </PanelHideSwitch>

      <APPanel
        className={isButtonBoxShown ? '' : 'hidden'}
        style={{ top: '129px', minHeight: '128px' }}
      >
        <APPanelBtn
          onClick={() => {
            navigate('../videochat');
          }}
        >
          <CameraIcon $isGray />
        </APPanelBtn>
      </APPanel>
    </>
  );
};

export default TeacherAPPanel;
