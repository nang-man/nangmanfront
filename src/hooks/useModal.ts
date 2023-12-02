// Modal
import { useRecoilState } from "recoil";
import {
  createModalState,
  loginModalState,
  signupModalState,
} from "./modalState";
import { CREATE_STATE, LOGIN_STATE, SIGNUP_STATE, Tmodal } from "./modalType";

export const useModal = (type: Tmodal) => {
  let data = createModalState;

  switch (type) {
    case CREATE_STATE:
      data = createModalState;
      break;
    case LOGIN_STATE:
      data = loginModalState;
      break;
    case SIGNUP_STATE:
      data = signupModalState;
      break;
    default:
      throw new Error(`Modal error: ${type}`);
  }

  const [isOpen, setIsOpen] = useRecoilState(data);

  const onOpen = () => setIsOpen((prev) => ({ ...prev, isOpen: true }));
  const onClose = () => setIsOpen((prev) => ({ ...prev, isOpen: false }));

  return { isOpen, onOpen, onClose };
};
