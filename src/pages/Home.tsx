import { ArrowRight, EnvelopeSimple, Star } from "@phosphor-icons/react";
import { FormEvent, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CategoryCard } from "../components/CategoryCard";
import { ProductCard } from "../components/ProductCard";
import { categories, products } from "../data/products";

const reviews = [
  {
    name: "Анна",
    text: "Очень быстрая доставка и всё такое вкусное. Моти просто восторг.",
    color: "#f72a8a",
  },
  {
    name: "Дмитрий",
    text: "Оригинальные сладости, которые не найдёшь в обычных магазинах.",
    color: "#43b8ff",
  },
  {
    name: "Екатерина",
    text: "Заказываю не первый раз, всё всегда аккуратно упаковано.",
    color: "#ff8b1a",
  },
];

export function Home() {
  const [email, setEmail] = useState("");
  const [subscriptionMessage, setSubscriptionMessage] = useState("");
  const hits = useMemo(() => products.filter((product) => product.isHit).slice(0, 6), []);
  const isSubscriptionError = subscriptionMessage === "Введите корректный e-mail";

  const onSubscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setSubscriptionMessage("Введите корректный e-mail");
      return;
    }

    setSubscriptionMessage("Готово, будем присылать только вкусные новости");
    setEmail("");
  };

  return (
    <>
      <section className="relative overflow-hidden bg-white">
        <div className="absolute left-[-128px] top-24 hidden h-36 w-36 rounded-full bg-[#f72a8a] sm:block" />
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 pb-10 pt-12 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:pb-16 lg:pt-20">
          <div className="relative z-10">
            <h1 className="max-w-[720px] text-[48px] font-black uppercase leading-[0.94] tracking-tight text-[#17141f] sm:text-[68px] lg:text-[78px]">
              Японские <span className="text-[#f72a8a]">сладости,</span> которые влюбляют
            </h1>
            <p className="mt-6 max-w-md text-lg font-semibold leading-8 text-[#5f5866]">
              Откройте вкус Японии - от матча до моти. Только оригинальные сладости.
            </p>
            <Link to="/catalog" className="primary-button mt-8 w-fit">
              В каталог
              <ArrowRight size={22} weight="bold" />
            </Link>
          </div>
          <div className="hero-visual">
            <picture>
              <source media="(max-width: 639px)" srcSet="/assets/hero-sakura-mobile.webp" />
              <source media="(max-width: 1023px)" srcSet="/assets/hero-sakura-tablet.webp" />
              <img
                src="/assets/hero-sakura-desktop.webp"
                alt="Японские сладости Sakura: Pocky, KitKat Matcha, Ramune, моти и подарочный набор"
                className="hero-visual-image"
                width="1280"
                height="853"
                sizes="(min-width: 1024px) 54vw, (min-width: 640px) 80vw, 100vw"
                decoding="async"
                fetchPriority="high"
              />
            </picture>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="section-heading">
          <h2>Категории</h2>
        </div>
        <div className="category-scroll">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="section-heading">
          <h2>Хиты продаж</h2>
          <Link to="/catalog?view=hits" className="text-sm font-black text-[#f72a8a]">
            Смотреть все
          </Link>
        </div>
        <div className="product-grid">
          {hits.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="section-shell">
        <div className="promo-banner">
          <div className="relative z-10">
            <h2 className="text-3xl font-black uppercase leading-none tracking-tight text-white sm:text-4xl">
              Идеально
              <br />
              для подарка
            </h2>
            <p className="mt-4 max-w-xs text-sm font-semibold leading-6 text-white">
              Яркие наборы японских сладостей на любой вкус и повод.
            </p>
            <Link to="/catalog?view=gifts" className="secondary-button mt-5 w-fit">
              Смотреть наборы
              <ArrowRight size={19} weight="bold" />
            </Link>
          </div>
          <img
            src="/assets/promo-gift.png"
            alt="Подарочный набор японских сладостей"
            className="absolute bottom-[-28px] right-[-26px] h-[88%] w-[64%] object-contain sm:right-5 sm:w-[52%]"
            decoding="async"
            loading="lazy"
          />
        </div>
      </section>

      <section className="section-shell">
        <div className="section-heading">
          <h2>Что говорят покупатели</h2>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {reviews.map((review) => (
            <article className="review-card" key={review.name}>
              <div
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-base font-black text-white"
                style={{ backgroundColor: review.color }}
              >
                {review.name.slice(0, 1)}
              </div>
              <div className="min-w-0">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-black text-[#17141f]">{review.name}</h3>
                  <div className="flex text-[#f72a8a]" aria-label="5 из 5">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} size={14} weight="fill" />
                    ))}
                  </div>
                </div>
                <p className="mt-2 text-sm font-semibold leading-5 text-[#5f5866]">{review.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell">
        <form className="subscribe-band" onSubmit={onSubscribe} noValidate>
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tight text-white sm:text-3xl">
              Будьте вкусно в курсе
            </h2>
            <p className="mt-2 max-w-md text-sm font-semibold leading-6 text-white/90">
              Подпишитесь на новости и получайте скидки на новинки и хиты.
            </p>
          </div>
          <div className="subscribe-form-field w-full max-w-xl">
            <div className="flex flex-col overflow-hidden rounded-2xl bg-white sm:flex-row">
              <label className="sr-only" htmlFor="subscribe-email">
                Ваш e-mail
              </label>
              <input
                id="subscribe-email"
                className={`min-h-14 flex-1 px-5 text-sm font-bold text-[#17141f] outline-none ${
                  isSubscriptionError ? "subscribe-input-error" : ""
                }`}
                placeholder="Ваш e-mail"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                aria-invalid={isSubscriptionError}
                aria-describedby="subscribe-message"
              />
              <button className="newsletter-button" type="submit">
                Подписаться
                <EnvelopeSimple size={19} weight="bold" />
              </button>
            </div>
            <p
              id="subscribe-message"
              className={`subscribe-message ${subscriptionMessage ? "subscribe-message-visible" : ""}`}
              aria-live="polite"
            >
              {subscriptionMessage}
            </p>
          </div>
        </form>
      </section>
    </>
  );
}
