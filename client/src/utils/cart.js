import axios from "axios";

export const userCart = (cart,authToken) => {
    return axios.post(`${process.env.REACT_APP_API}/add-cart`, {cart}, {
        headers:{
            authToken
        }
    })
}