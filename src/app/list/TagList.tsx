import { Link } from "react-router-dom";

interface TagListProps {
  key?: number;
  title: string;
  count?: number;
}

const TagList = ({ title }: TagListProps) => {
  return (
    <div className="mb-16 pr-60">
      <h1 className="text-3xl pb-2 border-b mb-2">{title}</h1>

      <Link to="/chat" className="flex">
        <div className="flex mr-2 w-60 h-52 flex-col rounded-2xl shadow-xl">
          <img
            className="aspect-video w-60 rounded-t-2xl object-cover object-center"
            src="https://images.pexels.com/photos/3311574/pexels-photo-3311574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />

          <div className="p-2">
            <small className="text-blue-400 text-xs">Automobile company</small>
            <h1 className="text-2xl font-medium text-slate-600 pb-2">
              Dodge Car
            </h1>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TagList;
