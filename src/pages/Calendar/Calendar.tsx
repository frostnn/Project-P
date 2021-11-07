import style from '../Calendar/Calendar.module.scss';
import React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';

const Calendar: React.FC = () => {
  moment.updateLocale('en', { week: { dow: 1 } });
  const startDay = moment().startOf('month').startOf('week');
  const endDay = moment().endOf('month').endOf('week');
  const currentDay = moment().format('MMM Do YY');
  const currentMonth = moment().format('MMMM YYYY');
  const day = startDay.clone().subtract(1, 'day');
  const calendar = [...Array(42)].map(() => day.add(1, 'day').clone());
  console.log(moment().format());
  return (
    <div className={style.calendar_block}>
      <h1>Calendar</h1>
      <div className={style.calendar_block_current_month}>
        <div className={style.calendar_block_current_month_wrapper}>
          <div className={style.calendar_block_current_month_btn}>
            <button>
              <HiOutlineChevronLeft />
            </button>
          </div>
          <div className={style.calendar_block_current_month_title}>
            <h2>{currentMonth}</h2>
          </div>
          <div className={style.calendar_block_current_month_btn}>
            <button>
              <HiOutlineChevronRight />
            </button>
          </div>
        </div>
      </div>

      <div className={style.calendar_block_month}>
        {calendar.map((item) => (
          <div
            key={item.format('dddd')}
            className={classNames(
              style.calendar_block_month_item,
              item.format('MMM Do YY') === currentDay && style.current_day,
              (item.format('dddd') === 'Saturday' || item.format('dddd') === 'Sunday') &&
                style.weekend,
            )}>
            <span className={style.calendar_block_month_item_day}>{item.format('DD')}</span>
            <span className={style.calendar_block_month_item_week}>{item.format('dddd')}</span>
            <span className={style.calendar_block_month_item_month}>{item.format('MMMM')}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
