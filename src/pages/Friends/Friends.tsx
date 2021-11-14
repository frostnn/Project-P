import styled from 'styled-components';
import React from 'react';
import { FaUserFriends } from 'react-icons/fa';
import { MdRecommend, MdPersonSearch } from 'react-icons/md';
import MyFrinds from './FriendsTabContent/MyFriends';
import Recommend from './FriendsTabContent/Recommend';
import Search from './FriendsTabContent/Search';
interface iActiveClass {
  active: number;
  i: number;
}

interface iTabs {
  title: string;
  component: React.FunctionComponentElement<any>;
  icon: React.FunctionComponentElement<any>;
}

const FriendsBlock = styled.div`
  padding: 0 10px;
  display: flex;
  justify-content: center;
`;
const FriendsBlockTitle = styled.div`
  display: flex;
  justify-content: space-around;
  width: 400px;
  background: #1e202d;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
`;
const FriendsBlockTitleItem = styled.div<iActiveClass>`
  padding: 10px 20px;
  font-size: 28px;
  text-align: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: 0.3s;
  color: #b0b1af;
  color: ${({ active, i }) => (active === i ? '#4bbf84' : '#b0b1af')};
  border-top: ${({ active, i }) => (active === i ? '2px solid #d8a20f' : '2px solid transparent')};
  &:hover {
    border-top: 2px solid #d8a20f;
    color: #4bbf84;
  }
`;

const FriendsBlockTitleItemText = styled.div`
  font-size: 12px;
  margin-top: 5px;
`;

const Friends: React.FC = () => {
  const [active, setActive] = React.useState<number>(0);
  const toggleTabs = (index: number) => setActive(index);
  const tabsTitle: iTabs[] = [
    { title: 'Friends', component: <MyFrinds />, icon: <FaUserFriends /> },
    { title: 'Search', component: <Search />, icon: <MdPersonSearch /> },
    { title: 'Recommend', component: <Recommend />, icon: <MdRecommend /> },
  ];
  return (
    <React.Fragment>
      <FriendsBlock>
        <FriendsBlockTitle>
          {tabsTitle.map(({ title, icon }, i) => (
            <FriendsBlockTitleItem
              onClick={() => toggleTabs(i)}
              active={active}
              i={i}
              key={`${title}_${i}`}>
              {icon}
              <FriendsBlockTitleItemText>{title}</FriendsBlockTitleItemText>
            </FriendsBlockTitleItem>
          ))}
        </FriendsBlockTitle>
      </FriendsBlock>
      {tabsTitle.map(
        ({ title, component }, i) => active === i && <div key={`${title}_${i}`}>{component}</div>,
      )}
    </React.Fragment>
  );
};

export default Friends;
