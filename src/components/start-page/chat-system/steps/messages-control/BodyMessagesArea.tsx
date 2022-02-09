import React, {MutableRefObject, useRef} from "react";
import {giveAvatar} from "../../../../../helpers/giveAvatar";
import {Picker} from "emoji-mart";
import {
    InfoMessageType,
    UserTypingMessageType
} from "../../../../../types/types";

import {
    List,
    AutoSizer,
    CellMeasurer,
    CellMeasurerCache,
} from 'react-virtualized';

type BodyMessagesAreaType = {
    userId: string
    messages: InfoMessageType[] | null
    showEmoji: any
    handleEmojiSelect: (e: any) => void
    emojiRef: MutableRefObject<HTMLDivElement | null>
    userTyping: UserTypingMessageType | null
}
export const BodyMessagesArea: React.FC<BodyMessagesAreaType> = React.memo(props => {
    const {
        userId, messages, showEmoji, handleEmojiSelect, emojiRef,
        userTyping
    } = props;

    return (
        <>
            {
                showEmoji && <div ref={emojiRef}>
                    <Picker style={{width: '100%'}}
                            onSelect={handleEmojiSelect}
                            emojiSize={20}
                            showPreview={false}
                            showSkinTones={false}
                    />
                </div>
            }
            {
                !showEmoji && <div className={'message-area'}>
                    <ul>
                        {
                            messages && messages.map((msg, index) => (
                                <li key={index} style={{
                                    flexDirection: userId === msg.senderUser
                                        ? 'row'
                                        : 'row-reverse'
                                }}>
                                    <div className={'user-pic'}>
                                        <img src={giveAvatar(msg.avatar)} alt="icon"/>
                                    </div>
                                    <div className={'message-content'}>
                                        {
                                            msg.media && msg.media.map((img, index) => (
                                                <div key={index}
                                                     className={'image-container'}>
                                                    <img src={img} alt='picture'/>
                                                </div>
                                            ))
                                        }
                                        {
                                            msg.textMessage &&
                                            <div
                                                className={`message-text ${userId === msg.senderUser ? 'userMessage' : 'senderMessage'}`}>
                                                {msg.textMessage}
                                            </div>
                                        }
                                    </div>
                                </li>
                            ))
                        }
                        {
                            userTyping?.isTypingMessage && <li style={{
                                flexDirection: 'row-reverse'
                            }}>
                                <div className={'user-pic'}>
                                    <img src={giveAvatar(userTyping?.avatar)}
                                         alt="icon"/>
                                </div>
                                <div className={'message-content'}>
                                    <div
                                        className={`message-text senderMessage`}>
                                        {userTyping?.textMessage}
                                    </div>
                                </div>
                            </li>
                        }
                    </ul>
                </div>
            }
        </>
    )
})

/*
export const BodyMessagesArea: React.FC<BodyMessagesAreaType> = React.memo(props => {
    const {
        userId,
        messages,
        showEmoji,
        handleEmojiSelect,
        emojiRef,
        userTyping
    } = props;
    const cache = useRef(new CellMeasurerCache({
        fixedWidth: true,
        defaultHeight: 30,
    }));

    return (
        <>
            {
                showEmoji && <div ref={emojiRef}>
                    <Picker style={{width: '100%'}}
                            onSelect={handleEmojiSelect}
                            emojiSize={20}
                            showPreview={false}
                            showSkinTones={false}
                    />
                </div>
            }
            {
                !showEmoji && <div className={'message-area'}>
                    <AutoSizer>
                        {({width, height}) => {
                            return (
                                <List
                                    rowCount={messages?.length || 0}
                                    rowHeight={cache.current.rowHeight}
                                    deferredMeasurementCache={cache.current}
                                    width={width}
                                    height={height}
                                    rowRenderer={({key, index, style, parent}) => {
                                        const message = messages && messages[index];

                                        return (
                                            <CellMeasurer
                                                key={key}
                                                cache={cache.current}
                                                parent={parent}
                                                columnIndex={0}
                                                rowIndex={index}
                                            >
                                                <li key={index} style={{
                                                    ...style,
                                                    flexDirection: userId === message?.senderUser
                                                        ? 'row'
                                                        : 'row-reverse'
                                                }}>
                                                    <div className={'user-pic'}>
                                                        <img
                                                            src={giveAvatar(message?.avatar || '')}
                                                            alt="icon"/>
                                                    </div>
                                                    <div
                                                        className={'message-content'}>
                                                        {
                                                            message?.media && message?.media.map((img, index) => (
                                                                <div key={index}
                                                                     className={'image-container'}>
                                                                    <img src={img}
                                                                         alt='picture'/>
                                                                </div>
                                                            ))
                                                        }
                                                        {
                                                            message?.textMessage &&
                                                            <div
                                                                className={`message-text ${userId === message?.senderUser ? 'userMessage' : 'senderMessage'}`}>
                                                                {message?.textMessage}
                                                            </div>
                                                        }
                                                    </div>
                                                </li>
                                                {
                                                    userTyping?.isTypingMessage &&
                                                    <li style={{
                                                        ...style,
                                                        flexDirection: 'row-reverse'
                                                    }}>
                                                        <div className={'user-pic'}>
                                                            <img
                                                                src={giveAvatar(userTyping?.avatar)}
                                                                alt="icon"/>
                                                        </div>
                                                        <div
                                                            className={'message-content'}>
                                                            <div
                                                                className={`message-text senderMessage`}>
                                                                {userTyping?.textMessage}
                                                            </div>
                                                        </div>
                                                    </li>
                                                }
                                            </CellMeasurer>
                                        )
                                    }}
                                />
                            )
                        }
                        }
                    </AutoSizer>
                </div>
            }
        </>
    )
})*/
