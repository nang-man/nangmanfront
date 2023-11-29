import { useCallback } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Modal from "./Modal";

import Input from "../Input";
import Button from "../Button";

import { useModal } from "@/hooks/useModal";
import { LOGIN_STATE, SIGNUP_STATE } from "@/hooks/modalType";

const LoginModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  const loginModal = useModal(LOGIN_STATE);
  const signupModal = useModal(SIGNUP_STATE);

  const toggle = useCallback(() => {
    loginModal.onClose();
    signupModal.onOpen();
  }, [loginModal, signupModal]);

  const bodyContent = (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input
        id="email"
        label="Email"
        register={register}
        errors={errors}
        required
      />

      <Input
        id="password"
        type="password"
        label="Password"
        register={register}
        errors={errors}
        required
      />
      <div className="flex flex-row items-center gap-4 w-full">
        <Button label="로그인" />
      </div>
    </form>
  );

  const footerContent = (
    <div>
      <button onClick={toggle}>전환</button>
    </div>
  );

  return (
    <Modal
      onClose={loginModal.onClose}
      title="Login"
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
