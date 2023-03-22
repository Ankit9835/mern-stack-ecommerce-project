import { async } from '@firebase/util'
import axios from 'axios'

export const createProduct = async (product,token) => 
     await axios.post(`${process.env.REACT_APP_URL}/product`,product,{
        headers:{
            authtoken:token
        }
    })

export const getSubCategories = async (id) => 
    await axios.get(`${process.env.REACT_APP_URL}/category/subcategory/${id}`)

export const getAllProducts = async (count) => {
   return await axios.get(`${process.env.REACT_APP_URL}/products/${count}`)
}

export const getProductCounts = async () => 
  await axios.get(`${process.env.REACT_APP_URL}/products/count`)

export const removedProduct = async (slug,token) => {
    return await axios.delete(`${process.env.REACT_APP_URL}/remove-product/${slug}`,{
        headers:{
            authtoken: token
        }
    })
}

export const getSingleProduct = async (slug) => {
    return await axios.get(`${process.env.REACT_APP_URL}/product/${slug}`)
}

export const updateProduct = async (slug,values,token) =>{
    return await axios.put(`${process.env.REACT_APP_URL}/updated-product/${slug}`, values, {
        headers:{
            authtoken:token
        }
    })
}

export const newProducts = async (sort,order,page) => {
    return await axios.post(`${process.env.REACT_APP_URL}/products`, {sort,order,page})
}

export const updateProductRating = async (productId,star,token) => {
    return await axios.put(`${process.env.REACT_APP_URL}/products/star/${productId}`, {star}, {
        headers:{
            authtoken:token
        }
    })
}


