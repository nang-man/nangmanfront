import { atom, useRecoilState } from "recoil";

export const createModalState = atom({
  key: "createModalState",
  default: {
    isOpen: false,
  },
});

export const useCreateModal = () => {
  const [isOpen, setIsOpen] = useRecoilState(createModalState);

  const onOpen = () => {
    setIsOpen({ isOpen: true });
  };

  const onClose = () => {
    setIsOpen({ isOpen: false });
  };

  return { isOpen, onOpen, onClose };
};
