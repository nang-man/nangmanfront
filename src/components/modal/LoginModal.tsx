import { useCallback } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

// import { login } from "@/apis/auth";
import { useModal } from "@/hooks/useModal";
import { LOGIN_STATE, SIGNUP_STATE } from "@/hooks/modalType";
import { useAppDispatch } from "@/store/hooks.ts";
import { fetchCurrentUser, setUser } from "@/store/getCurrentUserSlice";

import Modal from "./Modal";

import Input from "../Input";

const LoginModal = () => {
  const dispatch = useAppDispatch();

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

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const { email, password } = data;
    try {
      // const res = await login({ email, password });
      // const { accessToken } = res;
      const res = await dispatch(fetchCurrentUser({ email, password }));

      setUser(res.payload);
      loginModal.onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const loginModal = useModal(LOGIN_STATE);
  const signupModal = useModal(SIGNUP_STATE);

  const signupToggle = useCallback(() => {
    loginModal.onClose();
    signupModal.onOpen();
  }, [loginModal, signupModal]);

  const RegisterToggle = useCallback(() => {
    loginModal.onClose();
  }, [loginModal]);

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
        id="password"
        type="password"
        label="Password"
        actionLabel="Password"
        register={register}
        errors={errors}
        required
      />
    </article>
  );

  const footerContent = (
    <article className="flex items-center w-full">
      <div className="text-center font-light text-neutral-500 w-full">
        <div className="flex justify-between gap-2">
          <div>Fisrt time using Nang-man?</div>
          <div
            onClick={signupToggle}
            className="cursor-pointer text-neutral-800 hover:underline"
          >
            Create an account
          </div>
          <div
            onClick={RegisterToggle}
            className="cursor-pointer text-neutral-400 hover:underline hover:text-neutral-900"
          >
            Find an account
          </div>
        </div>
      </div>
    </article>
  );

  return (
    <Modal
      isOpen={loginModal.isOpen.isOpen}
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      title="Login"
      actionLabel="로그인"
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
