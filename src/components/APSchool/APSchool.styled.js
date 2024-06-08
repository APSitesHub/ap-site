import styled from 'styled-components';
import { ReactComponent as SchoolStarIcon } from '../../img/svg/heroSchoolStar.svg';

export const APSchoolSection = styled.section`
  position: relative;
  padding: 50px 20px 0 20px;

  @media screen and (min-width: 768px) {
    padding: 100px 40px 0 40px;
  }

  @media screen and (min-width: 1280px) {
    padding: 60px;
    padding-top: 150px;
    padding-bottom: 0;
  }
`;

export const APSchoolWrapper = styled.div`
  position: relative;
  margin: 0 auto;
  margin-bottom: 32px;
  max-width: 1280px;

  @media screen and (min-width: 768px) {
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
  }

  @media screen and (min-width: 1280px) {
    flex-direction: column;
    /* flex-grow: 0; */
    gap: 40px;
    margin: 0;
    width: 351px;
  }
`;

export const SchoolStar = styled(SchoolStarIcon)`
  position: absolute;
  top: -39px;
  left: 151px;

  width: 43px;
  height: 43px;

  @media screen and (min-width: 768px) {
    top: -39px;
    left: 240px;

    width: 41px;
    height: 41px;
  }

  @media screen and (min-width: 1280px) {
    top: -85px;
    left: unset;
    right: 0;

    width: 63px;
    height: 63px;
  }
`;
