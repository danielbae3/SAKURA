import { Minus, Plus } from "@phosphor-icons/react";

export function QuantityStepper({
  quantity,
  onChange,
}: {
  quantity: number;
  onChange: (quantity: number) => void;
}) {
  return (
    <div className="quantity-stepper">
      <button
        className="quantity-stepper-button grid h-9 place-items-center rounded-xl text-[#17141f]"
        type="button"
        aria-label="Уменьшить количество"
        onClick={() => onChange(quantity - 1)}
      >
        <Minus size={15} weight="bold" />
      </button>
      <span className="text-center text-sm font-black tabular-nums text-[#17141f]">{quantity}</span>
      <button
        className="quantity-stepper-button grid h-9 place-items-center rounded-xl text-[#17141f]"
        type="button"
        aria-label="Увеличить количество"
        onClick={() => onChange(quantity + 1)}
      >
        <Plus size={15} weight="bold" />
      </button>
    </div>
  );
}
