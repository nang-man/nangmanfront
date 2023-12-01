import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  actionLabel?: string;
  password?: string;
}

const Input = ({
  id,
  label,
  type,
  disabled,
  required,
  register,
  errors,
  actionLabel,
  password,
}: InputProps) => {
  const isEmail = id === "email";

  const isPhone = id === "phone";

  const isPassword = id === "password";

  const isMatchPassword = id === "matchPassword";

  return (
    <div className="w-full relative">
      <input
        id={id}
        disabled={disabled}
        {...register(id, {
          required: required ? "This field is required" : false,
          ...(isEmail && {
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Invalid email address",
            },
          }),
          ...(isPhone && {
            pattern: {
              value: /^(01[0-9]{1})[0-9]{3,4}[0-9]{4}$/i,
              message: "Invalid phone number",
            },
          }),
          ...(isPassword && {
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/,
              message:
                "Password must be 8-20 characters and include at least one letter and one number",
            },
          }),
          ...(isMatchPassword && {
            validate: (value: string) => (password === value ? true : false),
          }),
        })}
        placeholder=" "
        type={type}
        className={`
            peer
            w-full
            p-4
            pt-6
            font-light
            bg-white
            border-2
            rounded-md
            outline-none
            transition
            disabled:opacity-70
            disabled:cursor-not-allowed
            ${errors[id] ? "border-rose-500" : "border-neutral-300"}
            ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}
        `}
      />
      <label
        htmlFor={id}
        className={`absolute
                    text-md
                    duration-150
                    transfrom
                    -translate-y-3
                    top-5
                    left-4
                    z-10
                    origin-[0]
                    peer-placeholder-shown:scale-100
                    peer-placeholder-shown:translate-y-0
                    peer-focus:scale-75
                    peer-focus:-translate-y-4
                    ${errors[id] ? "text-rose-500" : "text-zinc-400"}`}
      >
        {!errors[id] ? `${label}` : `${actionLabel}`}
      </label>
    </div>
  );
};

export default Input;
