import { atom, useRecoilState } from "recoil";

export const signupModalState = atom({
  key: "signupModalState",
  default: {
    isOpen: false,
  },
});

export const useSignupModal = () => {
  const [isOpen, setIsOpen] = useRecoilState(signupModalState);

  const onOpen = () => {
    setIsOpen({ isOpen: true });
  };

  const onClose = () => {
    setIsOpen({ isOpen: false });
  };

  return { isOpen, onOpen, onClose };
};
