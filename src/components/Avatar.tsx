interface AvatarProps {
  src: string | null | undefined;
  width?: string;
  height?: string;
}

const Avatar = ({ src, width, height }: AvatarProps) => {
  return (
    <img
      className={`rounded-full w-${width} h-${height}`}
      alt="Avatar"
      src={src || ""}
    />
  );
};

export default Avatar;
