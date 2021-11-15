import React from 'react';
import { useParams } from 'react-router';
import { getListMessage, iListMessage } from '../../fetch/fetch';
const Dialogs: React.FC = () => {
  const [messageList, setMessageList] = React.useState<iListMessage[] | []>([]);
  const { id } = useParams<{ id: string }>();

  const getListDialogs = async (id: number) => {
    const data = await getListMessage(id);
    setMessageList(data);
  };
  React.useEffect(() => {
    getListDialogs(+id);
  }, []);
  return (
    <div>
      {messageList.map(({ cr_id, name, last_name, reply, time }) => (
        <div>
          <div>
            <span>{name}</span> <span>{last_name}</span>
          </div>
          <div>{reply}</div>
        </div>
      ))}
    </div>
  );
};

export default Dialogs;
