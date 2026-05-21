import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckoutSummary } from "../components/CheckoutSummary";
import { EmptyState } from "../components/EmptyState";
import { FieldError } from "../components/FieldError";
import { useCart } from "../context/CartContext";
import type { CheckoutForm } from "../types";

type Errors = Partial<Record<keyof CheckoutForm, string>>;

const initialForm: CheckoutForm = {
  name: "",
  phone: "",
  email: "",
  deliveryMethod: "courier",
  address: "",
  comment: "",
};

export function Checkout() {
  const { entries, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState<CheckoutForm>(initialForm);
  const [errors, setErrors] = useState<Errors>({});

  const updateField = (field: keyof CheckoutForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const validate = () => {
    const nextErrors: Errors = {};
    if (form.name.trim().length < 2) nextErrors.name = "Укажите имя";
    if (form.phone.trim().length < 7) nextErrors.phone = "Укажите телефон";
    if (!form.email.includes("@")) nextErrors.email = "Укажите корректный e-mail";
    if (form.deliveryMethod === "courier" && form.address.trim().length < 5) {
      nextErrors.address = "Укажите адрес доставки";
    }
    return nextErrors;
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const orderNumber = `SAK-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    window.sessionStorage.setItem("sakura-last-order", orderNumber);
    clearCart();
    navigate(`/thanks?order=${orderNumber}`);
  };

  if (entries.length === 0) {
    return (
      <main className="page-shell">
        <EmptyState
          title="Для оформления нужна корзина"
          text="Выберите сладости в каталоге, а затем вернитесь к оформлению."
          actionLabel="Открыть каталог"
          actionTo="/catalog"
        />
      </main>
    );
  }

  return (
    <main className="page-shell">
      <div className="catalog-hero">
        <div>
          <p className="eyebrow">Оформление</p>
          <h1 className="page-title">Почти готово</h1>
          <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-[#5f5866]">
            Оставьте контакты и выберите доставку. Оплату в MVP не подключаем.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_380px]">
        <form className="checkout-form" onSubmit={onSubmit} noValidate>
          <div className="form-grid">
            <FieldBlock
              label="Имя"
              id="name"
              error={errors.name}
              value={form.name}
              onChange={(value) => updateField("name", value)}
              placeholder="Например, Анна"
            />
            <FieldBlock
              label="Телефон"
              id="phone"
              error={errors.phone}
              value={form.phone}
              onChange={(value) => updateField("phone", value)}
              placeholder="+7 900 000-00-00"
            />
            <FieldBlock
              label="E-mail"
              id="email"
              error={errors.email}
              value={form.email}
              onChange={(value) => updateField("email", value)}
              placeholder="name@example.ru"
              type="email"
            />
          </div>

          <fieldset className="mt-8">
            <legend className="form-label">Способ доставки</legend>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <label className={`delivery-option ${form.deliveryMethod === "courier" ? "delivery-option-active" : ""}`}>
                <input
                  className="sr-only"
                  type="radio"
                  name="delivery"
                  checked={form.deliveryMethod === "courier"}
                  onChange={() => updateField("deliveryMethod", "courier")}
                />
                <span>Курьером</span>
                <small>По Москве от 250 ₽</small>
              </label>
              <label className={`delivery-option ${form.deliveryMethod === "pickup" ? "delivery-option-active" : ""}`}>
                <input
                  className="sr-only"
                  type="radio"
                  name="delivery"
                  checked={form.deliveryMethod === "pickup"}
                  onChange={() => updateField("deliveryMethod", "pickup")}
                />
                <span>Самовывоз</span>
                <small>Сегодня после 16:00</small>
              </label>
            </div>
          </fieldset>

          <div className="mt-8">
            <label className="form-label" htmlFor="address">
              Адрес или комментарий
            </label>
            <textarea
              id="address"
              className="form-input min-h-32 resize-y"
              value={form.address}
              onChange={(event) => updateField("address", event.target.value)}
              placeholder="Адрес доставки, подъезд, домофон или удобное время"
            />
            <FieldError message={errors.address} />
          </div>

          <div className="mt-6">
            <label className="form-label" htmlFor="comment">
              Комментарий к заказу
            </label>
            <textarea
              id="comment"
              className="form-input min-h-24 resize-y"
              value={form.comment}
              onChange={(event) => updateField("comment", event.target.value)}
              placeholder="Например, не звонить в дверь"
            />
          </div>

          <button className="primary-button mt-8 w-full justify-center" type="submit">
            Подтвердить заказ
          </button>
        </form>

        <CheckoutSummary />
      </div>
    </main>
  );
}

function FieldBlock({
  label,
  id,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
}: {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className="form-input"
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
      <FieldError message={error} />
    </div>
  );
}
