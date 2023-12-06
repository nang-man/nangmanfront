import Avatar from "@components/Avatar";
import React from "react";

interface ChatModalUserListProps {
  users: {
    id: number;
    name: string;
    src: string;
  }[];
  onUserClick: (props: number) => void;
}

const ChatModalUserList = React.memo(
  ({ users, onUserClick }: ChatModalUserListProps) => {
    return (
      <div>
        <ul className="overflow-y-auto max-h-[400px]">
          {users.map((user, idx) => (
            <li
              key={`${user.id} + ${idx}`}
              onClick={() => onUserClick(user.id)}
              className="cursor-pointer border-b"
            >
              <div className="bg-white w-auto h-20 flex flex-row px-4">
                <div className="flex justify-center items-center w-auto h-auto w-30 h-30">
                  <Avatar src={user.src} width="12" height="12" />
                </div>
                <div className="flex flex-col overflow-hidden pl-4 justify-center w-60">
                  <p className="h-6">{user.name}</p>
                  <p className="overflow-ellipsis line-clamp-3 w-60 h-6">
                    {user.id} 마지막에 나오는 미ㅏ러민아러ㅣㅁㄴ아러미낭러미낭
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
