import { InstagramLogo, TelegramLogo } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

const shopLinks = [
  { label: "Каталог", to: "/catalog" },
  { label: "Новинки", to: "/catalog?view=new" },
  { label: "Хиты", to: "/catalog?view=hits" },
  { label: "Подарки", to: "/catalog?view=gifts" },
];

const infoLinks = [
  { label: "Доставка и оплата", to: "/delivery" },
  { label: "О нас", to: "/about" },
  { label: "Контакты", to: "/contacts" },
];

export function Footer() {
  return (
    <footer className="mt-14 border-t border-[#efeaf0] bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] lg:px-8">
        <div>
          <Link to="/" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#f72a8a] text-white">
              <span className="logo-flower scale-90" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-lg font-black uppercase tracking-tight">Сакура</span>
              <span className="mt-1 block text-xs font-semibold text-[#7b7380]">
                японские сладости
              </span>
            </span>
          </Link>
          <div className="mt-5 flex gap-3">
            <a className="social-link" href="https://t.me/" aria-label="Telegram">
              <TelegramLogo size={19} weight="bold" />
            </a>
            <a className="social-link" href="https://vk.com/" aria-label="VK">
              VK
            </a>
            <a className="social-link" href="https://instagram.com/" aria-label="Instagram">
              <InstagramLogo size={19} weight="bold" />
            </a>
          </div>
        </div>

        <FooterColumn title="Магазин" links={shopLinks} />
        <FooterColumn title="Информация" links={infoLinks} />
        <div>
          <h3 className="footer-title">Контакты</h3>
          <p className="mt-4 text-sm font-extrabold text-[#17141f]">8 (800) 417-28-64</p>
          <p className="mt-2 text-sm font-semibold text-[#7b7380]">hello@sakura-sweets.ru</p>
          <p className="mt-4 text-sm font-semibold leading-6 text-[#7b7380]">
            Москва и Санкт-Петербург
            <br />
            ежедневно с 10:00 до 21:00
          </p>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col gap-3 border-t border-[#f2edf3] px-4 py-5 text-xs font-semibold text-[#aea6b1] sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        <span>© 2026 Сакура - магазин японских сладостей</span>
        <span>Оплата и доставка уточняются при подтверждении заказа</span>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: Array<{ label: string; to: string }>;
}) {
  return (
    <div>
      <h3 className="footer-title">{title}</h3>
      <ul className="mt-4 space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <Link to={link.to} className="text-sm font-semibold text-[#7b7380] hover:text-[#f72a8a]">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
