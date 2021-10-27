import style from '../Time/Time.module.scss';
import { MdAccessTime } from 'react-icons/md';
import React from 'react';
import moment from 'moment';

const Time: React.FC = () => {
  const [time, setTime] = React.useState(moment().format('h:mm'));
  const [visibilityTime, setVisibilityTime] = React.useState<boolean>(false);
  const getTime = (value: boolean): void => setVisibilityTime(value);
  React.useEffect(() => {
    setInterval(() => setTime(moment().format('h:mm')), 10000);
  }, [time]);

  return (
    <div
      className={style.time_block}
      onMouseEnter={() => getTime(true)}
      onMouseLeave={() => getTime(false)}>
      <MdAccessTime />
      {visibilityTime && <div className={style.time_block_value}>{time}</div>}
    </div>
  );
};

export default Time;
