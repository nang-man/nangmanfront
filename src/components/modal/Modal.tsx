import Button from "@components/Button";
import React, { useEffect, useState } from "react";

import { IoMdClose } from "react-icons/io";

interface ModalProps {
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  onClose: () => void;
  disabled?: boolean;
  onSubmit?: () => void;
  isOpen?: boolean;
  actionLabel?: string;
}

const Modal = ({
  onClose,
  body,
  title,
  footer,
  isOpen,
  onSubmit,
  actionLabel,
}: ModalProps) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  return (
    <section
      className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50
                    outline-none focus:outline-none bg-neutral-800/70"
    >
      <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
        {/* CONTENT */}
        <div
          className={`translate duration-300 h-full 
            ${showModal ? `translate-y-0` : `translate-y-full`}
            ${showModal ? `opacity-100` : `opacity-0`}
            `}
        >
          <div
            className="translate h-full lg:h-auto md:h-auto border-0 rounded-xl shadow-lg relative
                        flex flex-col w-full bg-white outline-none focus:outline-none"
          >
            {/* HEADER */}
            <div className="flex items-center p-6 rounded-t-xl justify-center relative border-b-[1px] bg-emerald-400">
              <button
                onClick={onClose}
                className="p-1 border-0 hover:opacity-70 transition absolute right-9"
              >
                <IoMdClose size={30} />
              </button>
              <div className="text-lg font-semibold">{title}</div>
            </div>
            {/* BODY */}
            <div className="relative p-6 flex-auto">{body}</div>
            {/* FOOTER */}
            <div className="flex flex-col gap-2 p-6">
              {actionLabel && (
                <div className="flex w-full flex-row items-center gap-4">
                  <Button label={actionLabel || ""} onClick={onSubmit} />
                </div>
              )}
              {footer}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Modal;
