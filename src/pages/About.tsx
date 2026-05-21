import { Link } from "react-router-dom";

export function About() {
  return (
    <main className="page-shell">
      <section className="catalog-hero">
        <div>
          <p className="eyebrow">О нас</p>
          <h1 className="page-title">Сакура - магазин японских сладостей</h1>
          <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-[#5f5866]">
            Мы собираем яркий ассортимент японских вкусностей: мягкие моти, Ramune,
            матча-шоколад, печенье, снеки и подарочные наборы. В Sakura легко найти
            сладость к чаю, маленький сюрприз для друга или красивый бокс для праздника.
          </p>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
        <article className="info-card">
          <h2 className="text-2xl font-black tracking-tight text-[#17141f]">
            Подбираем сладости для настроения
          </h2>
          <p className="mt-4 text-sm font-semibold leading-6 text-[#5f5866]">
            В каталоге есть хиты, новинки, напитки, десерты и снеки с разными вкусами:
            от нежной клубники до насыщенной матча. Если хочется подарить Японию в
            коробке, выбирайте готовые наборы - мы подбираем их так, чтобы внутри было
            интересно и сладко с первого открытия.
          </p>
        </article>
        <article className="info-card bg-[#fff0f6]">
          <h2 className="text-2xl font-black tracking-tight text-[#17141f]">
            Собрать заказ просто
          </h2>
          <p className="mt-4 text-sm font-semibold leading-6 text-[#5f5866]">
            Выберите товары, добавьте нужное количество в корзину и оформите доставку
            или самовывоз. Мы аккуратно упакуем сладости, чтобы моти, печенье и напитки
            доехали бережно и выглядели так же приятно, как на полке.
          </p>
          <Link to="/catalog" className="primary-button mt-6 w-fit">
            В каталог
          </Link>
        </article>
      </section>
    </main>
  );
}
