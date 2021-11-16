import React from 'react';
import styled from 'styled-components';
import { Context } from '../../Context/Context';
import { getListDialog, iListDialog } from '../../fetch/fetch';
import avatarDefualt from '../../assets/img/gnomeDef.png';
import { Route, Switch } from 'react-router';
import Dialogs from './Dialogs';
import { Link } from 'react-router-dom';
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
const User = styled.div`
  display: flex;
  align-items: center;
  background: #333947;
  border-radius: 4px;
  margin: 4px;
  padding: 5px;
  color: #fff;
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
  const [messageList, setMessageList] = React.useState<iListDialog[] | []>([]);
  const getListMessages = async (id: number) => {
    const data = await getListDialog(id);
    setMessageList(data);
  };

  const { userInfo } = React.useContext(Context);
  React.useEffect(() => {
    getListMessages(userInfo.id);
  }, []);

  return (
    <div>
      <h1>Message</h1>
      <MessageBlock>
        <MessageBlockDialogs>
          {Array.isArray(messageList) ? (
            messageList.map(({ name, last_name, avatar, c_id }, i) => (
              <Link to={`/login/Message/dialog/${c_id}`}>
                <User>
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
          <Switch>
            <Route path="/login/Message/dialog/:id" component={Dialogs} exact />
          </Switch>
        </MessageBlockMessages>
      </MessageBlock>
    </div>
  );
};

export default Message;
