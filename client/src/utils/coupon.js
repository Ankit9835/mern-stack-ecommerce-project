import axios from 'axios'

export const getCoupons = async () => {
    return await axios.get(`${process.env.REACT_APP_URL}/coupons`)
}

export const createCoupon = async (authToken, data) => {
   return await axios.post(`${process.env.REACT_APP_URL}/create-coupon`, {data}, {
        headers:{
            authToken
        }
    })
}

export const removeCoupon = async (couponId,authToken) => {
   return await axios.get(`${process.env.REACT_APP_URL}/coupon/remove/${couponId}`, {
        headers:{
            authToken
        }
    })
}

