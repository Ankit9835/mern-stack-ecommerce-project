import axios from 'axios'

export const createProduct = async (product,token) => 
     await axios.post(`${process.env.REACT_APP_URL}/product`,product,{
        headers:{
            authtoken:token
        }
    })

export const getSubCategories = async (id) => 
    await axios.get(`${process.env.REACT_APP_URL}/category/subcategory/${id}`)


