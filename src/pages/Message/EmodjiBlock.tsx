import React from 'react';
import styled from 'styled-components';
import { emodjiArr } from '../../constants/constants';

interface iActiveEmodji {
  activeEmodji: boolean;
}

interface iEmodjiBlock {
  activeEmodji: boolean;
  messageInput: HTMLInputElement | null;
  cursorPosition: number | null;
  setReply: (a: string) => void;
}

const EmodjiWrapper = styled.div<iActiveEmodji>`
  background: #f0f0f0;
  padding: 10px 0;
  border-radius: 4px;
  transition: 0.3s;
  transform: ${({ activeEmodji }) => (activeEmodji ? 'translateY(-120px)' : 'translateY(133px)')};
  visibility: ${({ activeEmodji }) => (activeEmodji ? 'visible' : 'hidden')};
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const EmodjiItem = styled.div`
  font-size: 22px;
  padding: 3px;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;
const EmodjiBlock: React.FC<iEmodjiBlock> = ({
  activeEmodji,
  messageInput,
  setReply,
  cursorPosition,
}) => {
  const addEmodjiMessage = (emodji: string) => {
    if (messageInput) {
      if (cursorPosition === 0) {
        messageInput.value += emodji;
        setReply(messageInput.value);
      }
      if (cursorPosition) {
        const message = messageInput.value.split('');
        message.splice(cursorPosition, 0, emodji);
        messageInput.value = message.join('');
        setReply(messageInput.value);
      }
    }
  };

  return (
    <EmodjiWrapper activeEmodji={activeEmodji}>
      {emodjiArr.map((emodji) => (
        <EmodjiItem key={emodji} onClick={() => addEmodjiMessage(emodji)}>
          {emodji}
        </EmodjiItem>
      ))}
    </EmodjiWrapper>
  );
};

export default EmodjiBlock;
