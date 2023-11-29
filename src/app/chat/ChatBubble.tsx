import React from "react";

interface IChatBubble {
  name: string;
  message: string;
  date: string;
  img: string;
  isUser?: boolean;
}

const ChatBubble = ({ name, message, date, img, isUser }: IChatBubble) => {
  return (
    <li className={`chat ${isUser ? "chat-end" : "chat-start"}`}>
      {!img && (
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img alt="User avatar" src={img} />
          </div>
        </div>
      )}
      <div className="chat-header">
        {!isUser && name}
        <time className="text-xs opacity-50">{date}</time>
      </div>
      <div className="chat-bubble">{message}</div>
    </li>
  );
};

export default ChatBubble;