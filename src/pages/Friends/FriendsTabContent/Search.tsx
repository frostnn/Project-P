import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { addFriend, getAllUser, iAuthUser } from '../../../fetch/fetch';
import { IoListOutline, IoGridOutline, IoMail } from 'react-icons/io5';
import { FaTelegramPlane, FaPhone } from 'react-icons/fa';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import avatarDefualt from '../../../assets/img/gnomeDef.png';
import Response from '../../../components/Response/Response';
import { GoSearch } from 'react-icons/go';
import { CgClose } from 'react-icons/cg';
import { Context } from '../../../Context/Context';
interface iToggleView {
  toggleViewItems: boolean;
}
interface iToggleSetting {
  activeUsersSetting: number | null;
  i?: number;
  toggleViewItems?: boolean;
}
const PanelView = styled.div`
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

const UsersList = styled.div<iToggleView>`
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

const UsersListItem = styled.div<iToggleView>`
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

const UsersNameWrapper = styled.div`
  text-align: center;
`;
const UsersName = styled.span`
  padding: 0px 3px;
  color: #4bbf84;
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
  color: ${({ activeUsersSetting, i }) => (activeUsersSetting === i ? '#4bbf84' : '#b0b1af')};
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
const UsersModalSetting = styled.div<iToggleSetting>`
  position: absolute;
  inset: ${({ toggleViewItems }) =>
    !toggleViewItems ? 'auto auto 105px 143px' : 'auto auto 106px 870px'};
  margin: 0px;
  z-index: 999;
  background: #333947;
  border-radius: 4px;
  padding: 5px;
  visibility: ${({ activeUsersSetting, i }) => (activeUsersSetting === i ? 'visible' : 'hidden')};
  box-shadow: rgb(0 0 0 / 20%) 0px 2px 1px -1px, rgb(0 0 0 / 14%) 0px 1px 1px 0px,
    rgb(0 0 0 / 12%) 0px 1px 3px 0px;
`;

const UsersModalSettingList = styled.ul`
  margin: 0px;
  padding: 0;
  list-style: none;
  color: #fff;
  font-size: 12px;
  width: 89px;
`;

const UsersModalSettingListItem = styled.li`
  padding: 2px 0;
  :hover {
    color: #4bbf84;
  }
`;
const Panel = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`;

const PanelSearch = styled.div`
  padding-left: 10px;
  display: flex;
  align-items: center;
  position: relative;
`;

const IconSearch = styled(GoSearch)`
  position: absolute;
  left: 15px;
`;

const CleanSearchBtn = styled.button`
  position: absolute;
  right: 2px;
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #fff;
  visibility: hidden;
  &:hover {
    opacity: 0.7;
    visibility: visible;
  }
`;

const PanelSearchInput = styled.input`
  padding: 9px 5px 9px 28px;
  border-radius: 4px;
  border: none;
  background: #333947;
  color: #fff;
  outline: none;
  width: 250px;
  &:focus + ${CleanSearchBtn} {
    visibility: visible;
  }
`;

const Search = () => {
  const [allUser, setAllUser] = React.useState<iAuthUser | []>([]);
  const [toggleViewItems, setToggleViewItems] = React.useState<boolean>(false);
  const [activeUsersSetting, setActiveUsersSetting] = React.useState<number | null>(null);
  const [search, setSearch] = React.useState<string>('');
  const [messageAdd, setMessageAdd] = React.useState<string | null>(null);
  const inputSearch = React.useRef<HTMLInputElement | null>(null);
  const { userInfo } = React.useContext(Context);
  const toggleViewUsers = (value: boolean) => setToggleViewItems(value);
  const cleanSearchInput = () => {
    if (inputSearch.current) {
      inputSearch.current.value = '';
      setSearch('');
    }
  };
  const toggleModalUsersSetting = (value: number | null) => setActiveUsersSetting(value);
  const getUsers = async () => {
    const data = await getAllUser();
    setAllUser(data);
  };

  const addUserFriends = async (idFriends: number) => {
    const data = await addFriend(userInfo.id, idFriends);
    setMessageAdd(data);
  };

  React.useEffect(() => {
    getUsers();
  }, []);
  React.useEffect(() => {
    setTimeout(() => {
      setMessageAdd(null);
    }, 2000);
  }, [messageAdd]);
  return (
    <React.Fragment>
      <div>
        <Panel>
          <PanelSearch>
            <IconSearch />
            <PanelSearchInput
              placeholder="Search user..."
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              ref={inputSearch}
            />
            <CleanSearchBtn onClick={() => cleanSearchInput()}>
              <CgClose />
            </CleanSearchBtn>
          </PanelSearch>
          <PanelView>
            <IconViewList
              onClick={() => toggleViewUsers(!toggleViewItems)}
              toggleViewItems={toggleViewItems}
            />
            <IconViewGrid
              onClick={() => toggleViewUsers(!toggleViewItems)}
              toggleViewItems={toggleViewItems}
            />
          </PanelView>
        </Panel>

        <UsersList toggleViewItems={toggleViewItems}>
          {Array.isArray(allUser) &&
            allUser
              .filter(
                ({ name, last_name }: iAuthUser) =>
                  name.toLowerCase().includes(search.toLowerCase()) ||
                  last_name.toLowerCase().includes(search.toLowerCase()),
              )
              .map(({ name, last_name, avatar, id }, i) => (
                <UsersListItem toggleViewItems={toggleViewItems}>
                  <FriendDotsSettingBtn
                    onClick={() =>
                      activeUsersSetting === i
                        ? toggleModalUsersSetting(null)
                        : toggleModalUsersSetting(i)
                    }>
                    <FriendDotsSettingIcon i={i} activeUsersSetting={activeUsersSetting} />
                  </FriendDotsSettingBtn>
                  <UsersModalSetting
                    toggleViewItems={toggleViewItems}
                    i={i}
                    activeUsersSetting={activeUsersSetting}>
                    <UsersModalSettingList>
                      <UsersModalSettingListItem>ID: {id}</UsersModalSettingListItem>
                      <UsersModalSettingListItem onClick={() => addUserFriends(id)}>
                        Add friend
                      </UsersModalSettingListItem>
                      <UsersModalSettingListItem>Block user</UsersModalSettingListItem>
                      <UsersModalSettingListItem>Send a message</UsersModalSettingListItem>
                    </UsersModalSettingList>
                  </UsersModalSetting>
                  <Link to={`/login/User/${id}`} key={id}>
                    <div>
                      <AvatarFriend src={avatar ? (avatar as string) : avatarDefualt} />
                    </div>
                    <UsersNameWrapper>
                      <UsersName>{name}</UsersName>
                      <UsersName>{last_name}</UsersName>
                    </UsersNameWrapper>
                  </Link>
                  <IconWrapper>
                    <FaPhone />
                    <IoMail />
                    <FaTelegramPlane />
                  </IconWrapper>
                </UsersListItem>
              ))}
        </UsersList>
      </div>
      {messageAdd && <Response status={'noerror'} message={messageAdd} />}
    </React.Fragment>
  );
};

export default Search;
