import { useCallback } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import { useModal } from "@/hooks/useModal";
import { LOGIN_STATE, SIGNUP_STATE } from "@/hooks/modalType";
import { login } from "@/apis/auth";

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
      password: "",
    },
  });

  const [cookies, setCookie] = useCookies(["token"]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const { email, password } = data;
    try {
      const res = await login({ email, password });
      // console.log(res);
      setCookie("token", res.accessToken);
      console.log(cookies);
      loginModal.onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const loginModal = useModal(LOGIN_STATE);
  const signupModal = useModal(SIGNUP_STATE);

  const toggle = useCallback(() => {
    loginModal.onClose();
    signupModal.onOpen();
  }, [loginModal, signupModal]);

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
    <article className="flex flex-row items-center gap-4 w-full">
      <hr />
      <div className="mt-4 text-center font-light text-neutral-500">
        <div className="flex flex-row items-center justify-center gap-2">
          <div>Fisrt time using Nang-man?</div>
          <div
            onClick={toggle}
            className="cursor-pointer text-neutral-800 hover:underline"
          >
            Create an account
          </div>
          <div className=" right-0">Find an account</div>
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
