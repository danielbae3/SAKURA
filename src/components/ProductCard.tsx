import { Link } from "react-router-dom";
import { CartControl } from "./CartControl";
import type { Product } from "../types";
import { formatPrice } from "../utils/format";

export function ProductCard({ product }: { product: Product }) {
  const badge = product.isHit ? "Хит" : product.isNew ? "Новинка" : "";

  return (
    <article className="product-card group">
      {badge && (
        <span className="absolute right-3 top-3 z-10 rotate-[-9deg] rounded-full bg-[#c8f52a] px-3 py-1 text-[11px] font-black uppercase text-[#17141f]">
          {badge}
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
      <div className="product-card-actions mt-4">
        <span className="text-xl font-black tracking-tight text-[#17141f]">
          {formatPrice(product.price)}
        </span>
        <CartControl productId={product.id} productName={product.name} />
      </div>
    </article>
  );
}
