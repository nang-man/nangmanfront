import { useCallback } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";

import Modal from "./Modal";

import Input from "../Input";

import { useLoginModal } from "@/hooks/useLoginModal.ts";
import { useSignupModal } from "@/hooks/useSignupModal.ts";

import { signup } from "@/apis/auth";

const SignupModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      matchPassword: "",
      phone: "",
    },
  });

  const password = watch("password");
  const matchPassword = watch("matchPassword");
  const passwordMatched = password === matchPassword;

  const loginModal = useLoginModal();
  const signupModal = useSignupModal();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const { name, email, password, matchPassword, phone } = data;
    signup({ name, email, password, matchPassword, phone });
    console.log(data);
    signupModal.onClose();
  };

  const toggle = useCallback(() => {
    signupModal.onClose();
    loginModal.onOpen();
  }, [loginModal, signupModal]);

  const bodyContent = (
    <div onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
        id="phone"
        label="Phone (-) 없이 입력"
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password 8~20 letter + number"
        type="password"
        register={register}
        errors={errors}
        required
      />
      <Input
        id="matchPassword"
        label="Password Confirmation"
        type="password"
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <article className="flex flex-row items-center gap-4 w-full">
      <hr />
      <div className="mt-4 text-center font-light text-neutral-500">
        <div className="flex flex-row items-center justify-center gap-2">
          <div>Already have an account?</div>
          <div
            onClick={toggle}
            className="cursor-pointer text-neutral-800 hover:underline"
          >
            Log in
          </div>
        </div>
      </div>
    </article>
  );

  return (
    <Modal
      isOpen={signupModal.isOpen.isOpen}
      onClose={signupModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      title="Sign In"
      actionLabel="회원가입"
      body={bodyContent}
      footer={footerContent}
      matchedPassword={passwordMatched}
    />
  );
};

export default SignupModal;
