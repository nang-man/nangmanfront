// import { useCallback } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Modal from "./Modal";

import Input from "../Input";

const LoginModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      authorization: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const { email, authorization } = data;
    try {
      console.log(email, authorization);
    } catch (error) {
      console.error(error);
    }
  };

  const bodyContent = (
    <article onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        id="email"
        label="Email"
        actionLabel="이메일 형식"
        register={register}
        errors={errors}
        required
      />
      <Input
        id="authorization"
        label="Authorization"
        actionLabel="Authorization"
        register={register}
        errors={errors}
        required
      />
    </article>
  );

  const footerContent = (
    <article className="flex items-center w-full">
      <div className="text-center font-light text-neutral-500 w-full">
        <div className="flex justify-center gap-2">
          <div>Enjoy Nang-man</div>
        </div>
      </div>
    </article>
  );

  return (
    <Modal
      //   isOpen={}
      //   onClose={}
      onSubmit={handleSubmit(onSubmit)}
      title="Find a register"
      actionLabel="계정찾기"
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
