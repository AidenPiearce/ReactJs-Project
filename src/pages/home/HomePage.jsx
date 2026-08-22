import "./HomePage.css";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { ProductsGrid } from "./ProductsGrid";
import { useSearchParams } from "react-router";
import { productsApi } from "../../services/api";

export function HomePage({ cart, loadCart }) {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');

  useEffect(() => {
    const getHomeData = async () => {
      const data = await productsApi.getAll(search);
      setProducts(data);
    };

    getHomeData();
  }, [search]);

  return (
    <>
      <title>Aiden's Ecommerce Project</title>
      <link rel="icon" type="image/svg+xml" href="/ReactJs-Project/Local/home-favicon.png" />

      <Header cart={cart} />

      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}