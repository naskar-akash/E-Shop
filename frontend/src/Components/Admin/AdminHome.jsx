import React, { useState, useEffect } from "react";
import { getAllProducts, removeProducts } from "../Services/ProductServices";
import AlertMsg from "../Services/AlertMsg";

const AdminHome = () => {
  const { serverMsg, status, showAlert } = AlertMsg(2);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await getAllProducts();
        setProducts(response.data);
      } catch (error) {
        showAlert(error.response || error, "success", "error");
      }
    };
    getProducts();
  }, []);

  const handleDelete = async (product) => {
    try {
      const response = await removeProducts(product._id);
      showAlert(response, "success", "error");
    } catch (error) {
      showAlert(error.response || error, "success", "error");
    }
  };

  return (
    <div className="w-full min-h-screen p-4 flex justify-center items-start">
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

      <div className="w-[98%] max-w-5xl flex flex-col gap-4">
        {products.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No products found
          </div>
        ) : (
          products.map((product, index) => (
            <div
              key={index || product._id}
              className="w-full bg-white rounded-lg shadow-md px-4 py-2 flex flex-row gap-4 items-start"
            >
              <div className="w-full md:w-40 h-40 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="w-full flex flex-col justify-between p-2">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {product.name}
                  </h3>
                  <p className="text-md text-gray-600 mt-2">
                    {product.description}
                  </p>
                </div>

                <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-center gap-6">
                    {!product.discount ? (<><span className="text-xl font-bold text-blue-600">
                        ₹{product.price}
                      </span>
                      <span className="text-md p-2 bg-red-600 rounded-full font-semibold text-white">0% Off</span></>
                    ) : (<>
                    <div className="flex flex-col justify-evenly">
                      <span className="text-sm font-light text-gray-800 line-through">
                        ₹{product.price}
                      </span>
                      <span className="text-xl font-bold text-blue-600">
                        ₹
                        {product.price -
                          (product.price * product.discount) / 100}
                      </span>
                    </div>
                    <span className="text-md p-2 bg-red-600 rounded-full font-semibold text-white">{product.discount}% Off</span></>
                  )}
                    <span className="px-2 py-1 bg-gray-200 text-gray-800 rounded text-sm">
                      {product.category}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button className="px-3 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                      Update
                    </button>
                    <button onClick={()=>handleDelete(product)} className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600">Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminHome;
