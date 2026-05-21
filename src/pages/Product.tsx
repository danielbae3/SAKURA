import { ArrowLeft } from "@phosphor-icons/react";
import { Link, useParams } from "react-router-dom";
import { CartControl } from "../components/CartControl";
import { ProductCard } from "../components/ProductCard";
import { categoriesById, products, productsBySlug } from "../data/products";
import { formatPrice } from "../utils/format";

export function Product() {
  const { slug } = useParams();
  const product = slug ? productsBySlug.get(slug) : undefined;

  if (!product) {
    return (
      <main className="page-shell">
        <div className="rounded-[28px] bg-white p-8 text-center">
          <h1 className="text-3xl font-black text-[#17141f]">Товар не найден</h1>
          <Link to="/catalog" className="primary-button mx-auto mt-6 w-fit">
            Вернуться в каталог
          </Link>
        </div>
      </main>
    );
  }

  const category = categoriesById.get(product.category);
  const related = products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 4);

  return (
    <main className="page-shell">
      <Link to="/catalog" className="mb-6 inline-flex items-center gap-2 text-sm font-black text-[#7b7380]">
        <ArrowLeft size={18} weight="bold" />
        Назад в каталог
      </Link>
      <section className="product-detail">
        <div className="relative grid min-h-[420px] place-items-center overflow-hidden rounded-[34px] bg-white">
          <img
            src={product.image}
            alt={product.name}
            className="relative h-[86%] max-h-[460px] w-[86%] object-contain"
            decoding="async"
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="eyebrow">{category?.name}</p>
          <h1 className="mt-3 text-4xl font-black leading-tight tracking-tight text-[#17141f] sm:text-5xl">
            {product.name}
          </h1>
          <p className="mt-5 text-base font-semibold leading-8 text-[#5f5866]">{product.description}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <span className="info-pill">{product.weight}</span>
            <span className="info-pill">Оригинальный вкус</span>
            {product.isHit && <span className="info-pill bg-[#c8f52a] text-[#17141f]">Хит продаж</span>}
            {product.isNew && <span className="info-pill bg-[#7bd3ff] text-[#17141f]">Новинка</span>}
          </div>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <span className="text-4xl font-black tracking-tight text-[#17141f]">
              {formatPrice(product.price)}
            </span>
            <CartControl productId={product.id} productName={product.name} variant="wide" />
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mt-12">
          <div className="section-heading">
            <h2>Похожие сладости</h2>
          </div>
          <div className="product-grid">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
