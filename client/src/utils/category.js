import axios from 'axios'

export const getAllCategory = async () => {
    return await axios.get(`${process.env.REACT_APP_API}/categories`)
}

export const getSingleCategory = async (slug) => {
    return await axios.get(`${process.env.REACT_APP_API}/category/${slug}`)
}

export const createCategory = async (category,token) => {
    return await axios.post(`${process.env.REACT_APP_API}/category`,category,{
        headers:{
            token
        }
    })
}

export const updateCategory = async (slug,category,token) => {
    return await axios.put(`${process.env.REACT_APP_API}/category/${slug}`,category,{
        headers:{
            token
        }
    })
}

export const removeCategory = async (slug,category,token) => {
    return await axios.put(`${process.env.REACT_APP_API}/category/${slug}`,category,{
        headers:{
            token
        }
    })
}