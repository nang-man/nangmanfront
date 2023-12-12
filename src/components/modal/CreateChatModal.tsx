import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Input from "../Input";

import Counter from "../Counter";
import Modal from "./Modal";
import { useModal } from "@/hooks/useModal";
import { CREATE_STATE } from "@/hooks/modalType";
import { getStorage } from "@/data/storage.ts";

const CreateChatModal = () => {
  const session = getStorage();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FieldValues>({
    defaultValues: {
      roomName: "",
      tag: "",
      guestCount: 2,
    },
  });

  const guestCount = watch("guestCount");

  const setCustomValue = (id: string, value: number) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  const { onClose, isOpen } = useModal(CREATE_STATE);

  const bodyContent = (
    <article onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        id="roomName"
        label="Room name"
        actionLabel="이메일 형식을 지켜주세요"
        register={register}
        errors={errors}
        required
      />
      <Input
        id="tag"
        label="Tag name"
        actionLabel="Tag name"
        register={register}
        errors={errors}
        required
      />
      <Counter
        title="Guests"
        value={guestCount}
        onChange={(value) => setCustomValue("guestCount", value)}
      />
    </article>
  );

  const footerContent = (
    <article className="flex flex-row items-center gap-4 w-full">
      <hr />
      <div className="mt-4 text-center font-light text-neutral-500">
        <div className="flex flex-row items-center justify-center gap-2">
          <div>Welcome to Nang-man</div>
          <div className="cursor-pointer text-neutral-800 hover:underline">
            Create a room
          </div>
        </div>
      </div>
    </article>
  );

  return (
    <Modal
      isOpen={isOpen.isOpen}
      title="Create Chatting Room"
      actionLabel="방 만들기"
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
      onClose={onClose}
    />
  );
};

export default CreateChatModal;
