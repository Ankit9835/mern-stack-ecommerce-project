import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import AdminProductCard from '../../../components/AdminProductCard'
import AdminNav from '../../../components/nav/AdminNav'
import { getAllProducts, removedProduct } from '../../../utils/product'


const AllProducts = () => {
  const {user} = useSelector((state) => state.auth)
  
  const [isLoading,setIsLoading] = useState(false)
  const [products,setProducts] = useState([])

  const getProducts = async () => {
    try {
      setIsLoading(true)
      console.log('tokens',user)
      const products = await getAllProducts(10)
      console.log('products',products.data)
      if(products.data.success){
        console.log('get all products',products.data)
        setIsLoading(false)
        setProducts(products.data.products)
      } else {
        setIsLoading(false)
        setProducts(products.data.products)
      }
     
    } catch (error) {
      console.log(error.message)
    }
  }

  const deleteProduct = async (slug) => {
    try {
      
        setIsLoading(true)
        const response = await removedProduct(slug,user.token)
        console.log('product removed',response)
        toast.error(`product deleted successfully`)
        getProducts()
        setIsLoading(false)
       
       
    } catch (error) {
        console.log(error.message)
    }
  }

  useEffect(() => {
    getProducts()
  },[])

  return (
    <div className="container-fluid">
    <div className="row">
      <div className="col-md-2">
        <AdminNav />
      </div>
      <div className="col">
          {isLoading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>All Products</h4>
            
          )}
          
          {products.length > 0  ?
                <div className="row">
                {products.map((product) => (
                  <div key={product._id} className="col-md-4">
                    <AdminProductCard product={product} deleteProduct={deleteProduct} />
                  </div>
                ))}
              </div> : <div className="row">
               No Products available
              </div>
          }

       
          
        </div>
    </div>
  </div>
  )
}

export default AllProducts
