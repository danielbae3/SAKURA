import { List, MagnifyingGlass, ShoppingBag, User, X } from "@phosphor-icons/react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

const navItems = [
  { label: "Каталог", to: "/catalog" },
  { label: "Новинки", to: "/catalog?sort=name" },
  { label: "Хиты", to: "/catalog?sort=popular" },
  { label: "Подарки", to: "/catalog?category=gifts" },
  { label: "Доставка и оплата", to: "/checkout" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { totalCount } = useCart();

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-30 border-b border-[#efeaf0] bg-white/92 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3" onClick={closeMenu}>
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#f72a8a] text-white shadow-[0_12px_24px_rgba(247,42,138,0.25)]">
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
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) =>
                `text-sm font-extrabold transition hover:text-[#f72a8a] ${
                  isActive ? "text-[#f72a8a]" : "text-[#17141f]"
                }`
              }
            >
              {item.label}
            </NavLink>
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
              <NavLink
                key={item.label}
                to={item.to}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `rounded-2xl px-4 py-3 text-sm font-black transition ${
                    isActive ? "bg-[#fff0f6] text-[#f72a8a]" : "text-[#17141f]"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
