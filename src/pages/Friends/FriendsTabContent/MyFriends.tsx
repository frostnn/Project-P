import React from 'react';
import { Context } from '../../../Context/Context';
import { getFriends, iResponseFriends } from '../../../fetch/fetch';
import { IoListOutline, IoGridOutline, IoMail } from 'react-icons/io5';
import { FaTelegramPlane, FaPhone } from 'react-icons/fa';
import styled from 'styled-components';

interface iToggleView {
  toggleViewItems: boolean;
}

const SortPanel = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 10px;
`;

const IconViewList = styled(IoListOutline)<iToggleView>`
  font-size: 30px;
  padding: 0 5px;
  cursor: pointer;
  border: ${({ toggleViewItems }) =>
    toggleViewItems ? '1px solid #4bbf84' : '1px solid transparent'};
  color: ${({ toggleViewItems }) => (toggleViewItems ? '#4bbf84' : '#fff')};
  border-radius: 4px;
  margin: 3px;
  transition: 0.3s;
  &:hover {
    border: 1px solid #4bbf84;
    color: #4bbf84;
  }
`;
const IconViewGrid = styled(IoGridOutline)<iToggleView>`
  font-size: 20px;
  padding: 0 5px;
  cursor: pointer;
  border: ${({ toggleViewItems }) =>
    !toggleViewItems ? '1px solid #4bbf84' : '1px solid transparent'};
  color: ${({ toggleViewItems }) => (!toggleViewItems ? '#4bbf84' : '#fff')};
  border-radius: 4px;
  padding: 5px 10px;
  margin: 3px;
  transition: 0.3s;
  &:hover {
    border: 1px solid #4bbf84;
    color: #4bbf84;
  }
`;
const AvatarFriend = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 2px solid #4bbf84;
  margin-bottom: 10px;
`;

const FriendsList = styled.div`
  display: flex;
`;

const FriendsListItem = styled.div`
  margin: 10px;
  padding: 15px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #333947;
  &:hover {
  }
`;
const FriendsName = styled.span`
  padding: 0px 5px;
  color: #4bbf84;
`;

const MyFrinds = () => {
  const [userFriends, setUserFriends] = React.useState<iResponseFriends[] | []>([]);
  const [toggleViewItems, setToggleViewItems] = React.useState<boolean>(false);
  const { userInfo } = React.useContext(Context);

  const toggleViewFriends = (value: boolean) => setToggleViewItems(value);

  const getAllFriends = async (id: { id: number }) => {
    const data = await getFriends(id);
    setUserFriends(data);
  };

  React.useEffect(() => {
    getAllFriends({ id: userInfo.id });
  }, [userInfo.id]);
  return (
    <div>
      <SortPanel>
        <IconViewList
          onClick={() => toggleViewFriends(!toggleViewItems)}
          toggleViewItems={toggleViewItems}
        />
        <IconViewGrid
          onClick={() => toggleViewFriends(!toggleViewItems)}
          toggleViewItems={toggleViewItems}
        />
      </SortPanel>
      <FriendsList>
        {userFriends.map(({ name, last_name, avatar }) => (
          <FriendsListItem>
            <div>
              <AvatarFriend src={avatar as string} />
            </div>
            <div>
              <FriendsName>{name}</FriendsName>
              <FriendsName>{last_name}</FriendsName>
            </div>
            <div>
              <FaPhone />
              <IoMail />
              <FaTelegramPlane />
            </div>
          </FriendsListItem>
        ))}
      </FriendsList>
    </div>
  );
};

export default MyFrinds;
