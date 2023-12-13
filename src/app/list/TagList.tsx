import { Link } from "react-router-dom";

interface TagListProps {
  key?: string;
  title?: string;
  count?: number;
  roomId: string;
  users?: string[];
}

const TagList = ({ roomId, title, users }: TagListProps) => {
  return (
    <Link to={`/chat/${roomId}`} className="flex">
      <div className="flex mr-2 w-60 h-52 flex-col rounded-2xl shadow-xl">
        <img
          className="aspect-video w-60 rounded-t-2xl object-cover object-center"
          src="https://images.pexels.com/photos/3311574/pexels-photo-3311574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />

        <div className="p-2">
          {users?.map((item, idx) => (
            <small className="text-slate-400 text-xs mr-1" key={idx}>
              {item}
            </small>
          ))}
          <h1 className="text-2xl font-medium text-slate-600 pb-2 whitespace-nowrap text-ellipsis overflow-hidden">
            {title}
          </h1>
        </div>
      </div>
    </Link>
  );
};

export default TagList;
