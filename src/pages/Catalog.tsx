import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { EmptyState } from "../components/EmptyState";
import { ProductCard } from "../components/ProductCard";
import { categories, categoriesById, products } from "../data/products";
import type { CategoryId } from "../types";
import { formatPrice } from "../utils/format";

type SortMode = "popular" | "priceAsc" | "priceDesc" | "name";
type CatalogView = "all" | "new" | "hits" | "gifts";

const minCatalogPrice = Math.min(...products.map((product) => product.price));
const maxCatalogPrice = Math.max(...products.map((product) => product.price));

const getCatalogView = (searchParams: URLSearchParams): CatalogView => {
  const view = searchParams.get("view");
  return view === "new" || view === "hits" || view === "gifts" ? view : "all";
};

const getCategory = (searchParams: URLSearchParams, view: CatalogView): CategoryId | "all" => {
  const category = searchParams.get("category") as CategoryId | null;
  if (category && categoriesById.has(category)) {
    return category;
  }

  return view === "gifts" ? "gifts" : "all";
};

const viewContent: Record<CatalogView, { eyebrow: string; title: string; text: string }> = {
  all: {
    eyebrow: "Каталог",
    title: "Выберите сладости",
    text: "Соберите корзину из моти, матча-шоколада, напитков Ramune и ярких подарочных наборов.",
  },
  new: {
    eyebrow: "Новинки",
    title: "Свежие вкусы",
    text: "Новые позиции, которые только появились на полке: моти, напитки и сладости к подарку.",
  },
  hits: {
    eyebrow: "Хиты",
    title: "Любимые сладости",
    text: "Самые популярные товары Sakura, которые чаще всего добавляют в корзину.",
  },
  gifts: {
    eyebrow: "Подарки",
    title: "Наборы и сюрпризы",
    text: "Готовые сладкие боксы для дня рождения, встречи с друзьями или маленького знака внимания.",
  },
};

const normalizePrice = (value: number) => {
  if (!Number.isFinite(value)) {
    return minCatalogPrice;
  }

  return Math.max(minCatalogPrice, Math.min(maxCatalogPrice, value));
};

export function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialView = getCatalogView(searchParams);
  const [view, setView] = useState<CatalogView>(initialView);
  const [category, setCategory] = useState<CategoryId | "all">(
    getCategory(searchParams, initialView),
  );
  const [priceFrom, setPriceFrom] = useState(minCatalogPrice);
  const [priceTo, setPriceTo] = useState(maxCatalogPrice);
  const [sort, setSort] = useState<SortMode>(
    searchParams.get("sort") === "name" ? "name" : "popular",
  );

  useEffect(() => {
    const nextView = getCatalogView(searchParams);
    setView(nextView);
    setCategory(getCategory(searchParams, nextView));
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    const list = products
      .filter((product) => {
        if (view === "new") return product.isNew;
        if (view === "hits") return product.isHit;
        if (view === "gifts") return product.category === "gifts";
        return category === "all" || product.category === category;
      })
      .filter((product) => product.price >= priceFrom && product.price <= priceTo);

    return [...list].sort((a, b) => {
      if (sort === "priceAsc") return a.price - b.price;
      if (sort === "priceDesc") return b.price - a.price;
      if (sort === "name") return a.name.localeCompare(b.name, "ru");
      return Number(b.isHit) - Number(a.isHit) || Number(b.isNew) - Number(a.isNew) || a.price - b.price;
    });
  }, [category, priceFrom, priceTo, sort, view]);

  const setCategoryFilter = (value: CategoryId | "all") => {
    const next = new URLSearchParams(searchParams);
    next.delete("sort");
    next.delete("category");

    if (value === "gifts") {
      next.set("view", "gifts");
      setView("gifts");
      setCategory("gifts");
    } else {
      next.delete("view");
      setView("all");
      setCategory(value);
      if (value !== "all") {
        next.set("category", value);
      }
    }

    setSearchParams(next, { replace: true });
  };

  const resetFilters = () => {
    setView("all");
    setCategory("all");
    setPriceFrom(minCatalogPrice);
    setPriceTo(maxCatalogPrice);
    setSort("popular");
    setSearchParams({}, { replace: true });
  };

  const content = viewContent[view];

  return (
    <main className="page-shell">
      <div className="catalog-hero">
        <div>
          <p className="eyebrow">{content.eyebrow}</p>
          <h1 className="page-title">{content.title}</h1>
          <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-[#5f5866]">
            {content.text}
          </p>
        </div>
        <div className="hidden h-44 w-44 place-items-center rounded-[34px] bg-[#fff0f6] sm:grid">
          <img src="/assets/pocky-strawberry.png" alt="Pocky" className="h-40 w-40 object-contain" decoding="async" />
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="filter-panel min-w-0">
          <div>
            <h2 className="filter-title">Категории</h2>
            <div className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:grid lg:overflow-visible lg:pb-0">
              <button
                className={`filter-chip ${view === "all" && category === "all" ? "filter-chip-active" : ""}`}
                type="button"
                onClick={() => setCategoryFilter("all")}
              >
                Все
              </button>
              {categories.map((item) => (
                <button
                  key={item.id}
                  className={`filter-chip ${
                    (view === "gifts" && item.id === "gifts") ||
                    (view === "all" && category === item.id)
                      ? "filter-chip-active"
                      : ""
                  }`}
                  type="button"
                  onClick={() => setCategoryFilter(item.id)}
                >
                  {item.shortName}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="filter-title">Цена</h2>
            <div className="price-filter-grid mt-4">
              <label className="price-field">
                <span>От</span>
                <input
                  type="number"
                  min={minCatalogPrice}
                  max={maxCatalogPrice}
                  step="10"
                  value={priceFrom}
                  onChange={(event) => setPriceFrom(normalizePrice(Number(event.target.value)))}
                />
              </label>
              <label className="price-field">
                <span>До</span>
                <input
                  type="number"
                  min={minCatalogPrice}
                  max={maxCatalogPrice}
                  step="10"
                  value={priceTo}
                  onChange={(event) => setPriceTo(normalizePrice(Number(event.target.value)))}
                />
              </label>
            </div>
            <p className="mt-3 text-xs font-bold leading-5 text-[#9a919e]">
              Диапазон каталога: {formatPrice(minCatalogPrice)} - {formatPrice(maxCatalogPrice)}
            </p>
          </div>
        </aside>

        <section className="min-w-0">
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
                <option value="popular">Сначала популярные</option>
                <option value="priceAsc">Сначала дешевле</option>
                <option value="priceDesc">Сначала дороже</option>
                <option value="name">По названию</option>
              </select>
            </label>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="product-grid catalog-product-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div>
              <EmptyState
                title="Сладости не найдены"
                text="Попробуйте выбрать другую категорию или расширить диапазон цены."
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
