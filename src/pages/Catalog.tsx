import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { EmptyState } from "../components/EmptyState";
import { ProductCard } from "../components/ProductCard";
import { categories, categoriesById, products } from "../data/products";
import type { CategoryId } from "../types";
import { formatPrice } from "../utils/format";

type SortMode = "popular" | "priceAsc" | "priceDesc" | "name";

const maxCatalogPrice = Math.max(...products.map((product) => product.price));

export function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") as CategoryId | null;
  const [category, setCategory] = useState<CategoryId | "all">(
    initialCategory && categoriesById.has(initialCategory) ? initialCategory : "all",
  );
  const [priceLimit, setPriceLimit] = useState(maxCatalogPrice);
  const [sort, setSort] = useState<SortMode>(
    searchParams.get("sort") === "name" ? "name" : "popular",
  );

  const filteredProducts = useMemo(() => {
    const list = products
      .filter((product) => category === "all" || product.category === category)
      .filter((product) => product.price <= priceLimit);

    return [...list].sort((a, b) => {
      if (sort === "priceAsc") return a.price - b.price;
      if (sort === "priceDesc") return b.price - a.price;
      if (sort === "name") return a.name.localeCompare(b.name, "ru");
      return Number(b.isHit) - Number(a.isHit) || a.price - b.price;
    });
  }, [category, priceLimit, sort]);

  const setCategoryFilter = (value: CategoryId | "all") => {
    setCategory(value);
    const next = new URLSearchParams(searchParams);
    if (value === "all") {
      next.delete("category");
    } else {
      next.set("category", value);
    }
    setSearchParams(next, { replace: true });
  };

  const resetFilters = () => {
    setCategory("all");
    setPriceLimit(maxCatalogPrice);
    setSort("popular");
    setSearchParams({}, { replace: true });
  };

  return (
    <main className="page-shell">
      <div className="catalog-hero">
        <div>
          <p className="eyebrow">Каталог</p>
          <h1 className="page-title">Выберите сладости</h1>
          <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-[#5f5866]">
            Соберите корзину из моти, матча-шоколада, напитков Ramune и ярких подарочных наборов.
          </p>
        </div>
        <div className="hidden h-44 w-44 place-items-center rounded-[34px] bg-[#fff0f6] sm:grid">
          <img src="/assets/pocky-strawberry.png" alt="Pocky" className="h-40 w-40 object-contain" />
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="filter-panel">
          <div>
            <h2 className="filter-title">Категории</h2>
            <div className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:grid lg:overflow-visible lg:pb-0">
              <button
                className={`filter-chip ${category === "all" ? "filter-chip-active" : ""}`}
                type="button"
                onClick={() => setCategoryFilter("all")}
              >
                Все
              </button>
              {categories.map((item) => (
                <button
                  key={item.id}
                  className={`filter-chip ${category === item.id ? "filter-chip-active" : ""}`}
                  type="button"
                  onClick={() => setCategoryFilter(item.id)}
                >
                  {item.shortName}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="filter-title">Цена до {formatPrice(priceLimit)}</h2>
            <input
              className="mt-5 w-full accent-[#f72a8a]"
              type="range"
              min="120"
              max={maxCatalogPrice}
              step="10"
              value={priceLimit}
              onChange={(event) => setPriceLimit(Number(event.target.value))}
            />
            <div className="mt-2 flex justify-between text-xs font-bold text-[#9a919e]">
              <span>120 ₽</span>
              <span>{formatPrice(maxCatalogPrice)}</span>
            </div>
          </div>
        </aside>

        <section>
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-black text-[#7b7380]">
              Найдено: <span className="text-[#17141f]">{filteredProducts.length}</span>
            </p>
            <label className="flex items-center gap-3 text-sm font-black text-[#17141f]">
              Сортировка
              <select
                className="rounded-2xl border border-[#efe7ef] bg-white px-4 py-3 text-sm font-bold outline-none transition focus:border-[#f72a8a]"
                value={sort}
                onChange={(event) => setSort(event.target.value as SortMode)}
              >
                <option value="popular">Сначала хиты</option>
                <option value="priceAsc">Сначала дешевле</option>
                <option value="priceDesc">Сначала дороже</option>
                <option value="name">По названию</option>
              </select>
            </label>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div>
              <EmptyState
                title="Сладости не найдены"
                text="Попробуйте выбрать другую категорию или увеличить предел цены."
              />
              <div className="mt-5 flex justify-center">
                <button className="primary-button w-fit" type="button" onClick={resetFilters}>
                  Сбросить фильтр
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
