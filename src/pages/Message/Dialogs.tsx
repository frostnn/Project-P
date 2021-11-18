import React from 'react';
import { useParams } from 'react-router';
import { getListMessage, iListMessage } from '../../fetch/fetch';
import avatarDefualt from '../../assets/img/gnomeDef.png';
import styled from 'styled-components';
import { Context } from '../../Context/Context';
import { FiChevronDown } from 'react-icons/fi';
import PanelSendingMessage from './PanelSendingMessage';

interface iID {
  myId: number;
  userId: number;
}

const DialogWindow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;
const DialogItem = styled.div`
  display: flex;
  font-size: 16px;
  margin: 6px;
  align-items: center;
`;
const DialogItemWrapper = styled.div`
  min-height: 460px;
  max-height: 460px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background-color: #f0f0f0;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: #4bbf84;
  }
`;
const DialogItemAvatar = styled.div`
  img {
    border-radius: 50%;
    width: 45px;
    height: 45px;
  }
`;

const MessageSettingWrapper = styled.button`
  position: absolute;
  right: 2px;
  top: 1px;
  border: none;
  background: transparent;
  font-size: 14px;
  cursor: pointer;
  visibility: hidden;
  transition: 0.2s;
  &:hover {
    opacity: 0.7;
  }
`;
const DialogItemMessage = styled.div<iID>`
  background: ${({ myId, userId }) => (myId !== userId ? '#4bbf84' : '#f7f7f7')};
  color: ${({ myId, userId }) => (myId !== userId ? '#fff' : '#303')};
  padding: 11px 36px 11px 10px;
  border-radius: 15px;
  margin-left: 10px;
  position: relative;
  transition: 0.2s;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -9px;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 12px solid transparent;
    border-top: 13px solid ${({ myId, userId }) => (myId !== userId ? '#4bbf84' : '#f7f7f7')};
  }
  & svg {
    color: ${({ myId, userId }) => (myId !== userId ? '#fff' : '#303')};
  }
  &:hover {
    ${MessageSettingWrapper} {
      visibility: visible;
    }
  }
`;
const DialogItemTime = styled.span`
  position: absolute;
  right: 8px;
  bottom: 1px;
  font-size: 10px;
`;

const MessageImg = styled.img`
  max-width: 200px;
  max-height: 200px;
  border-radius: 8px;
`;

const Dialogs: React.FC = () => {
  const [dialogList, setDialogList] = React.useState<iListMessage[]>([]);
  const { id } = useParams<{ id: string }>();
  const { userInfo } = React.useContext(Context);
  const messagesEndRef = React.useRef<HTMLDivElement | null>(null);

  const getListDialogs = async (id: number) => {
    const data = await getListMessage(id);
    setDialogList(data);
  };

  React.useEffect(() => {
    getListDialogs(+id);
  }, [id]);
  React.useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
    }
  }, [dialogList]);

  return (
    <DialogWindow>
      <DialogItemWrapper>
        {dialogList.map(({ cr_id, reply, time, avatar, id }) => (
          <DialogItem key={cr_id}>
            {id !== userInfo.id && (
              <DialogItemAvatar>
                <img src={avatar ? (avatar as string) : avatarDefualt} />
              </DialogItemAvatar>
            )}
            <DialogItemMessage myId={userInfo.id} userId={id}>
              {reply.match('blob:http://') && reply.length === 63 ? (
                <MessageImg src={reply} />
              ) : (
                reply
              )}
              {time && (
                <DialogItemTime>
                  {new Date(time).toLocaleTimeString().slice(0, -3)}
                  {/* {new Date(time).toLocaleTimeString()} */}
                </DialogItemTime>
              )}
              <MessageSettingWrapper>
                <FiChevronDown />
              </MessageSettingWrapper>
            </DialogItemMessage>
          </DialogItem>
        ))}
        <div ref={messagesEndRef} />
      </DialogItemWrapper>
      <PanelSendingMessage dialogList={dialogList} setDialogList={setDialogList} />
    </DialogWindow>
  );
};

export default Dialogs;
