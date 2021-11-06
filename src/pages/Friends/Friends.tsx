import styled from 'styled-components';
import React from 'react';

const Friends: React.FC = () => {
  const FiendsBlock = styled.div`
    padding: 10px;
  `;
  return (
    <FiendsBlock>
      <h1>Friends</h1>
    </FiendsBlock>
  );
};

export default Friends;
