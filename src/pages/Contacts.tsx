import { EnvelopeSimple, MapPin, Phone } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

export function Contacts() {
  return (
    <main className="page-shell">
      <section className="catalog-hero">
        <div>
          <p className="eyebrow">Контакты</p>
          <h1 className="page-title">Мы рядом в Москве и Петербурге</h1>
          <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-[#5f5866]">
            Напишите или позвоните, если нужно уточнить состав набора, наличие вкуса или
            условия самовывоза.
          </p>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        <article className="info-card">
          <Phone size={30} weight="bold" className="text-[#f72a8a]" />
          <h2 className="mt-5 text-xl font-black text-[#17141f]">Телефон</h2>
          <p className="mt-3 text-sm font-semibold text-[#5f5866]">8 (800) 417-28-64</p>
        </article>
        <article className="info-card">
          <EnvelopeSimple size={30} weight="bold" className="text-[#f72a8a]" />
          <h2 className="mt-5 text-xl font-black text-[#17141f]">E-mail</h2>
          <p className="mt-3 text-sm font-semibold text-[#5f5866]">hello@sakura-sweets.ru</p>
        </article>
        <article className="info-card">
          <MapPin size={30} weight="bold" className="text-[#f72a8a]" />
          <h2 className="mt-5 text-xl font-black text-[#17141f]">Магазины</h2>
          <p className="mt-3 text-sm font-semibold leading-6 text-[#5f5866]">
            Москва, Цветной бульвар, 12
            <br />
            Санкт-Петербург, Литейный проспект, 34
          </p>
        </article>
      </section>

      <section className="mt-6 rounded-[28px] border border-[#efe7ef] bg-white p-6 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-[#17141f]">Часы работы</h2>
            <p className="mt-3 text-sm font-semibold leading-6 text-[#5f5866]">
              Ежедневно с 10:00 до 21:00. Заказы из MVP подтверждаются только как демонстрация.
            </p>
          </div>
          <Link to="/delivery" className="primary-button shrink-0">
            Доставка и оплата
          </Link>
        </div>
      </section>
    </main>
  );
}
