import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAllProducts } from "../Services/ProductServices";
import AlertMsg from "../Services/AlertMsg";
import { addToCart } from "../Services/UserServices";

const CategoryPage = () => {
  const navigate = useNavigate();
  const { name } = useParams();
  const [products, setProducts] = useState([]);
  const { serverMsg, status, showAlert } = AlertMsg(2);
  
  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await getAllProducts();
        const allProducts = response.data || [];
        const filteredProducts = allProducts.filter(item => item.category === name)
        setProducts(filteredProducts);
      } catch (error) {
        showAlert(error.response || error, "success", "error");
      }
    };
    getProducts();
  }, [name]);

// Handle add to cart
  const handleCart = (product) => {
    try {
      const cartItem = async (product) => {
      const response = await addToCart(product._id, 1);
      showAlert(response.data.message, "success", "success");
      navigate(`/cart`);
    }
    cartItem(product);
    } catch (error) {
      showAlert(error.response || error, "success", "error");
    }
  };
   

  if (products.length === 0) {
    return (
      <div className="text-lg min-h-screen font-semibold text-gray-400 text-center py-10">
        Sorry no products found...
      </div>
    );
  };

  return (
    <div className="w-full h-full flex justify-center">
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
      
      <div className="w-[96%] flex flex-row justify-center gap-4 mt-6">
        {/* Filter section */}
        <div className="w-1/5 bg-white/80">
          <div>{name} filters</div>
        </div>
        {/* Products grid section */}
        <div className="w-4/5 min-h-[100vh] bg-white/80 p-4">
          <div className="grid grid-cols-3 gap-5 justify-items-center">
            {products.map((product,index) => (
                <div
                  key={index}
                  className="w-[330px] flex flex-col bg-white rounded-lg shadow-md hover:shadow-xl transition-transform duration-300 overflow-hidden hover:scale-105 p-4"
                >
                  <div className="w-full h-[200px] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500"
                    />
                  </div>
                  <div className="flex flex-col justify-items-start py-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex justify-center gap-2">
                      <span className="text-sm font-light text-gray-500 line-through py-1">
                        ₹{product.price}
                      </span>
                      <span className="text-xl font-bold text-blue-600">₹{product.price - ((product.price*product.discount)/100)}</span>
                      </div>
                      <button onClick={()=>handleCart(product)} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition-colors duration-300">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                  <div className="pb-4 flex flex-row justify-items-start gap-2">
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      4.5 ★
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                      {product.price >= 500 ? "Free Delivery" : product.price >= 300 && product.price < 500 ? `₹${product.price*0.05} delivery charge` : "₹15 delivery charge"}
                    </span>
                  </div>
                </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
