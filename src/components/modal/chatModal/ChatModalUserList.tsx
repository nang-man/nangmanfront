import Avatar from "@components/Avatar";
import React from "react";

interface ChatModalUserListProps {
  fllowers: {
    id: string;
    name: string;
    src: string;
  }[];
  onUserClick: (props: string) => void;
}

const ChatModalUserList = React.memo(
  ({ fllowers, onUserClick }: ChatModalUserListProps) => {
    return (
      <div>
        <ul className="overflow-y-auto max-h-[400px]">
          {fllowers.map((fllower, idx) => (
            <li
              key={`${fllower.id} + ${idx}`}
              onClick={() => onUserClick(fllower.id)}
              className="cursor-pointer border-b"
            >
              <div className="bg-white w-auto h-20 flex flex-row px-4">
                <div className="flex justify-center items-center w-30 h-30">
                  <Avatar src={fllower.src} width="12" height="12" />
                </div>
                <div className="flex flex-col overflow-hidden pl-4 justify-center w-60">
                  <p className="h-6">{fllower.name}</p>
                  <p className="overflow-ellipsis line-clamp-3 w-60 h-6">
                    마지막에 나오는 채팅
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
);

export default ChatModalUserList;
