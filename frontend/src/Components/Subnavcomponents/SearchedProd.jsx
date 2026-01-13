import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getSearchedProducts } from "../Services/ProductServices";
import { addToCart } from "../Services/UserServices";
import AlertMsg from "../Services/AlertMsg";

const SearchedProd = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const { serverMsg, status, showAlert } = AlertMsg(2);

  useEffect(() => {
    const getProds = async () => {
      try {
        const response = await getSearchedProducts(query);
        setProducts(response.data || []);
      } catch (err) {
        showAlert(err.response || err, "success", "error");
        setProducts([]);
      };
    };
    if (query) getProds();
  }, [query]);

    // Handle add to cart
    const handleCart = async (product) => {
      try {
        const response = await addToCart(product._id, 1);
        showAlert(response.data.message || response.data, "success", "error");
        navigate(`/cart`);
      } catch (error) {
        showAlert(error.response || error, "success", "error");
      }
    };

    // Function to place order
  const buyNow = (product) => {
    navigate("/cart")
  }

  return (
    <div className="p-4 sm:p-6">
      {/*Showing flash message*/}
        {serverMsg && (
          <div
            className={`fixed top-1/2 left-1/2 p-6 rounded-lg shadow-lg shadow-zinc-500 text-white transition-transform duration-300 ${
              status === "success" ? "bg-green-500" : "bg-red-500"
            }`}
            style={{ transform: "translate(-50%, -50%)" }}
          >
            {serverMsg}
          </div>
        )}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Search results for "{query}"
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Showing {products.length} result{products.length !== 1 ? "s" : ""}
        </p>
      </div>

      {products.length === 0 && (
        <div className="text-center text-gray-600">
          No products found for "{query}".
        </div>
      )}

      {products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <article
              key={product._id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col"
            >
                <div className="w-full h-44 bg-gray-100 rounded-md overflow-hidden mb-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-md font-semibold text-gray-800 mb-1">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {product.description}
                </p>

              <div className="mt-auto flex items-center justify-between">
                <div>
                  <span className="text-sm text-gray-500 line-through">
                    ₹{product.price}
                  </span>
                  <span className="text-lg font-bold text-blue-600 ml-2">
                    ₹
                    {Math.round(
                      product.price - (product.price * product.discount) / 100
                    )}
                  </span>
                </div>
                <span className="text-xs bg-red-500 text-white px-2 py-1 rounded">
                  {product.discount}% Off
                </span>
              </div>
              <div className="w-full flex justify-center items-center gap-2 mt-4">
                <button
                  onClick={() => handleCart(product)}
                  className="w-1/2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => buyNow(product)}
                  className="w-1/2 px-4 py-2 bg-amber-400 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
                >
                  Buy Now
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchedProd;
