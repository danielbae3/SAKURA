import { List, MagnifyingGlass, ShoppingBag, User, X } from "@phosphor-icons/react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

type CatalogView = "all" | "new" | "hits" | "gifts";

type NavItem = {
  label: string;
  to: string;
  pathname: string;
  view?: CatalogView;
};

const navItems: NavItem[] = [
  { label: "Каталог", to: "/catalog", pathname: "/catalog", view: "all" },
  { label: "Новинки", to: "/catalog?view=new", pathname: "/catalog", view: "new" },
  { label: "Хиты", to: "/catalog?view=hits", pathname: "/catalog", view: "hits" },
  { label: "Подарки", to: "/catalog?view=gifts", pathname: "/catalog", view: "gifts" },
  { label: "Доставка и оплата", to: "/delivery", pathname: "/delivery" },
];

const getCatalogView = (search: string): CatalogView => {
  const view = new URLSearchParams(search).get("view");
  return view === "new" || view === "hits" || view === "gifts" ? view : "all";
};

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { totalCount } = useCart();
  const location = useLocation();

  const closeMenu = () => setIsOpen(false);
  const currentCatalogView = getCatalogView(location.search);

  const isActive = (item: NavItem) => {
    if (item.pathname !== location.pathname) {
      return false;
    }

    if (item.pathname === "/catalog") {
      return item.view === currentCatalogView;
    }

    return true;
  };

  return (
    <header className="sticky top-0 z-30 border-b border-[#efeaf0] bg-white shadow-[0_8px_22px_rgba(23,20,31,0.035)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3" onClick={closeMenu}>
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#f72a8a] text-white shadow-[0_8px_18px_rgba(247,42,138,0.18)]">
            <span className="logo-flower" aria-hidden="true" />
          </span>
          <span className="leading-none">
            <span className="block text-lg font-black uppercase tracking-tight text-[#15121d]">
              Сакура
            </span>
            <span className="mt-1 block text-[11px] font-semibold text-[#7b7380]">
              магазин японских сладостей
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className={`text-sm font-extrabold transition hover:text-[#f72a8a] ${
                isActive(item) ? "text-[#f72a8a]" : "text-[#17141f]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/catalog"
            className="icon-button"
            aria-label="Открыть каталог"
            onClick={closeMenu}
          >
            <MagnifyingGlass size={23} weight="bold" />
          </Link>
          <button className="icon-button hidden sm:grid" aria-label="Профиль" type="button">
            <User size={23} weight="bold" />
          </button>
          <Link to="/cart" className="icon-button relative" aria-label="Корзина" onClick={closeMenu}>
            <ShoppingBag size={24} weight="bold" />
            {totalCount > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#f72a8a] px-1 text-[11px] font-black text-white">
                {totalCount}
              </span>
            )}
          </Link>
          <button
            className="icon-button lg:hidden"
            aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
            type="button"
            onClick={() => setIsOpen((value) => !value)}
          >
            {isOpen ? <X size={24} weight="bold" /> : <List size={25} weight="bold" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-[#efeaf0] bg-white px-4 pb-5 lg:hidden">
          <nav className="mx-auto grid max-w-7xl gap-2 pt-3">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={closeMenu}
                className={`rounded-2xl px-4 py-3 text-sm font-black transition ${
                  isActive(item) ? "bg-[#fff0f6] text-[#f72a8a]" : "text-[#17141f]"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
