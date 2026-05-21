import { ShoppingBag } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import type { Product } from "../types";
import { formatPrice } from "../utils/format";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <article className="product-card group">
      {product.isHit && (
        <span className="absolute right-3 top-3 z-10 rotate-[-9deg] rounded-full bg-[#c8f52a] px-3 py-1 text-[11px] font-black uppercase text-[#17141f]">
          Хит
        </span>
      )}
      <Link to={`/product/${product.slug}`} className="block">
        <div className="relative grid aspect-[1.08] place-items-center overflow-hidden rounded-[24px] bg-[#faf7fb]">
          <span
            className="absolute h-32 w-32 rounded-full opacity-25 blur-2xl transition group-hover:scale-125"
            style={{ backgroundColor: product.accentColor }}
          />
          <img
            src={product.image}
            alt={product.name}
            className="relative h-[82%] w-[82%] object-contain transition duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <h3 className="mt-4 min-h-[42px] text-base font-black leading-tight text-[#17141f]">
          {product.name}
        </h3>
        <p className="mt-1 text-sm font-semibold text-[#7b7380]">{product.weight}</p>
      </Link>
      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="text-xl font-black tracking-tight text-[#17141f]">
          {formatPrice(product.price)}
        </span>
        <button
          className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#f72a8a] text-white shadow-[0_12px_24px_rgba(247,42,138,0.22)] transition hover:-translate-y-0.5 active:translate-y-0"
          type="button"
          aria-label={`Добавить ${product.name} в корзину`}
          onClick={() => addItem(product.id)}
        >
          <ShoppingBag size={22} weight="bold" />
        </button>
      </div>
    </article>
  );
}
