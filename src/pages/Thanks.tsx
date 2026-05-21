import { CheckCircle } from "@phosphor-icons/react";
import { Link, useSearchParams } from "react-router-dom";

export function Thanks() {
  const [searchParams] = useSearchParams();
  const order =
    searchParams.get("order") || window.sessionStorage.getItem("sakura-last-order") || "SAK-2026-4286";

  return (
    <main className="page-shell">
      <section className="thanks-card">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-[28px] bg-[#c8f52a] text-[#17141f]">
          <CheckCircle size={42} weight="bold" />
        </div>
        <p className="eyebrow mt-6">Заказ оформлен</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-[#17141f] sm:text-5xl">
          Спасибо за заказ
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base font-semibold leading-7 text-[#5f5866]">
          Мы имитировали успешное оформление. Номер заказа:{" "}
          <span className="font-black text-[#17141f]">{order}</span>
        </p>
        <Link to="/catalog" className="primary-button mx-auto mt-8 w-fit">
          Вернуться в каталог
        </Link>
      </section>
    </main>
  );
}
