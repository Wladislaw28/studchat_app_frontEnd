import React from 'react';
import classNames from 'classnames';
import format from 'date-fns/format';
import isToday from 'date-fns/is_today';
import { Link } from 'react-router-dom';

import { IconReaded, Avatar } from '../';

const getMessageTime = createdAt => {
  if (isToday(createdAt)) {
    return format(createdAt, 'HH:mm');
  } else {
    return format(createdAt, 'DD.MM.YYYY');
  }
};

const renderLastMessage = (message, userId) => {
  let text = '';
  if (!message.text && message.attachments.length) {
    text = 'прикрепленный файл';
  } else {
    text = message.text;
  }

  return `${message.user._id === userId ? 'Вы: ' : ''}${text}`;
};

const DialogItem = ({
  _id,
  undread,
  created_at,
  text,
  isMe,
  currentDialogId,
  author,
  partner,
  lastMessage,
  userId,
}) => {
  
  return (
    <Link to={`/chat/dialog/${_id}`}>
      <div
        className={classNames('dialogs__item', {
          'dialogs__item--online': isMe === true ? partner.isOnline : author.isOnline,
          'dialogs__item--selected': currentDialogId === _id,
        })}>
        <div className="dialogs__item-avatar">
          <Avatar user={isMe === true ? partner : author} />
        </div>
        <div className="dialogs__item-info">
          <div className="dialogs__item-info-top">
            <b>{isMe === true ? partner.fullName : author.fullName}</b>
            <span>{getMessageTime(lastMessage.createdAt)}</span>
          </div>
          <div className="dialogs__item-info-bottom">
            <p>{renderLastMessage(lastMessage, userId)}</p>
            {isMe && <IconReaded isMe={isMe} isReaded={lastMessage.readed} />}
            {(!lastMessage.readed && lastMessage.user._id !== userId) && (
              <div className="dialogs__item-info-bottom-count"> + </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
};

export default DialogItem;
