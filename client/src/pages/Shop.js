import React, { useEffect, useState } from 'react'
import AllProducts from '../components/AllProducts'
import { getProductCounts } from '../utils/product'


const Shop = () => {
    const [count,setCount] = useState('')
 const [products, setProducts] = useState([])
 const [loading,setLoading] = useState(false)
 useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true)
    getProductCounts(12).then((p) => {
        console.log('p',p.data)
      setCount(p.data.total);
      setProducts(p.data.products)
      setLoading(false);
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">search/filter menu</div>

        <div className="col-md-9">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4 className="text-danger">Products {count}</h4>
          )}

        {loading ? '' : count.length < 1 && <p>No products found</p>}

          {/* {products.length < 1 && <p>No products found</p>} */}

          <div className="row pb-5">
            {products.map((p) => (
              <div key={p._id} className="col-md-4 mt-3">
                <AllProducts key={p._id} {...p} product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shop
