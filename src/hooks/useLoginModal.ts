import { atom, useRecoilState } from "recoil";

export const loginModalState = atom({
  key: "loginModalState",
  default: {
    isOpen: false,
  },
});

export const useLoginModal = () => {
  const [isOpen, setIsOpen] = useRecoilState(loginModalState);

  const onOpen = () => {
    setIsOpen({ isOpen: true });
  };

  const onClose = () => {
    setIsOpen({ isOpen: false });
  };

  return { isOpen, onOpen, onClose };
};
