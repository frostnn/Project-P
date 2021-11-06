import React from 'react';
import { NavLink } from 'react-router-dom';
import { Context } from '../../Context/Context';
import styled from 'styled-components';

const ComplateProfileBlock = styled.div`
  border: 2px solid #5e606d;
  border-radius: 4px;
  padding: 6px;
  color: #bfbeba;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;
`;
const ComplateProfileBlockWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 145px;
`;
const ComplateProfileBlockPercent = styled.div`
  font-size: 12px;
  background: #5e606d;
  border-radius: 50%;
  padding: 4px;
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #4bbf84;
`;
const ComplateProfileBlockText = styled.div`
  font-size: 10px;
  display: flex;
  flex-direction: column;
  max-width: 98px;
  h3 {
    margin-top: 0;
    margin-bottom: 5px;
  }
  p {
    margin: 0;
  }
`;
const ComplateProfileBlockLink = styled.div`
  background: #f0555c;
  border: none;
  padding: 7px 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.3s;
  font-size: 10px;
  margin-top: 10px;

  a {
    color: #fff;
    text-decoration: none;
  }
  &:hover {
    opacity: 0.7;
  }
`;

const ComplateProfile: React.FC = () => {
  const { percentProfile } = React.useContext(Context);
  return (
    <ComplateProfileBlock>
      <ComplateProfileBlockWrapper>
        <ComplateProfileBlockPercent>
          {Math.ceil(percentProfile as number)}%
        </ComplateProfileBlockPercent>
        <ComplateProfileBlockText>
          <h3>Profile information</h3>
          <p>complete you profile to unlock all features</p>
        </ComplateProfileBlockText>
      </ComplateProfileBlockWrapper>
      <ComplateProfileBlockLink>
        <NavLink to={'/login/Profile'}>Complete my profile</NavLink>
      </ComplateProfileBlockLink>
    </ComplateProfileBlock>
  );
};

export default ComplateProfile;
