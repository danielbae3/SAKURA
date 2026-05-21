import { Route, Routes } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { ScrollManager } from "./components/ScrollManager";
import { Cart } from "./pages/Cart";
import { Catalog } from "./pages/Catalog";
import { Checkout } from "./pages/Checkout";
import { About } from "./pages/About";
import { Contacts } from "./pages/Contacts";
import { Delivery } from "./pages/Delivery";
import { Home } from "./pages/Home";
import { Product } from "./pages/Product";
import { Thanks } from "./pages/Thanks";

export function App() {
  return (
    <div className="min-h-[100dvh] bg-[#fffdfd] text-[#17141f]">
      <Header />
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/product/:slug" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/thanks" element={<Thanks />} />
      </Routes>
      <Footer />
    </div>
  );
}
