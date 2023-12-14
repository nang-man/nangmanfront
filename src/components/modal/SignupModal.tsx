import { useCallback } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";

import Modal from "./Modal";
import Input from "../Input";

import { signup } from "@/apis/auth";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleModal } from "@/store/modalSlice";
import { TYPE_LOGIN, TYPE_SIGNUP } from "@/store/types";

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

  const modalState = useAppSelector((state) => state.modalState.signup);
  const dispatch = useAppDispatch();

  const onCloseModal = useCallback(
    () => dispatch(toggleModal({ type: TYPE_SIGNUP, isOpen: false })),
    [dispatch]
  );

  const onToggle = useCallback(() => {
    dispatch(toggleModal({ type: TYPE_LOGIN, isOpen: true }));
    dispatch(toggleModal({ type: TYPE_SIGNUP, isOpen: false }));
  }, [dispatch]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const { name, email, password, phone } = data;
    signup({ name, email, password, phone });
    onCloseModal();
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
        id="name"
        label="Name"
        register={register}
        errors={errors}
        required
      />
      <Input
        id="phone"
        label="Phone"
        actionLabel="01011112222"
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        actionLabel="8~20 letter + number"
        register={register}
        errors={errors}
        required
      />
      <Input
        id="matchPassword"
        label="Password Confirmation"
        type="password"
        actionLabel="비밀번호가 일치하지 않습니다."
        register={register}
        errors={errors}
        required
        password={password}
      />
    </article>
  );

  const footerContent = (
    <article className="flex flex-row items-center gap-4 w-full">
      <hr />
      <div className="mt-4 text-center font-light text-neutral-500">
        <div className="flex flex-row items-center justify-center gap-2">
          <div>Already have an account?</div>
          <div
            onClick={onToggle}
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
      title="Sign In"
      actionLabel="회원가입"
      body={bodyContent}
      footer={footerContent}
      isOpen={modalState}
      onClose={onCloseModal}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default SignupModal;
