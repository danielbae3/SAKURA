import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/format";

export function CheckoutSummary() {
  const { entries, subtotal } = useCart();
  const delivery = subtotal >= 1500 || subtotal === 0 ? 0 : 250;
  const total = subtotal + delivery;

  return (
    <aside className="checkout-summary lg:sticky lg:top-24">
      <h2 className="text-xl font-black tracking-tight text-[#17141f]">Ваш заказ</h2>
      <div className="mt-5 space-y-4">
        {entries.map(({ item, product }) => (
          <div key={product.id} className="checkout-summary-item">
            <div className="checkout-summary-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="checkout-summary-content">
              <p className="checkout-summary-name">{product.name}</p>
              <p className="checkout-summary-quantity">{item.quantity} шт.</p>
            </div>
            <span className="checkout-summary-price">
              {formatPrice(product.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-6 space-y-3 border-t border-[#f1eaf1] pt-5 text-sm font-bold">
        <div className="checkout-summary-line text-[#7b7380]">
          <span>Товары</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="checkout-summary-line text-[#7b7380]">
          <span>Доставка</span>
          <span>{delivery ? formatPrice(delivery) : "Бесплатно"}</span>
        </div>
        <div className="checkout-summary-line text-lg font-black text-[#17141f]">
          <span>Итого</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>
    </aside>
  );
}
