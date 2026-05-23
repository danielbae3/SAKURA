import { Trash } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { CheckoutSummary } from "../components/CheckoutSummary";
import { EmptyState } from "../components/EmptyState";
import { QuantityStepper } from "../components/QuantityStepper";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/format";

export function Cart() {
  const { entries, updateQuantity, removeItem } = useCart();

  if (entries.length === 0) {
    return (
      <main className="page-shell">
        <EmptyState
          title="Корзина пустая"
          text="Добавьте моти, шоколад или напиток из каталога, и заказ появится здесь."
          actionLabel="Перейти в каталог"
          actionTo="/catalog"
        />
      </main>
    );
  }

  return (
    <main className="page-shell">
      <div className="section-heading cart-heading">
        <h1>Корзина</h1>
        <Link to="/catalog" className="text-sm font-black text-[#f72a8a]">
          Добавить ещё
        </Link>
      </div>
      <div className="cart-layout mt-7 grid gap-6 lg:grid-cols-[1fr_360px]">
        <section className="space-y-4">
          {entries.map(({ item, product }) => (
            <article className="cart-row" key={product.id}>
              <Link to={`/product/${product.slug}`} className="cart-row-image">
                <img src={product.image} alt={product.name} />
              </Link>
              <div className="cart-row-content">
                <Link to={`/product/${product.slug}`} className="cart-product-link cart-row-title">
                  {product.name}
                </Link>
                <p className="cart-row-weight">{product.weight}</p>
              </div>
              <div className="cart-row-actions">
                <QuantityStepper
                  quantity={item.quantity}
                  onChange={(quantity) => updateQuantity(product.id, quantity)}
                />
                <button
                  className="cart-remove-button"
                  type="button"
                  aria-label={`Удалить ${product.name}`}
                  onClick={() => removeItem(product.id)}
                >
                  <Trash size={19} weight="bold" />
                </button>
              </div>
              <span className="cart-row-price">
                {formatPrice(product.price * item.quantity)}
              </span>
            </article>
          ))}
        </section>
        <div>
          <CheckoutSummary />
          <Link to="/checkout" className="primary-button mt-4 w-full justify-center">
            Оформить заказ
          </Link>
        </div>
      </div>
    </main>
  );
}
