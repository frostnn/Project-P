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
`;
const MessageBlockMessages = styled.div`
  width: 80%;
`;
const User = styled.div`
  display: flex;
  align-items: center;
  background: #333947;
  border-radius: 4px;
  margin: 4px;
  padding: 5px;
`;
const UserAvatarWrapper = styled.div`
  img {
    width: 60px;
    height: 60px;
    border-radius: 50px;
  }
`;

const Message: React.FC = () => {
  const [dialogList, setDialogList] = React.useState<iListDialog[] | []>([]);
  const getListDialogs = async (id: number) => {
    const data = await getListDialog(id);
    setDialogList(data);
  };

  const { userInfo } = React.useContext(Context);
  React.useEffect(() => {
    getListDialogs(userInfo.id);
  }, []);
  return (
    <div>
      <h1>Message</h1>
      <MessageBlock>
        <MessageBlockDialogs>
          {Array.isArray(dialogList) ? (
            dialogList.map(({ name, last_name, avatar, c_id }, i) => (
              <User>
                <Link to={`/login/Message/dialog/${c_id}`}>
                  <UserAvatarWrapper>
                    <img src={avatar ? (avatar as string) : avatarDefualt} />
                  </UserAvatarWrapper>
                  <div>
                    <span>{name}</span> <span>{last_name}</span> <div>Dialog №{c_id}</div>
                  </div>
                </Link>
              </User>
            ))
          ) : (
            <h3>{dialogList}</h3>
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
