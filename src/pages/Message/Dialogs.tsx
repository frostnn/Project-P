import React from 'react';
import { useParams } from 'react-router';
import { getListMessage, iListMessage } from '../../fetch/fetch';
import avatarDefualt from '../../assets/img/gnomeDef.png';
import styled from 'styled-components';
import { Context } from '../../Context/Context';
import { MdOutlineInsertEmoticon } from 'react-icons/md';
import { AiOutlinePaperClip } from 'react-icons/ai';
import { RiSendPlane2Fill } from 'react-icons/ri';
import { FiChevronDown } from 'react-icons/fi';

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
  font-size: 18px;
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
const DialogItemMessage = styled.div<iID>`
  background: ${({ myId, userId }) => (myId !== userId ? '#4bbf84' : '#f7f7f7')};
  color: ${({ myId, userId }) => (myId !== userId ? '#fff' : '#303')};
  padding: 11px 36px 11px 10px;
  border-radius: 15px;
  margin-left: 10px;
  position: relative;
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
`;
const DialogItemTime = styled.span`
  position: absolute;
  right: 8px;
  bottom: 1px;
  font-size: 10px;
`;

const DialogSendPanel = styled.div`
  background: #f0f0f0;
  padding: 10px 0;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  display: flex;
  align-items: center;
`;
const DialogSendPanelInput = styled.input`
  padding: 9px 12px 11px;
  margin: 5px 10px;
  background-color: #fff;
  border: 1px solid #fff;
  border-radius: 21px;
  outline: none;
  width: 520px;
  font-size: 16px;
`;
const DialogSendPanelBtn = styled.button`
  display: flex;
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;
const DialogSendPanelWrapper = styled.div`
  display: flex;
  align-items: center;
  svg {
    font-size: 26px;
    color: #51585c;
  }
`;
const Emoticon = styled(MdOutlineInsertEmoticon)`
  padding: 5px;
`;

const PaperClip = styled(AiOutlinePaperClip)`
  padding: 5px;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
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
  &:hover {
    opacity: 0.7;
  }
`;
const Fileinput = styled.input`
  display: none;
`;
const MessageImg = styled.img`
  max-width: 200px;
  max-height: 200px;
  border-radius: 8px;
`;
const Dialogs: React.FC = () => {
  const [dialogList, setDialogList] = React.useState<iListMessage[]>([]);
  const [reply, setReply] = React.useState<string>('');
  const { id } = useParams<{ id: string }>();
  const { userInfo } = React.useContext(Context);
  const messagesEndRef = React.useRef<HTMLDivElement | null>(null);
  const messageInput = React.useRef<HTMLInputElement | null>(null);
  const inputFile = React.useRef<HTMLInputElement | null>(null);

  const getListDialogs = async (id: number) => {
    const data = await getListMessage(id);
    setDialogList(data);
  };

  const getMessage = (e: React.ChangeEvent<HTMLInputElement>) => setReply(e.target.value);
  const preventDefaultBtn = (e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault();

  const getAttachMessage = (e: React.MouseEvent<any>) => {
    if (inputFile.current) {
      inputFile.current.click();
    }
  };
  const getUrlImgMessage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = e.target.files[0];
      const imgUrl = window.URL.createObjectURL(files);
      const time = new Date();
      const message = {
        avatar: userInfo.avatar,
        cr_id: Math.max(...dialogList.map((item) => item.cr_id)) + 1,
        id: userInfo.id,
        last_name: userInfo.last_name,
        name: userInfo.name,
        reply: imgUrl,
        time: time.toString(),
      };
      setDialogList([...dialogList, message]);
    }
  };
  const sendMassege = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    const time = new Date();
    const message = {
      avatar: userInfo.avatar,
      cr_id: Math.max(...dialogList.map((item) => item.cr_id)) + 1,
      id: userInfo.id,
      last_name: userInfo.last_name,
      name: userInfo.name,
      reply: reply,
      time: time.toString(),
    };
    setDialogList([...dialogList, message]);
    if (messageInput.current) {
      messageInput.current.value = '';
    }
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
        {dialogList.map(({ cr_id, name, last_name, reply, time, avatar, id }) => (
          <DialogItem>
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
      <form onSubmit={(e) => sendMassege(e)}>
        <DialogSendPanel>
          <DialogSendPanelWrapper>
            <DialogSendPanelBtn>
              <Emoticon />
            </DialogSendPanelBtn>

            <PaperClip onClick={(e) => getAttachMessage(e)} />
            <Fileinput type="file" ref={inputFile} onChange={(e) => getUrlImgMessage(e)} />
          </DialogSendPanelWrapper>
          <DialogSendPanelWrapper>
            <DialogSendPanelInput
              type="text"
              placeholder="Enter a message"
              onChange={(e) => getMessage(e)}
              ref={messageInput}
            />
            <DialogSendPanelBtn type="submit">
              <RiSendPlane2Fill />
            </DialogSendPanelBtn>
          </DialogSendPanelWrapper>
        </DialogSendPanel>
      </form>
    </DialogWindow>
  );
};

export default Dialogs;
