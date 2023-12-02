import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
  title: string;

  value: number;
  onChange: (value: number) => void;
}

const Counter = ({ title, value, onChange }: CounterProps) => {
  const onAdd = useCallback(() => {
    if (value === 4) {
      return;
    }
    onChange(value + 1);
  }, [onChange, value]);

  const onReduce = useCallback(() => {
    if (value === 2) {
      return;
    }

    onChange(value - 1);
  }, [onChange, value]);
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-row items-center justify-center">
        <div className="font-medium">{title}</div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div
          onClick={onReduce}
          className="flex h-10 w-10 cursor-pointer items-center 
                    justify-center rounded-full border-[1px] border-neutral-400
                    text-neutral-600 transition hover:opacity-80"
        >
          <AiOutlineMinus />
        </div>
        <div className="text-xl font-light text-neutral-600">{value}</div>
        <div
          onClick={onAdd}
          className="flex h-10 w-10 cursor-pointer items-center 
                    justify-center rounded-full border-[1px] border-neutral-400
                    text-neutral-600 transition hover:opacity-80"
        >
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  );
};

export default Counter;
