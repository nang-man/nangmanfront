import ChatBubble from "@/app/chat/ChatBubble";

interface ChatModalRoomProps {
  users: {
    id: number;
    name: string;
  }[];
}

const dummyData = {
  name: "홍길동",
  message: "안녕하세요",
  date: "오전 12:35",
  img: "",
  isUser: false,
};

const ChatModalRoom = ({ users }: ChatModalRoomProps) => {
  return (
    <div>
      <div>
        <ul className="">
          {users.map((user) => (
            <ChatBubble
              name={user.name}
              message={dummyData.message}
              date={dummyData.date}
              img={dummyData.img}
              isUser={dummyData.isUser}
            />
          ))}
          <ChatBubble
            name={dummyData.name}
            message={dummyData.message}
            date={dummyData.date}
            img={dummyData.img}
            isUser={true}
          />
        </ul>
      </div>
      <div className="join flex w-auto">
        <input
          className="input input-bordered join-item"
          placeholder="Text..."
        />
        <button className="join-item px-3 bg-emerald-600 rounded-5">
          전송
        </button>
      </div>
    </div>
  );
};

export default ChatModalRoom;
