import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Purchases from "./pages/Purchases";
import Product from "./pages/Product";
import Header from "./components/layouts/Header";
import Login from "./pages/Login";
import NotFount from "./components/NotFount";
import ProtectedAuth from "./auth/ProtectedAuth";
import Cart from "./components/cart/Cart";
import Loginpersonal from "./pages/Loginpersonal";

function App() {
  return (
    <section className="grid grid-rows-[auto_1fr_auto] min-h-screen">
      <Header />
      <Cart />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/loginpersonal" element={<Loginpersonal />}/>

        <Route path="/" element={<ProtectedAuth />}>
          <Route path="/purchases" element={<Purchases />} />
        </Route>

        <Route path="/products/:id" element={<Product />} />
        <Route path="/*" element={<NotFount />} />
      </Routes>
    </section>
  );
}

export default App;
