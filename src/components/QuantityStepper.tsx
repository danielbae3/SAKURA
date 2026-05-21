import { Minus, Plus } from "@phosphor-icons/react";

export function QuantityStepper({
  quantity,
  onChange,
}: {
  quantity: number;
  onChange: (quantity: number) => void;
}) {
  return (
    <div className="grid w-[118px] grid-cols-3 items-center rounded-2xl border border-[#efe7ef] bg-white p-1">
      <button
        className="grid h-9 place-items-center rounded-xl text-[#17141f] transition hover:bg-[#fff0f6] active:scale-95"
        type="button"
        aria-label="Уменьшить количество"
        onClick={() => onChange(quantity - 1)}
      >
        <Minus size={15} weight="bold" />
      </button>
      <span className="text-center text-sm font-black tabular-nums text-[#17141f]">{quantity}</span>
      <button
        className="grid h-9 place-items-center rounded-xl text-[#17141f] transition hover:bg-[#fff0f6] active:scale-95"
        type="button"
        aria-label="Увеличить количество"
        onClick={() => onChange(quantity + 1)}
      >
        <Plus size={15} weight="bold" />
      </button>
    </div>
  );
}
