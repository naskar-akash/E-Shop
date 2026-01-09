import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAllProducts } from "../Services/ProductServices";
import CategoryPageCards from "./CategoryPageCards";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaFilter } from "react-icons/fa";

const CategoryPage = () => {
  const { name } = useParams();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [filter, setFilter] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await getAllProducts();
        const allProducts = response.data || [];
        const filteredProducts = allProducts.filter(
          (item) => item.category === name
        );
        setProducts(filteredProducts);
      } catch (error) {
        showAlert(error.response || error, "success", "error");
      }
    };
    getProducts();
  }, [name]);

  if (products.length === 0) {
    return (
      <div className="text-lg min-h-screen font-semibold text-gray-400 text-center py-10">
        Sorry no products found...
      </div>
    );
  }

  const newProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  switch (sort) {
    case "lowtohigh":
      newProducts.sort((a, b) => a.price - b.price);
      break;
    case "hightolow":
      newProducts.sort((a, b) => b.price - a.price);
      break;
    case "atoz":
      newProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "ztoa":
      newProducts.sort((a, b) => b.name.localeCompare(a.name));
      break;
    default:
      break;
  }

  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-[96%] flex flex-col lg:flex-row justify-center gap-4 mt-6">
        {/* Filter for mobile devices */}
        <div className="sm:hidden sticky top-4 z-10 w-full flex justify-start">
          <button
            onClick={() => setFilter(!filter)}
            className="bg-sky-700 text-white p-3 rounded-full shadow-lg"
          >
            <FaFilter />
          </button>
        </div>
        <div
          className={`fixed md:hidden top-24 left-0 z-40 h-full w-[55%] bg-white shadow-lg p-4 transform transition-transform duration-300  ${filter ? "translate-x-0" : "-translate-x-full"} `}
        >
          <div className="w-full h-full flex flex-col">
            {/* CLOSE BUTTON */}
            <div className="w-full flex justify-end mb-4">
              <button
                onClick={() => setFilter(false)}
                className="text-xl font-bold text-red-600"
              >
                <IoMdArrowRoundBack />
              </button>
            </div>

            {/* FILTER CONTENT */}
            <div className="flex flex-col gap-4 w-full">
              {/* Search */}
              <div className="flex flex-col gap-1">
                <label className="text-lg text-sky-900 font-semibold">
                  Search by name:
                </label>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="px-3 py-2 bg-blue-50 border-2 border-blue-300 rounded-sm"
                  placeholder="Search ---"
                />
              </div>

              {/* Sort */}
              <div className="flex flex-col gap-1">
                <label className="text-lg text-sky-900 font-semibold">
                  Sort:
                </label>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="px-3 py-2 bg-blue-50 border-2 border-blue-300 rounded-sm"
                >
                  <option value="default">Default</option>
                  <option value="lowtohigh">Price: Low to High</option>
                  <option value="hightolow">Price: High to Low</option>
                  <option value="atoz">A to Z</option>
                  <option value="ztoa">Z to A</option>
                </select>
              </div>

              {/* Cancel */}
              <button
                onClick={() => {
                  setSearch("");
                  setSort("default");
                  setFilter(!filter)
                }}
                className="bg-red-600 text-white font-semibold px-3 py-2 rounded-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>

        {/* Filter section for larger devices*/}
        <div className="hidden sm:flex w-full lg:w-1/5 bg-white/80 lg:h-[50vh] lg:sticky top-1/3 rounded-md shadow-md">
          <div className="w-full h-full flex justify-center items-center p-4">
            <div className="flex justify-evenly lg:grid lg:grid-cols-1 gap-2 w-full">
              {/* Search by name */}
              <div className="flex flex-col justify-center gap-1">
                <label className="text-lg text-sky-900 font-semibold">
                  Search by name:
                </label>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="px-3 py-2 bg-blue-50 border-2 border-blue-300 rounded-sm"
                  placeholder="Search ---"
                />
              </div>
              {/* Sort */}
              <div className="flex flex-col justify-center gap-1">
                <label className="text-lg text-sky-900 font-semibold">
                  Sort:
                </label>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="px-3 py-2 bg-blue-50 border-2 border-blue-300 rounded-sm"
                >
                  <option value="default">Default</option>
                  <option value="lowtohigh">Price: Low to High</option>
                  <option value="hightolow">Price: High to Low</option>
                  <option value="atoz">Alphabetical: A to Z</option>
                  <option value="ztoa">Alphabetical: Z to A</option>
                </select>
              </div>
              {/* Cancel filters */}
              <div className="lg:w-full flex justify-center items-end">
                <button
                  onClick={() => {
                    setSearch("");
                    setSort("default");
                  }}
                  className="bg-red-600 text-white text-md font-semibold px-3 py-2 rounded-sm hover:bg-red-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Products grid section */}
        <div className="w-full lg:w-4/5 min-h-[100vh] bg-white/80 p-6 rounded-sm shadow-md">
          <CategoryPageCards newProducts={newProducts} />
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
