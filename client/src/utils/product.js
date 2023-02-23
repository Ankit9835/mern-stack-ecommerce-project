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

export const removedProduct = async (slug,token) => {
    return await axios.delete(`${process.env.REACT_APP_URL}/remove-product/${slug}`,{
        headers:{
            authtoken: token
        }
    })
}

export const getSingleProduct = async (slug,token) => {
    return await axios.get(`${process.env.REACT_APP_URL}/product/${slug}`,{
        headers:{
            authtoken: token
        }
    })
}


