import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Input from "../Input";
import Button from "../Button";

import Modal from "./Modal";
import { useModal } from "@/hooks/useModal";
import { CREATE_STATE } from "@/hooks/modalType";

const CreateChatModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      roomName: "",
      tag: "",
      count: 2,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  const { onClose } = useModal(CREATE_STATE);

  const bodyContent = (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        id="roomName"
        label="Room Name"
        register={register}
        errors={errors}
        required
      />
      <Input
        id="tag"
        label="Tag Name"
        register={register}
        errors={errors}
        required
      />
      <Input
        id="count"
        type="number"
        label="Count"
        register={register}
        errors={errors}
        required
      />
      <div className="flex flex-row items-center gap-4 w-full">
        <Button label="만들기" />
      </div>
    </form>
  );

  return (
    <Modal onClose={onClose} title="Create Chatting Room" body={bodyContent} />
  );
};

export default CreateChatModal;
