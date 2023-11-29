import { useCallback } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";

import Input from "@/components/Input";
import Button from "@/components/Button";

import Modal from "./Modal";
import { useModal } from "@/hooks/useModal";
import { LOGIN_STATE, SIGNUP_STATE } from "@/hooks/modalType";

const SignupModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
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
    signupModal.onClose();
    loginModal.onOpen();
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
        id="name"
        label="Name"
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        register={register}
        errors={errors}
        required
      />
      <div className="flex flex-row items-center gap-4 w-full">
        <Button label="회원가입" />
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
      onClose={signupModal.onClose}
      title="Sign In"
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default SignupModal;
