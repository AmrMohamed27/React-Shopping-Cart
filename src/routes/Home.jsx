import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight as ArrowRight } from "react-icons/fa6";
import { FaArrowLeft as ArrowLeft } from "react-icons/fa6";
import { ReactTyped } from "react-typed";

function Home() {
  const [categories, setCategories] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(0);

  const getImageFilename = (category) => {
    return category.toLowerCase() === "men's clothing"
      ? "men.jpg"
      : category.toLowerCase() === "women's clothing"
      ? "women.jpg"
      : `${category.toLowerCase()}.jpg`;
  };

  const handleIncrementCategory = () => {
    if (currentCategory < categories.length - 1) {
      setCurrentCategory(currentCategory + 1);
    } else {
      setCurrentCategory(0);
    }
  };

  const handleDecrementCategory = () => {
    if (currentCategory > 0) {
      setCurrentCategory(currentCategory - 1);
    } else {
      setCurrentCategory(categories.length - 1);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      fetch("https://fakestoreapi.com/products/categories")
        .then((res) =>
          res.ok ? res : Promise.reject(res.status + " " + res.statusText)
        )
        .then((res) => res.json())
        .then((data) => setCategories(data))
        .catch((err) => setError(err))
        .finally(() => setLoading(false));
    };
    fetchCategories();
  }, []);
  return (
    <>
      <section className="w-full bg-[url('/images/hero.jpg')] bg-cover min-h-screen">
        <div className="max-w-[80%] mx-auto flex flex-col p-36 gap-8 justify-center items-center">
          <div>
            <h2 className="text-5xl font-bold text-theme-dark-blue">
              <ReactTyped
                strings={[" Welcome to my E-commerce website"]}
                typeSpeed={50}
                backSpeed={50}
                loop
              />
            </h2>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-theme-blue">
              Check out some of my products
            </h3>
          </div>
          <div>
            <Link
              to="/shop"
              className="px-8 py-2 bg-theme-blue rounded-lg text-lg text-white hover:bg-theme-gray duration-100 ease-in"
            >
              Go to Shop!
            </Link>
          </div>
        </div>
      </section>
      <section className="w-full bg-theme-dark-blue border-t-2 border-theme-plat">
        <div className="max-w-[80%] mx-auto flex flex-col p-36 gap-24 justify-center items-center">
          <div>
            <h2 className="text-5xl font-bold text-theme-plat">
              What do we offer?
            </h2>
          </div>
          <div className="w-full flex flex-col gap-12">
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <ul className="flex flex-row justify-center items-center">
              {categories &&
                categories.map((category) => (
                  <li
                    key={category}
                    className={`${
                      currentCategory === categories.indexOf(category)
                        ? "visible"
                        : "hidden"
                    }  rounded-xl w-full flex justify-center items-center text-6xl text-theme-blue uppercase font-bold tracking-widest py-64 bg-cover`}
                    style={{
                      backgroundImage: `url('/images/${getImageFilename(
                        category
                      )}')`,
                    }}
                  >
                    <h3>{category}</h3>
                  </li>
                ))}
            </ul>
            <div className="flex flex-row gap-8 text-white text-xl justify-center">
              <ArrowLeft
                className="cursor-pointer"
                onClick={handleDecrementCategory}
              />
              <ArrowRight
                className="cursor-pointer"
                onClick={handleIncrementCategory}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
