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
      <div className="section-heading">
        <h1>Корзина</h1>
        <Link to="/catalog" className="text-sm font-black text-[#f72a8a]">
          Добавить ещё
        </Link>
      </div>
      <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_360px]">
        <section className="space-y-4">
          {entries.map(({ item, product }) => (
            <article className="cart-row" key={product.id}>
              <Link to={`/product/${product.slug}`} className="grid h-24 w-24 shrink-0 place-items-center rounded-[22px] bg-white sm:h-28 sm:w-28">
                <img src={product.image} alt={product.name} className="h-20 w-20 object-contain sm:h-24 sm:w-24" />
              </Link>
              <div className="min-w-0 flex-1">
                <Link to={`/product/${product.slug}`} className="text-lg font-black leading-tight text-[#17141f] hover:text-[#f72a8a]">
                  {product.name}
                </Link>
                <p className="mt-1 text-sm font-semibold text-[#7b7380]">{product.weight}</p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <QuantityStepper
                    quantity={item.quantity}
                    onChange={(quantity) => updateQuantity(product.id, quantity)}
                  />
                  <button
                    className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#efe7ef] text-[#7b7380] transition hover:border-[#f72a8a] hover:text-[#f72a8a]"
                    type="button"
                    aria-label={`Удалить ${product.name}`}
                    onClick={() => removeItem(product.id)}
                  >
                    <Trash size={19} weight="bold" />
                  </button>
                </div>
              </div>
              <span className="text-xl font-black text-[#17141f]">
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
