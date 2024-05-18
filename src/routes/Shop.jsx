import { useEffect, useState } from "react";
import { FaCheck as Checkmark } from "react-icons/fa";
import ProductCard from "../components/ProductCard";
import { useOutletContext } from "react-router-dom";

function Shop() {
  const [categories, setCategories] = useState(null);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(0);
  const [products, setProducts] = useState(null);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState(null);
  const [cartItems, setCartItems] = useOutletContext();

  useEffect(() => {
    const fetchCategories = async () => {
      fetch("https://fakestoreapi.com/products/categories")
        .then((res) =>
          res.ok ? res : Promise.reject(res.status + " " + res.statusText)
        )
        .then((res) => res.json())
        .then((data) => setCategories(data))
        .catch((err) => setCategoriesError(err))
        .finally(() => setCategoriesLoading(false));
    };
    fetchCategories();
  }, []);
  useEffect(() => {
    if (categories) {
      let cat = categories[currentCategory];
      setProductsLoading(true);
      setProducts(null);
      const fetchProductsOfCategory = async () => {
        fetch(`https://fakestoreapi.com/products/category/${cat}`)
          .then((res) =>
            res.ok ? res : Promise.reject(res.status + " " + res.statusText)
          )
          .then((res) => res.json())
          .then((data) => setProducts(data))
          .catch((err) => setProductsError(err))
          .finally(() => setProductsLoading(false));
      };
      fetchProductsOfCategory();
    }
  }, [categories, currentCategory]);

  return (
    <section className="w-full">
      <div className="grid grid-cols-3 min-h-screen">
        <aside className=" p-12 bg-theme-plat flex flex-col gap-12 border-r-2 border-theme-dark-blue">
          <h3 className="uppercase font-bold text-3xl text-theme-dark-blue">
            Choose Category:
          </h3>
          <ul className="flex flex-col gap-8 ">
            {categoriesLoading && <li>Loading...</li>}
            {categoriesError && (
              <li>
                {categoriesError.status + " " + categoriesError.statusText}
              </li>
            )}
            {categories &&
              categories.map((category, index) => (
                <li
                  key={index}
                  onClick={() => setCurrentCategory(index)}
                  className={`flex flex-row justify-between items-center cursor-pointer text-black uppercase hover:text-theme-blue border-b-2 border-theme-dark-blue hover:border-theme-blue text-lg`}
                >
                  <p>{category}</p>
                  {currentCategory === index && <Checkmark />}
                </li>
              ))}
          </ul>
        </aside>
        <main className="p-12 bg-theme-plat flex flex-col gap-8 col-span-2">
          <h3 className="uppercase font-bold text-3xl text-theme-dark-blue">
            Products:
          </h3>
          <ul className="flex flex-col gap-8">
            {productsLoading ? (
              <li>Loading...</li>
            ) : productsError ? (
              <li>{productsError.status + " " + productsError.statusText}</li>
            ) : (
              products.map((product, index) => (
                <ProductCard
                  key={index}
                  product={product}
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                  page={"shop"}
                ></ProductCard>
              ))
            )}
          </ul>
        </main>
      </div>
    </section>
  );
}

export default Shop;
