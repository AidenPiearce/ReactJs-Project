import { Header } from "../components/Header";
import "./NotFound404.css";

export function NotFound404({ cart }) {
  return (
    <>
      <Header cart={cart} />
      <div className="text-container">
        <p className="t404">404</p>
        <p className="text">Not what you where looking for ?!😕</p>
      </div>
    </>
  );
}
