interface AvatarProps {
  src: string | null | undefined;
}

const Avatar = ({ src }: AvatarProps) => {
  return (
    <>
      <img
        className="rounded-full h-[30px] w-[30px]"
        alt="Avatar"
        src={src || ""}
      />
    </>
  );
};

export default Avatar;
