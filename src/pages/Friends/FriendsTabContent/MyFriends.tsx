import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Context } from '../../../Context/Context';
import { getFriends, iResponseFriends, deleteFriends } from '../../../fetch/fetch';
import { IoListOutline, IoGridOutline, IoMail } from 'react-icons/io5';
import { FaTelegramPlane, FaPhone } from 'react-icons/fa';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import avatarDefualt from '../../../assets/img/gnomeDef.png';
import Response from '../../../components/Response/Response';
interface iToggleView {
  toggleViewItems: boolean;
}
interface iToggleSetting {
  activeFriendsSetting: number | null;
  i?: number;
  toggleViewItems?: boolean;
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

const FriendsList = styled.div<iToggleView>`
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${({ toggleViewItems }) => (!toggleViewItems ? 'row' : 'column')};
  a {
    text-decoration: none;
  }
  svg {
    color: #fff;
  }
`;

const FriendsListItem = styled.div<iToggleView>`
  position: relative;
  margin: 10px;
  padding: 15px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #333947;
  cursor: pointer;
  transition: 0.3s;
  width: ${({ toggleViewItems }) => (!toggleViewItems ? '147px' : 'auto')};
  &:hover {
    box-shadow: 1px 1px #4bbf84, 2px 2px #4bbf84, 3px 3px #4bbf84, 4px 4px #4bbf84, 5px 5px #4bbf84,
      6px 6px #4bbf84, 7px 7px #4bbf84;
    -webkit-transform: translateX(-7px);
    transform: translateX(-7px);
    z-index: 9;
  }
`;
const FriendsName = styled.span`
  padding: 0px 3px;
  color: #4bbf84;
`;
const FriendsNameWrapper = styled.div`
  text-align: center;
`;
const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  svg {
    margin: 0 4px;
  }
`;

const FriendDotsSettingIcon = styled(BiDotsVerticalRounded)<iToggleSetting>`
  font-size: 18px;
  color: ${({ activeFriendsSetting, i }) => (activeFriendsSetting === i ? '#4bbf84' : '#b0b1af')};
  transition: 0.3s;
  :hover {
    color: #4bbf84;
  }
`;
const FriendDotsSettingBtn = styled.button`
  position: absolute;
  right: 0px;
  top: 5px;
  background-color: transparent;
  outline: 0px;
  border: 0px;
  margin: 0px;
  cursor: pointer;
  text-align: center;
  flex: 0 0 auto;
  border-radius: 50%;
  color: rgba(0, 0, 0, 0.54);
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
`;
const FriendsModalSetting = styled.div<iToggleSetting>`
  position: absolute;
  inset: ${({ toggleViewItems }) =>
    !toggleViewItems ? 'auto auto 105px 143px' : 'auto auto 106px 870px'};
  margin: 0px;
  z-index: 999;
  background: #333947;
  border-radius: 4px;
  padding: 5px;
  visibility: ${({ activeFriendsSetting, i }) =>
    activeFriendsSetting === i ? 'visible' : 'hidden'};
  box-shadow: rgb(0 0 0 / 20%) 0px 2px 1px -1px, rgb(0 0 0 / 14%) 0px 1px 1px 0px,
    rgb(0 0 0 / 12%) 0px 1px 3px 0px;
`;

const FriendsModalSettingList = styled.ul`
  margin: 0px;
  padding: 0;
  list-style: none;
  color: #fff;
  font-size: 12px;
  width: 89px;
`;

const FriendsModalSettingListItem = styled.li`
  padding: 2px 0;
  :hover {
    color: #4bbf84;
  }
`;
const MyFrinds = () => {
  const [userFriends, setUserFriends] = React.useState<iResponseFriends[] | string>([]);
  const [toggleViewItems, setToggleViewItems] = React.useState<boolean>(false);
  const [activeFriendsSetting, setActiveFriendsSetting] = React.useState<number | null>(null);
  const [messageDelete, setMessageDelete] = React.useState<string | null>(null);
  const { userInfo } = React.useContext(Context);

  const toggleViewFriends = (value: boolean) => setToggleViewItems(value);

  const toggleModalFriendsSetting = (value: number | null) => setActiveFriendsSetting(value);

  const deleteFriend = async (friendId: number) => {
    const data = await deleteFriends(userInfo.id, friendId);
    setMessageDelete(data);
  };

  const getAllFriends = async (id: { id: number }) => {
    const data = await getFriends(id);
    setUserFriends(data);
  };

  React.useEffect(() => {
    getAllFriends({ id: userInfo.id });
  }, [userInfo.id, messageDelete]);

  React.useEffect(() => {
    setTimeout(() => {
      setMessageDelete(null);
    }, 2000);
  }, [messageDelete]);

  return (
    <React.Fragment>
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
        <FriendsList toggleViewItems={toggleViewItems}>
          {Array.isArray(userFriends) ? (
            userFriends.map(({ name, last_name, avatar, id_friend }, i) => (
              <FriendsListItem toggleViewItems={toggleViewItems}>
                <FriendDotsSettingBtn
                  onClick={() =>
                    activeFriendsSetting === i
                      ? toggleModalFriendsSetting(null)
                      : toggleModalFriendsSetting(i)
                  }>
                  <FriendDotsSettingIcon i={i} activeFriendsSetting={activeFriendsSetting} />
                </FriendDotsSettingBtn>
                <FriendsModalSetting
                  toggleViewItems={toggleViewItems}
                  i={i}
                  activeFriendsSetting={activeFriendsSetting}>
                  <FriendsModalSettingList>
                    <FriendsModalSettingListItem>ID: {id_friend}</FriendsModalSettingListItem>
                    <FriendsModalSettingListItem onClick={() => deleteFriend(id_friend)}>
                      Remove friend
                    </FriendsModalSettingListItem>
                    <FriendsModalSettingListItem>Block friend</FriendsModalSettingListItem>
                    <FriendsModalSettingListItem>Send a message</FriendsModalSettingListItem>
                  </FriendsModalSettingList>
                </FriendsModalSetting>
                <Link to={`/login/User/${id_friend}`} key={id_friend}>
                  <div>
                    <AvatarFriend src={avatar ? (avatar as string) : avatarDefualt} />
                  </div>
                  <FriendsNameWrapper>
                    <FriendsName>{name}</FriendsName>
                    <FriendsName>{last_name}</FriendsName>
                  </FriendsNameWrapper>
                </Link>
                <IconWrapper>
                  <FaPhone />
                  <IoMail />
                  <FaTelegramPlane />
                </IconWrapper>
              </FriendsListItem>
            ))
          ) : (
            <h3>{userFriends}</h3>
          )}
        </FriendsList>
      </div>
      {messageDelete && <Response status={'noerror'} message={messageDelete} />}
    </React.Fragment>
  );
};

export default MyFrinds;
