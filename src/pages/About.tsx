import { Link } from "react-router-dom";

export function About() {
  return (
    <main className="page-shell">
      <section className="catalog-hero">
        <div>
          <p className="eyebrow">О нас</p>
          <h1 className="page-title">Сакура влюбляет во вкус Японии</h1>
          <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-[#5f5866]">
            Мы собираем яркую витрину японских сладостей: моти, Ramune, матча-шоколад,
            печенье, снеки и подарочные наборы. Главная идея магазина - быстро показать
            ассортимент и помочь собрать вкусную корзину без лишних шагов.
          </p>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
        <article className="info-card">
          <h2 className="text-2xl font-black tracking-tight text-[#17141f]">Что важно для Sakura</h2>
          <p className="mt-4 text-sm font-semibold leading-6 text-[#5f5866]">
            Чистый интерфейс, понятные категории и визуальный фокус на товарах. Мы не
            перегружаем покупателя сложными фильтрами, личным кабинетом или многошаговым
            checkout - в MVP важен простой путь от витрины до заказа.
          </p>
        </article>
        <article className="info-card bg-[#fff0f6]">
          <h2 className="text-2xl font-black tracking-tight text-[#17141f]">Витрина MVP</h2>
          <p className="mt-4 text-sm font-semibold leading-6 text-[#5f5866]">
            Все заказы имитируются локально. Корзина хранится в браузере, а подтверждение
            показывает номер заказа-заглушку.
          </p>
          <Link to="/catalog" className="primary-button mt-6 w-fit">
            В каталог
          </Link>
        </article>
      </section>
    </main>
  );
}
