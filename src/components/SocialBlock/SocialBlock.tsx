import style from '../SocialBlock/SocialBlock.module.scss';
import React from 'react';
import classNames from 'classnames';
import { iSocial } from '../../pages/Profile/Profile';

interface iSocialItems {
  socialItems: iSocial[];
  setSocialItems: (i: iSocial[]) => void;
}

const SocialBlock: React.FC<iSocialItems> = ({ socialItems, setSocialItems }) => {
  const selectSocialItem = (social: string): void => {
    setSocialItems(
      socialItems.map((item) => {
        if (item.social === social) {
          item.selected ? (item.selected = false) : (item.selected = true);
        }
        return item;
      }),
    );
  };
  console.log(socialItems);
  return (
    <div className={style.social_block}>
      {socialItems.map(({ icon, social, selected }) => (
        <div
          className={classNames(style.social_block_item, selected && style.social_check)}
          onClick={() => selectSocialItem(social)}>
          {icon}
        </div>
      ))}
    </div>
  );
};

export default SocialBlock;
