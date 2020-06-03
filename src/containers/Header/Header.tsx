import React from 'react';
import { connect } from 'react-redux';
import { dialogsActions } from '../../redux/actions';
import orderBy from "lodash/orderBy";
import { Avatar } from '../../components';

import './Header.scss';
import { Empty } from 'antd';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

interface IHeaderProps {
    titleLogo?: string;
    isCompactMode: boolean;
    items: any;
    user: any;
}

const Header = (props: IHeaderProps) => {
    const { titleLogo, isCompactMode, user, items } = props;
    console.log(items, user);

    const renderEmptyDialogs = (): JSX.Element => {
        return (
            <div className="header__emtyDialog">
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description="Нет активных диалогов" style={{ 'color': '#ffff' }} />
            </div>
        )
    }

    return (
        <div className={`header ${isCompactMode === true ? 'header__compact' : ''}`}>
            {!!titleLogo && <h1 className="header__titleLogo">{titleLogo}</h1>}
            {isCompactMode === false &&
                <div className="header__dialogs">
                    {items.length
                        ? (
                            orderBy(items, ["created_at"], ["desc"]).map(item => {
                                const isMe: boolean = user._id === item.partner.id;
                                return (<Link key={isMe ? item.author.id : item.partner.id} to={`/chat/dialog/${item._id}`}
                                    style={{ 'marginRight': '20px' }}>
                                    <div className="header__dialog">
                                        <Avatar user={isMe ? item.author : item.partner} />
                                        {(!item.lastMessage.readed && item.lastMessage.user._id !== user._id) && (
                                            <div className="dialogs__item-info-bottom-count header__dialogNotice"> + </div>
                                        )}
                                    </div>
                                </Link>)
                            })
                        )
                        : renderEmptyDialogs()}
                </div>
            }
            <img className={`header__logo ${isCompactMode ? 'header__compactLogo' : ''}`}
                src="https://times.bntu.by/data/uploads/logos/logo_bntu.png" alt="LogoBNTU" />
        </div>
    )
}

export default connect(
    ({ user, dialogs }: any) =>
        ({
            user: user.data,
            items: dialogs.items
        }),
    dialogsActions,
)(Header);