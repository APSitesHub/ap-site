import styled from 'styled-components';
import hostKahootBG from '../../../img/bg/host-kahoot-panel.png';

export const HostAdminPanelSection = styled.section`
  height: max-content;
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  background-image: url(${hostKahootBG});
  background-size: 33% 100%;
  background-repeat: repeat;
`;
