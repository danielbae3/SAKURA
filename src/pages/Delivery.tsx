import { Clock, CreditCard, MapPin, Package, Truck } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

const deliveryCards = [
  {
    icon: Package,
    title: "Как оформить заказ",
    text: "Добавьте сладости в корзину, оставьте контакты и комментарий. Менеджер подтвердит состав и удобное время.",
  },
  {
    icon: Truck,
    title: "Доставка",
    text: "Курьерская доставка по Москве и Санкт-Петербургу. По другим городам условия согласуем после оформления заявки.",
  },
  {
    icon: MapPin,
    title: "Самовывоз",
    text: "У Sakura есть магазины в Москве и Санкт-Петербурге. Заказ можно забрать из ближайшей точки после подтверждения.",
  },
  {
    icon: CreditCard,
    title: "Оплата",
    text: "В MVP реальная оплата не подключена. В рабочем магазине оплату можно будет согласовать после подтверждения заказа.",
  },
];

export function Delivery() {
  return (
    <main className="page-shell">
      <section className="catalog-hero">
        <div>
          <p className="eyebrow">Доставка и оплата</p>
          <h1 className="page-title">Заказ без лишних шагов</h1>
          <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-[#5f5866]">
            Мы собираем заказ из японских сладостей, подтверждаем детали и передаём его курьеру
            или готовим к самовывозу.
          </p>
        </div>
        <div className="hidden h-44 w-44 place-items-center rounded-[34px] bg-[#fff0f6] text-[#f72a8a] sm:grid">
          <Truck size={82} weight="bold" />
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        {deliveryCards.map((card) => {
          const Icon = card.icon;
          return (
            <article className="info-card" key={card.title}>
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#fff0f6] text-[#f72a8a]">
                <Icon size={25} weight="bold" />
              </div>
              <h2 className="mt-5 text-xl font-black tracking-tight text-[#17141f]">{card.title}</h2>
              <p className="mt-3 text-sm font-semibold leading-6 text-[#5f5866]">{card.text}</p>
            </article>
          );
        })}
      </section>

      <section className="mt-6 rounded-[28px] bg-[#17141f] p-6 text-white sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-black">
              <Clock size={18} weight="bold" />
              Обычно подтверждаем в течение 30 минут
            </div>
            <p className="mt-4 max-w-2xl text-sm font-semibold leading-6 text-white/75">
              Для MVP заказ никуда не отправляется: после оформления показывается страница
              подтверждения. Логика оплаты, доставки и CRM намеренно не подключена.
            </p>
          </div>
          <Link to="/catalog" className="secondary-button shrink-0">
            Выбрать сладости
          </Link>
        </div>
      </section>
    </main>
  );
}
