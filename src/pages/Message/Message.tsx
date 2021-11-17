import React from 'react';
import styled from 'styled-components';
import { Context } from '../../Context/Context';
import { getListDialog, iListDialog } from '../../fetch/fetch';
import avatarDefualt from '../../assets/img/gnomeDef.png';
import { Route, Switch } from 'react-router';
import Dialogs from './Dialogs';
import { Link } from 'react-router-dom';

interface iActiveMessageList {
  activeMessageList: number;
  c_id: number;
}

const MessageBlock = styled.div`
  display: flex;
  justify-content: space-between;
`;
const MessageBlockDialogs = styled.div`
  width: 30%;
  a {
    text-decoration: none;
  }
`;
const MessageBlockMessages = styled.div`
  width: 80%;
  min-height: 450px;
  background: #333947;
  margin: 5px;
  border-radius: 4px;
`;
const User = styled.div<iActiveMessageList>`
  display: flex;
  align-items: center;
  background: ${({ activeMessageList, c_id }) =>
    activeMessageList === c_id ? '#4bbf84' : '#333947'};
  border-radius: 4px;
  margin: 4px;
  padding: 5px;
  color: #fff;
  transition: 0.3s;
  &:hover {
    background: #4bbf84;
  }
`;
const UserAvatarWrapper = styled.div`
  img {
    width: 60px;
    height: 60px;
    border-radius: 50px;
  }
`;
const UserName = styled.div`
  margin-left: 5px;
`;
const Message: React.FC = () => {
  const [messageList, setMessageList] = React.useState<iListDialog[]>([]);
  const [activeMessageList, setActiveMessageList] = React.useState<number>(0);
  const { userInfo } = React.useContext(Context);

  const toggleActiveMessageList = (value: number) => setActiveMessageList(value);
  const getListMessages = async (id: number) => {
    const data = await getListDialog(id);
    setMessageList(data);
  };

  const ar = ['\u{1F602}', '\u{1F601}', '\u{1F603}', '\u{1F604}'];

  React.useEffect(() => {
    getListMessages(userInfo.id);
  }, []);

  return (
    <div>
      {/*       {ar.map((emodji) => (
        <h4>{emodji}</h4>
      ))} */}
      <h1>Message &#128516;</h1>
      <MessageBlock>
        <MessageBlockDialogs>
          {Array.isArray(messageList) ? (
            messageList.map(({ name, last_name, avatar, c_id }, i) => (
              <Link
                to={`/login/Message/dialog/${c_id}`}
                onClick={() => toggleActiveMessageList(c_id)}>
                <User activeMessageList={activeMessageList} c_id={c_id}>
                  <UserAvatarWrapper>
                    <img src={avatar ? (avatar as string) : avatarDefualt} />
                  </UserAvatarWrapper>
                  <UserName>
                    <span>{name}</span> <span>{last_name}</span> <div>Dialog №{c_id}</div>
                  </UserName>
                </User>
              </Link>
            ))
          ) : (
            <h3>{messageList}</h3>
          )}
        </MessageBlockDialogs>
        <MessageBlockMessages>
          {!activeMessageList && <h3>Select a dialog</h3>}
          <Switch>
            <Route path="/login/Message/dialog/:id" component={Dialogs} exact />
          </Switch>
        </MessageBlockMessages>
      </MessageBlock>
    </div>
  );
};

export default Message;
