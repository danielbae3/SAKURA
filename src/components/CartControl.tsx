import { Minus, Plus, ShoppingBag } from "@phosphor-icons/react";
import { useMemo } from "react";
import { useCart } from "../context/CartContext";

type CartControlVariant = "icon" | "wide";

export function CartControl({
  productId,
  productName,
  variant = "icon",
}: {
  productId: string;
  productName: string;
  variant?: CartControlVariant;
}) {
  const { items, addItem, updateQuantity } = useCart();
  const quantity = useMemo(
    () => items.find((item) => item.productId === productId)?.quantity ?? 0,
    [items, productId],
  );

  if (quantity === 0) {
    return variant === "wide" ? (
      <button className="primary-button" type="button" onClick={() => addItem(productId)}>
        В корзину
        <ShoppingBag size={22} weight="bold" />
      </button>
    ) : (
      <button
        className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#f72a8a] text-white shadow-[0_12px_24px_rgba(247,42,138,0.22)] transition hover:-translate-y-0.5 active:translate-y-0"
        type="button"
        aria-label={`Добавить ${productName} в корзину`}
        onClick={() => addItem(productId)}
      >
        <ShoppingBag size={22} weight="bold" />
      </button>
    );
  }

  return (
    <div className={variant === "wide" ? "cart-control cart-control-wide" : "cart-control"}>
      <button
        className="cart-control-button"
        type="button"
        aria-label={`Уменьшить количество ${productName}`}
        onClick={() => updateQuantity(productId, quantity - 1)}
      >
        <Minus size={16} weight="bold" />
      </button>
      <span className="cart-control-count" aria-label={`${productName}: ${quantity} в корзине`}>
        {quantity}
      </span>
      <button
        className="cart-control-button"
        type="button"
        aria-label={`Увеличить количество ${productName}`}
        onClick={() => updateQuantity(productId, quantity + 1)}
      >
        <Plus size={16} weight="bold" />
      </button>
    </div>
  );
}
