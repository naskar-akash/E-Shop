import React, { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { getSearchedProducts } from '../Services/ProductServices';

const SearchedProd = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const navigate = useNavigate();
  const [ products, setProducts ] = useState([]);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    const getProds = async() => {
      try {
        setLoading(true);
        const response = await getSearchedProducts(query);
        setProducts(response.data || []);
      } catch (err) {
        console.log(err);
        
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    if (query) getProds();
  }, [query])

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Search results for "{query}"</h2>
        <p className="text-sm text-gray-500 mt-1">Showing {products.length} result{products.length !== 1 ? 's' : ''}</p>
      </div>

      {loading && (
        <div className="text-center text-gray-500">Loading results…</div>
      )}

      {!loading && products.length === 0 && (
        <div className="text-center text-gray-600">No products found for "{query}".</div>
      )}

      {!loading && products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <article key={product._id} className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col">
              <button
                onClick={() => navigate(`/product/${product._id}`)}
                className="block w-full text-left focus:outline-none"
                aria-label={`Open ${product.name} details`}
              >
                <div className="w-full h-44 bg-gray-100 rounded-md overflow-hidden mb-3">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-md font-semibold text-gray-800 mb-1">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{product.description}</p>
              </button>

              <div className="mt-auto flex items-center justify-between">
                <div>
                  <span className="text-sm text-gray-500 line-through">₹{product.price}</span>
                  <span className="text-lg font-bold text-blue-600 ml-2">₹{Math.round(product.price - (product.price * product.discount) / 100)}</span>
                </div>
                <span className="text-xs bg-red-500 text-white px-2 py-1 rounded">{product.discount}% Off</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchedProd
