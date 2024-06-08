import styled from 'styled-components';
import { ReactComponent as UniversityStarIcon } from '../../img/svg/heroUniversityStar.svg';

export const APUniversitySection = styled.section`
  position: relative;
  padding: 50px 20px 0 20px;

  @media screen and (min-width: 768px) {
    padding: 100px 40px 0 40px;
    overflow: hidden;
  }

  @media screen and (min-width: 1280px) {
    padding: 60px;
    padding-top: 150px;
    padding-bottom: 0;
  }
`;

export const APUniversityWrapper = styled.div`
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
    flex-grow: 0;
    gap: 40px;
    margin: 0;
    width: 351px;
  }
`;

export const UniversityStar = styled(UniversityStarIcon)`
  position: absolute;
  top: -39px;
  left: 204px;

  width: 44px;
  height: 44px;

  @media screen and (min-width: 768px) {
    top: -50px;
    left: 264px;

    width: 50px;
    height: 50px;
  }

  @media screen and (min-width: 1280px) {
    top: -93px;
    left: -37px;

    width: 73px;
    height: 73px;
  }
`;
