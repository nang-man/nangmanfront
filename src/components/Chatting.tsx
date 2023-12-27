import React from "react";

interface Props {
  body: React.ReactElement;
}

const Chatting = ({ body }: Props) => {
  return <div>{body}</div>;
};

export default Chatting;
