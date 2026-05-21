import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/format";

export function CheckoutSummary() {
  const { entries, subtotal } = useCart();
  const delivery = subtotal >= 1500 || subtotal === 0 ? 0 : 250;
  const total = subtotal + delivery;

  return (
    <aside className="rounded-[28px] border border-[#efe7ef] bg-white p-5 shadow-[0_18px_48px_rgba(23,20,31,0.06)] lg:sticky lg:top-24">
      <h2 className="text-xl font-black tracking-tight text-[#17141f]">Ваш заказ</h2>
      <div className="mt-5 space-y-4">
        {entries.map(({ item, product }) => (
          <div key={product.id} className="flex items-center gap-3">
            <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-[#faf7fb]">
              <img src={product.image} alt={product.name} className="h-14 w-14 object-contain" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-black text-[#17141f]">{product.name}</p>
              <p className="mt-1 text-xs font-bold text-[#7b7380]">{item.quantity} шт.</p>
            </div>
            <span className="text-sm font-black text-[#17141f]">
              {formatPrice(product.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-6 space-y-3 border-t border-[#f1eaf1] pt-5 text-sm font-bold">
        <div className="flex justify-between text-[#7b7380]">
          <span>Товары</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-[#7b7380]">
          <span>Доставка</span>
          <span>{delivery ? formatPrice(delivery) : "Бесплатно"}</span>
        </div>
        <div className="flex justify-between text-lg font-black text-[#17141f]">
          <span>Итого</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>
    </aside>
  );
}
