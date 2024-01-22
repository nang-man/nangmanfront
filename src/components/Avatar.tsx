import { useEffect, useState } from "react";

interface AvatarProps {
  src: string | null | undefined;
  profileSize?: string | boolean;
  isNonMembers?: boolean;
  name?: string;
  fontSize?: string;
}

const Avatar = ({
  src,
  name,
  profileSize,
  isNonMembers,
  fontSize,
}: AvatarProps) => {
  const [isDefalut, setIsDefalut] = useState(false);

  useEffect(() => {
    // Set Default image
    if (src === "default url" || src === "") {
      setIsDefalut(true);
    }
  }, []);

  return (
    <>
      {isDefalut ? (
        <div
          className={`rounded-full ${
            profileSize || "w-10 h-10"
          } flex justify-center items-center ${
            isNonMembers
              ? "text-gray-600 bg-gray-200 border-[1px] border-gray-400"
              : "text-white bg-emerald-300"
          }`}
        >
          <p className={`text-${fontSize} font-semibold`}>
            {name?.slice(0, 2) || "user"}
          </p>
        </div>
      ) : (
        <img
          className={`rounded-full ${profileSize || "w-10 h-10"}`}
          alt="Avatar"
          src={src || ""}
        />
      )}
    </>
  );
};

export default Avatar;
