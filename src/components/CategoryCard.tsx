import { ArrowRight } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import type { Category } from "../types";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      to={category.id === "gifts" ? "/catalog?view=gifts" : `/catalog?category=${category.id}`}
      className="category-card group"
      style={{ backgroundColor: category.accentColor }}
    >
      <span className="relative z-10 max-w-[120px] text-sm font-black uppercase leading-tight text-[#17141f]">
        {category.name}
      </span>
      <img
        src={category.image}
        alt={category.name}
        className="absolute bottom-[-18px] right-[-8px] h-[86%] w-[74%] object-contain transition duration-300 group-hover:scale-105"
        loading="lazy"
      />
      <span className="absolute bottom-4 left-4 grid h-8 w-8 place-items-center rounded-full bg-white text-[#17141f] transition group-hover:translate-x-1">
        <ArrowRight size={17} weight="bold" />
      </span>
    </Link>
  );
}
