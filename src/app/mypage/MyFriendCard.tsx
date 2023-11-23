import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

interface IMyFriendCard {
  name: string;
  image: string;
}

const MyFriendCard = ({ name, image }: IMyFriendCard) => {
  return (
    <li className="w-32 h-32 flex flex-col items-center">
      <div className="bg-gray-400 rounded-full border-2 w-20 h-20">
        <img alt="avatar" src={image} />
      </div>
      <div className="flex gap-2 mt-2">
        <h4 className="font-semibold">{name}</h4>
        <button>
          <FaTrashAlt />
        </button>
      </div>
    </li>
  );
};

export default MyFriendCard;
