import React from 'react';
import { Context } from '../../../Context/Context';
import { getFriends, iResponseFriends } from '../../../fetch/fetch';

const MyFrinds = () => {
  const [userFriends, setUserFriends] = React.useState<iResponseFriends[] | []>([]);
  const { userInfo } = React.useContext(Context);
  const getAllFriends = async (id: { id: number }) => {
    const data = await getFriends(id);
    setUserFriends(data);
  };

  console.log('friends:', userFriends);
  React.useEffect(() => {
    getAllFriends({ id: userInfo.id });
  }, [userInfo.id]);
  return (
    <div>
      {userFriends.map(({ name }) => (
        <h1>{name}</h1>
      ))}
    </div>
  );
};

export default MyFrinds;
