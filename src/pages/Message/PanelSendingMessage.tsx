import React from 'react';
import { iListMessage } from '../../fetch/fetch';
import styled from 'styled-components';
import { Context } from '../../Context/Context';
import { MdOutlineInsertEmoticon } from 'react-icons/md';
import { AiOutlinePaperClip } from 'react-icons/ai';
import { RiSendPlane2Fill } from 'react-icons/ri';
import { CgClose } from 'react-icons/cg';
import EmodjiBlock from './EmodjiBlock';

interface iPropsState {
  dialogList: iListMessage[];
  setDialogList: (a: iListMessage[]) => void;
}

const DialogSendPanel = styled.div`
  background: #f0f0f0;
  padding: 10px 0;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  display: flex;
  align-items: center;
  position: absolute;
  z-index: 5;
  bottom: -5px;
  width: 100%;
`;
const DialogSendPanelInput = styled.input`
  padding: 9px 12px 11px;
  margin: 5px 10px;
  background-color: #fff;
  border: 1px solid #fff;
  border-radius: 21px;
  outline: none;
  width: 555px;
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
const DialogSendPanelEmodji = styled.div`
  padding: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  &:hover {
    opacity: 0.7;
  }
`;

const PaperClip = styled(AiOutlinePaperClip)`
  padding: 5px;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

const Fileinput = styled.input`
  display: none;
`;
const Form = styled.form`
  max-height: 200px;
  height: 65px;
  position: relative;
`;
const PanelSendingMessage: React.FC<iPropsState> = ({ dialogList, setDialogList }) => {
  const [reply, setReply] = React.useState<string>('');
  const [activeEmodji, setActiveEmodji] = React.useState<boolean>(false);
  const [cursorPosition, setCursorPosition] = React.useState<number | null>(0);
  const { userInfo } = React.useContext(Context);
  const messageInput = React.useRef<HTMLInputElement | null>(null);
  const inputFile = React.useRef<HTMLInputElement | null>(null);

  const getMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCursorPosition(e.target.selectionStart);
    setReply(e.target.value);
  };

  const getCursorPosition = (e: any) => setCursorPosition(e.target.selectionStart);
  const toggleEmodji = () => setActiveEmodji(!activeEmodji);
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
  console.log(cursorPosition);
  return (
    <Form onSubmit={(e) => sendMassege(e)}>
      <EmodjiBlock
        activeEmodji={activeEmodji}
        messageInput={messageInput.current}
        cursorPosition={cursorPosition}
        setReply={setReply}
      />

      <DialogSendPanel>
        <DialogSendPanelWrapper>
          <DialogSendPanelEmodji onClick={() => toggleEmodji()}>
            {activeEmodji ? <CgClose /> : <MdOutlineInsertEmoticon />}
          </DialogSendPanelEmodji>

          <PaperClip onClick={(e) => getAttachMessage(e)} />
          <Fileinput type="file" ref={inputFile} onChange={(e) => getUrlImgMessage(e)} />
        </DialogSendPanelWrapper>
        <DialogSendPanelWrapper>
          <DialogSendPanelInput
            type="text"
            placeholder="Enter a message"
            onChange={(e) => getMessage(e)}
            onClick={(e) => getCursorPosition(e)}
            ref={messageInput}
          />
          <DialogSendPanelBtn type="submit">
            <RiSendPlane2Fill />
          </DialogSendPanelBtn>
        </DialogSendPanelWrapper>
      </DialogSendPanel>
    </Form>
  );
};

export default PanelSendingMessage;
