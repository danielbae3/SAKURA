import { Link } from "react-router-dom";

export function EmptyState({
  title,
  text,
  actionLabel,
  actionTo,
}: {
  title: string;
  text: string;
  actionLabel?: string;
  actionTo?: string;
}) {
  return (
    <div className="rounded-[28px] border border-dashed border-[#eadfea] bg-white px-6 py-10 text-center">
      <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-3xl bg-[#fff0f6]">
        <span className="logo-flower scale-75 bg-[#f72a8a]" aria-hidden="true" />
      </div>
      <h2 className="text-2xl font-black tracking-tight text-[#17141f]">{title}</h2>
      <p className="mx-auto mt-3 max-w-md text-sm font-semibold leading-6 text-[#7b7380]">{text}</p>
      {actionLabel && actionTo && (
        <Link to={actionTo} className="primary-button mx-auto mt-6 w-fit">
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
