export type CategoryId =
  | "cookies"
  | "chocolate"
  | "mochi"
  | "drinks"
  | "snacks"
  | "gifts";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: CategoryId;
  price: number;
  weight: string;
  description: string;
  image: string;
  accentColor: string;
  isHit: boolean;
  isNew: boolean;
};

export type Category = {
  id: CategoryId;
  name: string;
  shortName: string;
  image: string;
  accentColor: string;
};

export type CartItem = {
  productId: string;
  quantity: number;
};

export type CheckoutForm = {
  name: string;
  phone: string;
  email: string;
  deliveryMethod: "courier" | "pickup";
  address: string;
  comment: string;
};
